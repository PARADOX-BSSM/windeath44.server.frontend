import { MouseConstraint, Mouse, Bodies, Body, Engine, Events, Render, Runner, World, Query } from "matter-js"
import "./world.css";
import { MutableRefObject, useEffect, useRef } from "react";

export default function Seori() {
  // 설이 Ref
  const shapeRef = useRef<Body | null>(null) as MutableRefObject<Body | null>;
  // is드래그 Ref
  const isDraggingRef = useRef(false);
  // 설이가 바라보는 방향 Ref
  const directionRef = useRef("left");
  // 설이 상태 Ref
  const stateRef = useRef("default");
  
  useEffect(() => {
    const container = document.getElementById("cursorContainer");
    const taskbar = document.getElementById("taskbarContainer");

    if (!container || !taskbar) { return }

    const bounds = container.getBoundingClientRect();
    const taskbarBounds = taskbar.getBoundingClientRect();
    
    // 초깃값 설정
    const engine = Engine.create();
    const render = Render.create({
      engine,
      element: container,
      options: {
        wireframes: false,
        background: "#F7F4C800",
        width: bounds.width,
        height: bounds.height,
      }
    })
    const world = engine.world;
    render.canvas.style.zIndex = "0";
    render.canvas.style.position = "absolute";
    render.canvas.style.pointerEvents = "auto";

    const secondDiv = container.querySelector("div");
    if (secondDiv) {
        container.insertBefore(render.canvas, secondDiv);
    }

    // 벽
    const leftWall = Bodies.rectangle(-50, 0, 100, bounds.height * 2, {
      isStatic: true, // isStatic: false로 되어있으면 얘도 떨어짐
      friction: 0,
      render: { fillStyle: "#E6B143"},
      label: "left"
    })
    const rightWall = Bodies.rectangle(bounds.width + 50, 0, 100, bounds.height * 2, {
      isStatic: true,
      friction: 0,
      render: { fillStyle: "#E6B143"},
      label: "right"
    })
    const ground = Bodies.rectangle(0, bounds.bottom - taskbarBounds.height / 2, taskbarBounds.width * 10, taskbarBounds.height, {
      isStatic: true,
      friction: 1,
      render: { fillStyle: "#E6B143"},
      label: "ground"
    })
    const top = Bodies.rectangle(310, -50, bounds.width * 2, 100, {
      isStatic: true,
      friction: 0,
      render: { fillStyle: "#E6B143"},
      label: "top"
    })
    World.add(world, [leftWall, rightWall, ground, top])

    // 렌더러 추가
    Render.run(render)
    const runner = Runner.create()
    Runner.run(runner, engine)

    function loadImageSize(src: string): Promise<{ width: number; height: number }> {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.width, height: img.height });
          img.onerror = reject;
          img.src = src;
        });
    }

    let shape = Bodies.rectangle(300, 150, 100, 150, {
        inertia: Infinity,
        render: {
        sprite: {
            texture:  `src/assets/seori_${stateRef.current}.png`,
            xScale: 1,
            yScale: 1,
        }
        },
        label: "shape"
    });

    // 설이
    const texturePath = `src/assets/seori_${stateRef.current}.png`;
    loadImageSize(texturePath).then(({ width, height }) => {
        shape = Bodies.rectangle(300, 150, width, height, {
            inertia: Infinity,
            render: {
            sprite: {
                texture: texturePath,
                xScale: 1,
                yScale: 1,
            }
            },
            label: "shape"
        });

    World.add(world, shape);
    shapeRef.current = shape;
    });

    // 드래그 시작 && 끝나면 실행되는 함수들
    const onDragStart = () => {
      console.log("Started");
      if (directionRef.current === "left") {
        shape.render.fillStyle = "#FFFFAA";
      }
      if (directionRef.current === "right") {
        shape.render.fillStyle = "#FFAA00";
      }
    };
    const onDragEnd = () => {
      console.log("Ended");
    };

    const mouse = Mouse.create(render.canvas) //마우스 객체 생성
    const mouseConstraint = MouseConstraint.create(engine,{ 
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // 탄성정도
        render:{
          visible: false //마우스 드래그 시 제약조건 보이기X
        }
      }
    })
    
    // 드래그 시작 이벤트
    Events.on(mouseConstraint, "startdrag", () => {
      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        onDragStart();
      }
    });
        
    // 드래그 종료 이벤트
    Events.on(mouseConstraint, "enddrag", () => {
      isDraggingRef.current = false;
      onDragEnd();
    });

    World.add(world,mouseConstraint);
    render.mouse = mouse;

    // 마우스 뗐을 때 이벤트
    // world 바깥에서도 드래그를 종료하기 위해 필요함
    window.addEventListener('mouseup', () => {
      if (mouseConstraint && mouseConstraint.mouse.button !== -1) {
        // 마우스 버튼을 강제로 놓은 상태로 처리
        mouseConstraint.mouse.button = -1;
      }
    });

    const canvasWidth = bounds.width + 100;
    const canvasHeight = bounds.height + 100;
        
    // world 바깥으로 나가면 드래그 종료하는 코드
    document.addEventListener("mousemove", (e) => {
      const mouseX = mouse.position.x;
      const mouseY = mouse.position.y;
      // console.log(mouseX, mouseY, canvasHeight, canvasWidth);
        
      // 범위
      const isOutOfBounds =
        mouseX < 0 ||
        mouseX > canvasWidth ||
        mouseY < 0 ||
        mouseY > canvasHeight;
        
      if (isOutOfBounds) {
        // 드래그 강제 해제
        mouseConstraint.mouse.button = -1;
      }
    });

    // 설이가 world 바깥으로 나가면 다시 되돌아오는 코드
    Events.on(engine, "afterUpdate", () => {
      const x = shape.position.x;
      const y = shape.position.y;
    
      // 범위
      const outOfBounds =
        x < 0 || x > canvasWidth + 30 || y < 0 - 30 || y > canvasHeight + 30;
    
      if (outOfBounds) {
        Body.setPosition(shape, { x: (canvasWidth + 30) / 2, y: canvasHeight / 2 }); // 다시 중앙으로
        Body.setVelocity(shape, { x: 0, y: 0 }); // 속도 초기화
      }
    });

    // 설이 이동 관련 이벤트
    Events.on(engine, "beforeUpdate", () => {
      const { x, y } = shape.velocity;
      const interval = 1;
        
      // 설이를 잡지 않고 위아래로 이동
      if (y > interval && !isDraggingRef.current) {
        console.log("아래로 이동 중");
        if (directionRef.current === "left") {
          shape.render.fillStyle = "#00FFAA";
        }
        if (directionRef.current === "right") {
          shape.render.fillStyle = "#AAFF00";
        }
      }
      else if (y < -interval && !isDraggingRef.current) {
        console.log("위로 이동 중");
        if (directionRef.current === "left") {
          shape.render.fillStyle = "#AAAAFF";
        }
        if (directionRef.current === "right") {
          shape.render.fillStyle = "#FFAAAA";
        }
      }

      // 설이를 잡고 좌우로 이동
      if (x > interval && isDraggingRef.current) {
        directionRef.current = "right";
        shape.render.fillStyle = "#FF0000";
      }
      else if (x < -interval && isDraggingRef.current) {
        directionRef.current = "left";
        shape.render.fillStyle = "#0000FF";
      }
    });

    // 설이의 속도가 0인 것을 감지하는 이벤트 (바닥에 붙어있다)
    setInterval(() => {
      if (shape.speed < 0.1) {
        // 들고있을 때
        if (isDraggingRef.current) {
          if (directionRef.current === "left") {
            shape.render.fillStyle = "#FFFFAA";
          }
          if (directionRef.current === "right") {
            shape.render.fillStyle = "#FFAA00";
          }
        }
        // 내려놨을 떄
        else {
          if (directionRef.current === "left") {
            shape.render.fillStyle = "#000000";
          }
          if (directionRef.current === "right") {
            shape.render.fillStyle = "#00AAAA";
          }
        }
      }
    }, 100);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
    };
  }, [])

  return (
    <>
    </>
  );
}
