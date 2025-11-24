import { focusAtom } from '@/atoms/windowManager';
import { isSeoriDraggingAtom } from '@/atoms/cursorState';
import { useAtom } from 'jotai';
import {
  MouseConstraint,
  Mouse,
  Bodies,
  Body,
  Engine,
  Events,
  Render,
  Runner,
  World,
  Query,
} from 'matter-js';
import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import SpeechBubble from '@/applications/components/speechBubble';
import useSpeechBubble from '@/hooks/speechBubble';
import { set } from './utility/signUp/style';

export default function Seori() {
  // 설이 Ref
  const shapeRef = useRef<Body | null>(null) as MutableRefObject<Body | null>;

  const [, setFocus] = useAtom(focusAtom);
  const [, setIsSeoriDragging] = useAtom(isSeoriDraggingAtom);

  // 말풍선 hook
  const { bubble, showBubble, hideBubble, updatePosition } = useSpeechBubble();

  // 기본값 말풍선 표시 함수
  const showDefaultBubble = () => {
    const container = document.getElementById('cursorContainer');
    if (!container || !shapeRef.current) {
      return;
    }
    const bounds = container.getBoundingClientRect();
    const spawnX = shapeRef.current.position.x;
    const spawnY = shapeRef.current.position.y;
    showBubble(
      '안녕하세요! \n 도움이 필요하신가요?',
      [
        {
          name: '다음',
          onClick: () => showRandomTextBubble(),
        },
        {
          name: '추모관 추천',
          onClick: () => showMemorialFeedBubble(),
        },
      ],
      bounds.left + spawnX,
      bounds.top + spawnY - 80,
    );
  };

  const showRandomTextBubble = () => {
    const texts = ['랜덤1', '랜덤2', '랜덤3', '랜덤4', '랜덤5'];
    const randomIndex = Math.floor(Math.random() * texts.length);
    const randomText = texts[randomIndex];

    const container = document.getElementById('cursorContainer');
    if (!container || !shapeRef.current) {
      return;
    }
    const bounds = container.getBoundingClientRect();
    const spawnX = shapeRef.current.position.x;
    const spawnY = shapeRef.current.position.y;
    showBubble(
      randomText,
      [
        {
          name: '다음',
          onClick: () => showRandomTextBubble(),
        },
        {
          name: '추모관 추천',
          onClick: () => showMemorialFeedBubble(),
        },
      ],
      bounds.left + spawnX,
      bounds.top + spawnY - 80,
    );
  };

  const showMemorialFeedBubble = () => {
    const container = document.getElementById('cursorContainer');
    if (!container || !shapeRef.current) {
      return;
    }
    const bounds = container.getBoundingClientRect();
    const spawnX = shapeRef.current.position.x;
    const spawnY = shapeRef.current.position.y;
    showBubble(
      '최근 방문하신 추모관을 참고해서 한 곳 추천해드릴게요! \n 우치하 이타치 님의 추모관은 어떠신가요?',
      [
        {
          name: '취소',
          onClick: () => showDefaultBubble(),
        },
        {
          name: '추모관으로 이동',
          onClick: () => hideBubble(),
        },
        {
          name: '다른거',
          onClick: () => showMemorialFeedBubble(),
        },
      ],
      bounds.left + spawnX,
      bounds.top + spawnY - 80,
    );
  };

  // 설이 스프라이트 변경 함수
  const setSpriteTexture = (path: string) => {
    if (!shapeRef.current) {
      return;
    }

    shapeRef.current.render.sprite!.texture = path;
  };

  // is드래그 Ref
  const isDraggingRef = useRef(false);

  // 설이가 바라보는 방향 Ref
  const directionRef = useRef('left');
  const setDirectionRef = (direction: string) => {
    directionRef.current = direction;
  };

  // 설이 상태 Ref
  const stateRef = useRef('default');
  const setStateRef = (state: string) => {
    if (stateRef.current === state) return; // 같은 상태면 무시
    stateRef.current = state;
    const texturePath = `src/assets/seori/interaction_${state}.png`;
    setSpriteTexture(texturePath);
  };

  useLayoutEffect(() => {
    const container = document.getElementById('cursorContainer');
    const taskbar = document.getElementById('taskbarContainer');

    if (!container || !taskbar) {
      return;
    }

    const bounds = container.getBoundingClientRect();
    const taskbarBounds = taskbar.getBoundingClientRect();

    // 초깃값 설정
    const engine = Engine.create();
    const render = Render.create({
      engine,
      element: container,
      options: {
        wireframes: false,
        background: '#F7F4C800',
        width: bounds.width,
        height: bounds.height,
      },
    });
    const world = engine.world;
    render.canvas.style.zIndex = '1';
    render.canvas.style.position = 'absolute';
    render.canvas.style.pointerEvents = 'none'; // 기본적으로 이벤트 통과

    render.canvas.onclick = () => {
      // Seori 클릭 시 Discover에 포커스
      setFocus('Discover');
    };

    const secondDiv = container.querySelector('div');
    if (secondDiv) {
      container.insertBefore(render.canvas, secondDiv);
    }

    // 벽
    const leftWall = Bodies.rectangle(-50, 0, 100, bounds.height * 2, {
      isStatic: true, // isStatic: false로 되어있으면 얘도 떨어짐
      friction: 0,
      render: { fillStyle: '#E6B143' },
      label: 'left',
    });
    const rightWall = Bodies.rectangle(bounds.width + 50, 0, 100, bounds.height * 2, {
      isStatic: true,
      friction: 0,
      render: { fillStyle: '#E6B143' },
      label: 'right',
    });
    const ground = Bodies.rectangle(
      0,
      bounds.bottom - taskbarBounds.height / 2,
      taskbarBounds.width * 2000,
      taskbarBounds.height,
      {
        isStatic: true,
        render: { fillStyle: '#E6B143' },
        label: 'ground',
      },
    );
    const top = Bodies.rectangle(310, -50, bounds.width * 2, 100, {
      isStatic: true,
      friction: 0,
      render: { fillStyle: '#E6B143' },
      label: 'top',
    });
    World.add(world, [leftWall, rightWall, ground, top]);

    // 렌더러 추가
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 설이
    function loadImageSize(src: string): Promise<{ width: number; height: number }> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = src;
      });
    }

    const texturePath = `src/assets/seori/interaction_${stateRef.current}.png`;

    // shape를 먼저 선언 (이벤트 핸들러에서 참조하기 위해)
    let shape: Body;

    loadImageSize(texturePath).then(({ width, height }) => {
      const scale = 0.08;
      const shapeHeight = height * scale;
      // 바닥 위에 생성 (ground top - shape의 절반 높이)
      const groundTopY = bounds.height - taskbarBounds.height;
      const spawnX = bounds.width - 300;
      const spawnY = groundTopY - shapeHeight / 2;

      shape = Bodies.rectangle(spawnX, spawnY, width * scale, shapeHeight, {
        inertia: Infinity,
        friction: 0,
        frictionStatic: 0,
        render: {
          sprite: {
            texture: texturePath,
            xScale: scale,
            yScale: scale,
          },
        },
        label: 'shape',
      });

      World.add(world, shape);
      shapeRef.current = shape;

      // 초기 말풍선 표시
      showDefaultBubble();
    });

    // 드래그 시작 && 끝나면 실행되는 함수들
    const onDragStart = () => {
      isDraggingRef.current = true;
      setIsSeoriDragging(true);
      setStateRef('holding');
      hideBubble(); // 드래그 시작하면 말풍선 숨김
    };
    const onDragEnd = () => {
      isDraggingRef.current = false;
      setIsSeoriDragging(false);
      setStateRef('falling');
    };

    const mouse = Mouse.create(render.canvas); //마우스 객체 생성
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // 탄성정도
        render: {
          visible: false, //마우스 드래그 시 제약조건 보이기X
        },
      },
    });

    // 드래그 시작 이벤트
    Events.on(mouseConstraint, 'startdrag', () => {
      if (!isDraggingRef.current) {
        onDragStart();
      }
    });

    // 드래그 종료 이벤트
    Events.on(mouseConstraint, 'enddrag', () => {
      onDragEnd();
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // mousedown 시 Seori 위에 있는지 즉시 체크 (동기적으로)
    render.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      if (!shape) return;

      const rect = render.canvas.getBoundingClientRect();
      const mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Seori body 위에 마우스가 있는지 체크
      const bodies = Query.point([shape], mousePos);
      if (bodies.length > 0) {
        setIsSeoriDragging(true);
      }
    });

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

    // world 바깥으로 나가면 드래그 종료하는 코드 + Seori 위에 있을 때만 pointer-events 활성화
    document.addEventListener('mousemove', (e) => {
      const mouseX = mouse.position.x;
      const mouseY = mouse.position.y;

      // 범위
      const isOutOfBounds =
        mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > canvasHeight;

      if (isOutOfBounds) {
        // 드래그 강제 해제
        mouseConstraint.mouse.button = -1;
      }

      // Seori 위에 있는지 체크해서 pointer-events 토글
      if (shape) {
        const rect = render.canvas.getBoundingClientRect();
        const mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        const bodies = Query.point([shape], mousePos);

        if (bodies.length > 0 || isDraggingRef.current) {
          render.canvas.style.pointerEvents = 'auto';
        } else {
          render.canvas.style.pointerEvents = 'none';
        }
      }
    });

    // 설이가 world 바깥으로 나가면 다시 되돌아오는 코드 + 말풍선 위치 업데이트
    Events.on(engine, 'afterUpdate', () => {
      const x = shape.position.x;
      const y = shape.position.y;

      // 범위
      const outOfBounds = x < 0 || x > canvasWidth + 30 || y < 0 - 30 || y > canvasHeight + 30;

      if (outOfBounds) {
        Body.setPosition(shape, { x: (canvasWidth + 30) / 2, y: canvasHeight / 2 }); // 다시 중앙으로
        Body.setVelocity(shape, { x: 0, y: 0 }); // 속도 초기화
      }

      // 말풍선 위치 업데이트 (설이 따라다니기)
      updatePosition(bounds.left + x, bounds.top + y - 150);
    });

    // 설이 이동 관련 이벤트
    Events.on(engine, 'beforeUpdate', () => {
      const { x, y } = shape.velocity;
      const interval = 1;

      // 설이를 잡지 않고 위아래로 이동
      if ((y > interval || y < -interval) && !isDraggingRef.current) {
        setStateRef('falling');
      }

      // 설이를 잡고 좌우로 이동 (방향 저장용)
      if (x > interval && isDraggingRef.current) {
        setDirectionRef('right');
      } else if (x < -interval && isDraggingRef.current) {
        setDirectionRef('left');
      }
    });

    // 설이와 바닥과의 충돌 감지 (설이 멈추기)
    Events.on(engine, 'collisionActive', (event) => {
      event.pairs.forEach((pair) => {
        const labels = [pair.bodyA.label, pair.bodyB.label];
        if (labels.includes('shape') && labels.includes('ground') && !isDraggingRef.current) {
          Body.setVelocity(shape, { x: 0, y: 0 });
        }
      });
    });

    // 설이의 속도가 0인 것을 감지하는 이벤트 (바닥에 붙어있다)
    setInterval(() => {
      if (shape.speed < 0.1 && !isDraggingRef.current && stateRef.current !== 'default') {
        setStateRef('default');
        // 땅에 닿으면 말풍선 표시
        showBubble(
          '가끔 절 던지는걸 좋아하시는 분들이 있더라고요... \n 당신은 그런 사람이 아니길 바랄게요.',
          [
            {
              name: '다음',
              onClick: () => showDefaultBubble(),
            },
          ],
          bounds.left + shape.position.x,
          bounds.top + shape.position.y - 150,
        );
      }
    }, 100);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
    };
  }, []);

  return (
    <SpeechBubble
      x={bubble.x}
      y={bubble.y}
      text={bubble.text}
      show={bubble.show}
      buttons={bubble.buttons}
    />
  );
}
