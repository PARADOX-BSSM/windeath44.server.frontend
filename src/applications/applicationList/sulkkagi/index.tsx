import { useState, useRef, useEffect } from 'react';
import * as Matter from 'matter-js';
import * as _ from './style';

const BOARD_SIZE = 400;
const STONE_RADIUS = 12;
const BOARD_PADDING = 40;

// Styled Components

const Sulkkagi = () => {
  const canvasRef = useRef(null);
  const arrowCanvasRef = useRef<HTMLCanvasElement>(null); // 화살표 전용 Canvas
  const engineRef = useRef(null);
  const animationRef = useRef(null);
  const stonesRef = useRef<any[]>([]);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedStoneId, setSelectedStoneId] = useState<number | null>(null);
  const [aimStart, setAimStart] = useState<{ x: number; y: number } | null>(null);
  const [aimCurrent, setAimCurrent] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gameState, setGameState] = useState('playing');
  const [isAnimating, setIsAnimating] = useState(false);
  const [stoneCount, setStoneCount] = useState({ player1: 3, player2: 3 });

  // Matter.js 초기화
  useEffect(() => {
    initializeMatter();

    return () => {
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };
  }, []);

  const initializeMatter = () => {
    const { Engine, World, Bodies, Runner } = Matter;

    // 엔진 생성
    const engine = Engine.create();
    engine.world.gravity.y = 0; // 중력 제거

    // 벽 생성
    const walls = [
      Bodies.rectangle(BOARD_SIZE / 2, -10, BOARD_SIZE, 20, {
        isStatic: true,
        label: 'wall',
        isSensor: true,
      }),
      Bodies.rectangle(BOARD_SIZE / 2, BOARD_SIZE + 10, BOARD_SIZE, 20, {
        isStatic: true,
        label: 'wall',
        isSensor: true,
      }),
      Bodies.rectangle(-10, BOARD_SIZE / 2, 20, BOARD_SIZE, {
        isStatic: true,
        label: 'wall',
        isSensor: true,
      }),
      Bodies.rectangle(BOARD_SIZE + 10, BOARD_SIZE / 2, 20, BOARD_SIZE, {
        isStatic: true,
        label: 'wall',
        isSensor: true,
      }),
    ];

    // 돌 생성
    const stones = [
      // 하얀돌
      Bodies.circle(100, 100, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 1,
        originalColor: 'white',
        isSelected: false,
      }),
      Bodies.circle(150, 120, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 2,
        originalColor: 'white',
        isSelected: false,
      }),
      Bodies.circle(200, 110, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 3,
        originalColor: 'white',
        isSelected: false,
      }),
      // 까만돌
      Bodies.circle(100, 300, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 4,
        originalColor: 'black',
        isSelected: false,
      }),
      Bodies.circle(150, 280, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 5,
        originalColor: 'black',
        isSelected: false,
      }),
      Bodies.circle(200, 290, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 6,
        originalColor: 'black',
        isSelected: false,
      }),
    ];

    // 월드에 추가
    World.add(engine.world, [...walls, ...stones]);

    // 러너 시작
    const runner = Runner.create();
    Runner.run(runner, engine);

    engineRef.current = engine;
    stonesRef.current = stones;

    // 애니메이션 시작
    animate();
  };

  const animate = () => {
    draw();
    checkGameState();
    animationRef.current = requestAnimationFrame(animate);
  };

  // 예상 궤적 계산 함수
  const calculateTrajectory = (
    startX: number,
    startY: number,
    velocityX: number,
    velocityY: number,
  ) => {
    const points = [];
    let x = startX;
    let y = startY;
    let vx = velocityX;
    let vy = velocityY;

    // 물리 시뮬레이션 매개변수 (Matter.js와 동일하게)
    const frictionAir = 0.02;
    const timeStep = 16; // 60fps 기준
    const maxSteps = 100; // 최대 시뮬레이션 스텝

    for (let i = 0; i < maxSteps; i++) {
      // 마찰 적용
      vx *= 1 - frictionAir;
      vy *= 1 - frictionAir;

      // 위치 업데이트
      x += vx * timeStep;
      y += vy * timeStep;

      // 속도가 충분히 작아지면 중단
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed < 0.001) break;

      // 보드 밖으로 나가면 중단
      if (x < 0 || x > BOARD_SIZE || y < 0 || y > BOARD_SIZE) break;

      points.push({ x, y });
    }

    return points;
  };

  // 화살표 Canvas 그리기 함수
  const drawArrow = () => {
    const arrowCanvas = arrowCanvasRef.current;
    if (!arrowCanvas) return;

    const ctx = arrowCanvas.getContext('2d');
    if (!ctx) return;

    // 화살표 Canvas 초기화
    ctx.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);

    // 드래그 중일 때만 화살표 그리기
    if (isDragging && selectedStoneId && aimStart && aimCurrent) {
      // 실시간 돌 위치 찾기
      const currentSelectedStone = stonesRef.current.find((stone) => stone.id === selectedStoneId);

      if (currentSelectedStone && currentSelectedStone.position) {
        const stoneX = currentSelectedStone.position.x;
        const stoneY = currentSelectedStone.position.y;

        const dx = aimCurrent.x - aimStart.x;
        const dy = aimCurrent.y - aimStart.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
          // 힘의 강도 계산
          const maxDistance = 150;
          const powerRatio = Math.min(distance / maxDistance, 1.0);

          // 색상 그라데이션
          let arrowColor;
          if (powerRatio < 0.5) {
            const ratio = powerRatio * 2;
            arrowColor = `rgb(${Math.floor(255 * ratio)}, 255, 0)`;
          } else {
            const ratio = (powerRatio - 0.5) * 2;
            arrowColor = `rgb(255, ${Math.floor(255 * (1 - ratio))}, 0)`;
          }

          // 화살표 크기 조절
          const arrowLength = Math.max(distance * 0.8, 30);
          const lineWidth = 2 + powerRatio * 6;
          const arrowHeadSize = 8 + powerRatio * 12;

          // 화살표 끝점 계산
          const arrowEndX = stoneX - (dx / distance) * arrowLength;
          const arrowEndY = stoneY - (dy / distance) * arrowLength;
          const angle = Math.atan2(-dy, -dx);

          // 화살표 몸체
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(stoneX, stoneY);
          ctx.lineTo(arrowEndX, arrowEndY);
          ctx.stroke();

          // 화살표 머리
          ctx.fillStyle = arrowColor;
          ctx.beginPath();
          ctx.moveTo(arrowEndX, arrowEndY);
          ctx.lineTo(
            arrowEndX - arrowHeadSize * Math.cos(angle - Math.PI / 6),
            arrowEndY - arrowHeadSize * Math.sin(angle - Math.PI / 6),
          );
          ctx.lineTo(
            arrowEndX - arrowHeadSize * Math.cos(angle + Math.PI / 6),
            arrowEndY - arrowHeadSize * Math.sin(angle + Math.PI / 6),
          );
          ctx.closePath();
          ctx.fill();

          // 힘 게이지
          const gaugeRadius = 25;
          const gaugeX = stoneX + 40;
          const gaugeY = stoneY - 40;

          // 게이지 배경
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(gaugeX, gaugeY, gaugeRadius, 0, Math.PI * 2);
          ctx.stroke();

          // 게이지 진행
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(
            gaugeX,
            gaugeY,
            gaugeRadius,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * powerRatio,
          );
          ctx.stroke();

          // 퍼센트 텍스트
          ctx.fillStyle = '#333';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${Math.floor(powerRatio * 100)}%`, gaugeX, gaugeY + 4);
        }
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !engineRef.current) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 바둑판 배경
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 바둑판 선
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 1;

    // 세로선
    for (let i = 0; i <= 18; i++) {
      const x = BOARD_PADDING + (i * (BOARD_SIZE - BOARD_PADDING * 2)) / 18;
      ctx.beginPath();
      ctx.moveTo(x, BOARD_PADDING);
      ctx.lineTo(x, BOARD_SIZE - BOARD_PADDING);
      ctx.stroke();
    }

    // 가로선
    for (let i = 0; i <= 18; i++) {
      const y = BOARD_PADDING + (i * (BOARD_SIZE - BOARD_PADDING * 2)) / 18;
      ctx.beginPath();
      ctx.moveTo(BOARD_PADDING, y);
      ctx.lineTo(BOARD_SIZE - BOARD_PADDING, y);
      ctx.stroke();
    }

    // 화점
    const points = [3, 9, 15];
    ctx.fillStyle = '#8B4513';
    points.forEach((i) => {
      points.forEach((j) => {
        const x = BOARD_PADDING + (i * (BOARD_SIZE - BOARD_PADDING * 2)) / 18;
        const y = BOARD_PADDING + (j * (BOARD_SIZE - BOARD_PADDING * 2)) / 18;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // 돌 그리기
    stonesRef.current.forEach((stone) => {
      if (!stone.position) return;

      const x = stone.position.x;
      const y = stone.position.y;

      // 보드 밖의 돌은 그리지 않음
      if (
        x < -STONE_RADIUS ||
        x > BOARD_SIZE + STONE_RADIUS ||
        y < -STONE_RADIUS ||
        y > BOARD_SIZE + STONE_RADIUS
      ) {
        return;
      }

      // 그림자
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(x + 2, y + 2, STONE_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      // 선택된 돌인지 확인
      const isSelected = selectedStoneId === stone.id;

      // 돌 그리기 (기본 색상 사용)
      ctx.fillStyle = stone.originalColor;
      ctx.strokeStyle = stone.render.strokeStyle;
      ctx.lineWidth = stone.render.lineWidth;
      ctx.beginPath();
      ctx.arc(x, y, STONE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      if (stone.render.lineWidth > 0) {
        ctx.stroke();
      }

      // 선택된 돌에 추가 효과 (펄스 효과)
      if (isSelected) {
        const time = Date.now() * 0.005;
        const pulse = Math.sin(time) * 0.5 + 0.5; // 0~1 사이값
        const extraRadius = pulse * 3;

        ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)'; // 반투명 금색
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, STONE_RADIUS + 8 + extraRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 별도 Canvas에서 화살표 그리기
    drawArrow();
  };

  const checkGameState = () => {
    if (!stonesRef.current) return;

    let player1Count = 0;
    let player2Count = 0;
    let movingStones = 0;

    stonesRef.current.forEach((stone) => {
      if (!stone.position) return;

      // 보드 안에 있는 돌만 카운트
      if (
        stone.position.x >= -STONE_RADIUS &&
        stone.position.x <= BOARD_SIZE + STONE_RADIUS &&
        stone.position.y >= -STONE_RADIUS &&
        stone.position.y <= BOARD_SIZE + STONE_RADIUS
      ) {
        if (stone.player === 1) player1Count++;
        if (stone.player === 2) player2Count++;

        // 움직이는 돌 체크
        const speed = Math.sqrt(
          stone.velocity.x * stone.velocity.x + stone.velocity.y * stone.velocity.y,
        );
        if (speed > 0.1) movingStones++;
      }
    });

    setStoneCount({ player1: player1Count, player2: player2Count });

    if (player1Count === 0) {
      setGameState('player2wins');
      setIsAnimating(false);
    } else if (player2Count === 0) {
      setGameState('player1wins');
      setIsAnimating(false);
    } else {
      setIsAnimating(movingStones > 0);
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isAnimating || gameState !== 'playing' || !engineRef.current) {
      return;
    }

    const pos = getMousePos(e);

    const clickedStone = stonesRef.current.find((stone) => {
      if (!stone.position) return false;
      const dx = pos.x - stone.position.x;
      const dy = pos.y - stone.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= STONE_RADIUS && stone.player === currentPlayer;
    });

    // 이전 선택 해제
    if (selectedStoneId) {
      const previousStone = stonesRef.current.find((stone) => stone.id === selectedStoneId);
      if (previousStone) {
        previousStone.render.strokeStyle = 'transparent';
        previousStone.render.lineWidth = 0;
        previousStone.isSelected = false;
      }
    }

    if (clickedStone) {
      // 새로운 돌 선택
      setSelectedStoneId(clickedStone.id);
      setAimStart(pos);
      setAimCurrent(pos);
      setIsDragging(true); // 드래그 시작

      // 선택된 돌의 스타일 변경
      clickedStone.render.strokeStyle = clickedStone.player === 1 ? '#FF6B35' : '#FFD700';
      clickedStone.render.lineWidth = 4;
      clickedStone.isSelected = true;

      // 드래그 시작 효과
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.cursor = 'grabbing';
      }
    } else {
      // 빈 공간 클릭 시 선택 해제
      setSelectedStoneId(null);
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);

    if (selectedStoneId && !isAnimating && isDragging) {
      // 드래그 중일 때
      setAimCurrent(pos);
      // 즉시 화살표 업데이트
      requestAnimationFrame(drawArrow);
    } else if (!isAnimating && gameState === 'playing') {
      // 호버 상태에서 커서 변경
      const canvas = canvasRef.current;
      if (!canvas) return;

      const hoveredStone = stonesRef.current.find((stone) => {
        if (!stone.position) return false;
        const dx = pos.x - stone.position.x;
        const dy = pos.y - stone.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= STONE_RADIUS && stone.player === currentPlayer;
      });

      canvas.style.cursor = hoveredStone ? 'grab' : 'default';
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedStoneId || !aimStart || !aimCurrent || isAnimating || !Matter) return;

    const selectedStone = stonesRef.current.find((stone) => stone.id === selectedStoneId);

    const dx = aimCurrent.x - aimStart.x;
    const dy = aimCurrent.y - aimStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      const power = Math.min(distance / 50, 0.3);

      if (selectedStone) {
        // Matter.js의 Body.applyForce 사용
        Matter.Body.applyForce(selectedStone, selectedStone.position, {
          x: -dx * power * 0.001,
          y: -dy * power * 0.001,
        });

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }

    // 선택 해제 시 렌더링 복구
    if (selectedStoneId) {
      const previousStone = stonesRef.current.find((stone) => stone.id === selectedStoneId);
      if (previousStone) {
        previousStone.render.strokeStyle = 'transparent';
        previousStone.render.lineWidth = 0;
        previousStone.isSelected = false;
      }
    }

    // 커서 복구
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'default';
    }

    setSelectedStoneId(null);
    setAimStart(null);
    setAimCurrent(null);
    setIsDragging(false);
  };

  const resetGame = () => {
    if (!engineRef.current) return;

    const { World, Bodies } = Matter;

    // 기존 돌들 제거
    World.remove(engineRef.current.world, stonesRef.current);

    // 새 돌들 생성
    const newStones = [
      Bodies.circle(100, 100, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 1,
        originalColor: 'white',
        isSelected: false,
      }),
      Bodies.circle(150, 120, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 2,
        originalColor: 'white',
        isSelected: false,
      }),
      Bodies.circle(200, 110, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 3,
        originalColor: 'white',
        isSelected: false,
      }),
      Bodies.circle(100, 300, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 4,
        originalColor: 'black',
        isSelected: false,
      }),
      Bodies.circle(150, 280, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 5,
        originalColor: 'black',
        isSelected: false,
      }),
      Bodies.circle(200, 290, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 6,
        originalColor: 'black',
        isSelected: false,
      }),
    ];

    World.add(engineRef.current.world, newStones);
    stonesRef.current = newStones;

    setCurrentPlayer(1);
    setGameState('playing');
    setSelectedStoneId(null);
    setAimStart(null);
    setAimCurrent(null);
    setIsAnimating(false);
    setStoneCount({ player1: 3, player2: 3 });
  };

  return (
    <_.Container>
      <_.Title>알까기 게임</_.Title>

      <_.GameInfo>
        <_.TurnInfo>
          <div>
            현재 차례:
            <_.CurrentPlayer player={currentPlayer}>
              {currentPlayer === 1 ? '하얀돌' : '까만돌'}
            </_.CurrentPlayer>
          </div>

          {gameState !== 'playing' && (
            <_.WinMessage>{gameState === 'player1wins' ? '하얀돌' : '까만돌'} 승리!</_.WinMessage>
          )}
        </_.TurnInfo>

        <_.StoneCount>
          남은 돌: 하얀돌 {stoneCount.player1}개, 까만돌 {stoneCount.player2}개
        </_.StoneCount>
      </_.GameInfo>

      <_.CanvasContainer>
        <_.GameCanvas
          ref={canvasRef}
          width={BOARD_SIZE}
          height={BOARD_SIZE}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            // 선택 해제 시 렌더링 복구
            if (selectedStoneId) {
              const previousStone = stonesRef.current.find((stone) => stone.id === selectedStoneId);
              if (previousStone) {
                previousStone.render.strokeStyle = 'transparent';
                previousStone.render.lineWidth = 0;
                previousStone.isSelected = false;
              }
            }
            // 커서 복구
            const canvas = canvasRef.current;
            if (canvas) {
              canvas.style.cursor = 'default';
            }
            setSelectedStoneId(null);
            setAimStart(null);
            setAimCurrent(null);
            setIsDragging(false);
          }}
        />

        {/* 화살표 전용 Canvas (게임 Canvas 위에 오버레이) */}
        <canvas
          ref={arrowCanvasRef}
          width={BOARD_SIZE}
          height={BOARD_SIZE}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none', // 마우스 이벤트는 아래 Canvas로 전달
            zIndex: 9999,
          }}
        />

        {isAnimating && <_.AnimatingIndicator>움직이는 중...</_.AnimatingIndicator>}
      </_.CanvasContainer>

      <_.Controls>
        <_.ResetButton onClick={resetGame}>게임 다시 시작</_.ResetButton>
      </_.Controls>
    </_.Container>
  );
};

export default Sulkkagi;
