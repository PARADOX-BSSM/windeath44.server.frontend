import { useState, useRef, useEffect } from 'react';
import * as Matter from 'matter-js';
import * as _ from './style';

const BOARD_SIZE = 400;
const STONE_RADIUS = 12;
const BOARD_PADDING = 40;

// Styled Components

const Sulkkagi = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const animationRef = useRef(null);
  const stonesRef = useRef([]);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedStone, setSelectedStone] = useState(null);
  const [aimStart, setAimStart] = useState(null);
  const [aimCurrent, setAimCurrent] = useState(null);
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
        render: { fillStyle: 'white' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 1,
      }),
      Bodies.circle(150, 120, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 2,
      }),
      Bodies.circle(200, 110, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 3,
      }),
      // 까만돌
      Bodies.circle(100, 300, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 4,
      }),
      Bodies.circle(150, 280, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 5,
      }),
      Bodies.circle(200, 290, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 6,
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

      // 돌
      ctx.fillStyle = stone.player === 1 ? 'white' : 'black';
      ctx.strokeStyle = stone.player === 1 ? '#333' : '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, STONE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 선택된 돌 표시
      if (selectedStone && selectedStone.id === stone.id) {
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, STONE_RADIUS + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 조준선과 화살표 그리기
    if (aimStart && aimCurrent && selectedStone) {
      const dx = aimCurrent.x - aimStart.x;
      const dy = aimCurrent.y - aimStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
        const stone = stonesRef.current.find((s) => s.id === selectedStone.id);
        if (stone && stone.position) {
          // 파워 계산 (0~1)
          const maxDistance = 120;
          const normalizedPower = Math.min(distance / maxDistance, 1);

          // 화살표 방향 (돌에서 반대 방향으로)
          const arrowStartX = stone.position.x;
          const arrowStartY = stone.position.y;
          const arrowEndX = stone.position.x - (dx / distance) * (40 + normalizedPower * 60);
          const arrowEndY = stone.position.y - (dy / distance) * (40 + normalizedPower * 60);

          // 파워에 따른 색상
          const red = Math.floor(255 * Math.min(normalizedPower * 2, 1));
          const green = Math.floor(255 * Math.max(1 - normalizedPower * 2, 0));
          const arrowColor = `rgb(${red}, ${green}, 0)`;

          // 화살표 선 그리기
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = 3 + normalizedPower * 3;
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(arrowStartX, arrowStartY);
          ctx.lineTo(arrowEndX, arrowEndY);
          ctx.stroke();

          // 화살표 머리 그리기
          const angle = Math.atan2(arrowEndY - arrowStartY, arrowEndX - arrowStartX);
          const headSize = 12 + normalizedPower * 8;

          ctx.fillStyle = arrowColor;
          ctx.beginPath();
          ctx.moveTo(arrowEndX, arrowEndY);
          ctx.lineTo(
            arrowEndX - Math.cos(angle - 0.5) * headSize,
            arrowEndY - Math.sin(angle - 0.5) * headSize,
          );
          ctx.lineTo(
            arrowEndX - Math.cos(angle + 0.5) * headSize,
            arrowEndY - Math.sin(angle + 0.5) * headSize,
          );
          ctx.closePath();
          ctx.fill();

          // 돌 주변에 파워 표시
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(
            stone.position.x,
            stone.position.y,
            STONE_RADIUS + 8 + normalizedPower * 12,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
          ctx.setLineDash([]);

          // 파워 텍스트
          ctx.fillStyle = '#333';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            `${Math.floor(normalizedPower * 100)}%`,
            stone.position.x,
            stone.position.y - STONE_RADIUS - 30,
          );
        }
      }
    }
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

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    if (isAnimating || gameState !== 'playing' || !engineRef.current) return;

    const pos = getMousePos(e);

    const clickedStone = stonesRef.current.find((stone) => {
      if (!stone.position) return false;
      const dx = pos.x - stone.position.x;
      const dy = pos.y - stone.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= STONE_RADIUS && stone.player === currentPlayer;
    });

    if (clickedStone) {
      setSelectedStone(clickedStone);
      setAimStart(pos);
      setAimCurrent(pos);
    }
  };

  const handleMouseMove = (e) => {
    if (!selectedStone || isAnimating) return;

    const pos = getMousePos(e);
    setAimCurrent(pos);
  };

  const handleMouseUp = (e) => {
    if (!selectedStone || !aimStart || !aimCurrent || isAnimating || !Matter) return;

    const dx = aimCurrent.x - aimStart.x;
    const dy = aimCurrent.y - aimStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      const power = Math.min(distance / 50, 0.3); // Matter.js에 맞는 힘 조정
      const stone = stonesRef.current.find((s) => s.id === selectedStone.id);

      if (stone) {
        // Matter.js의 Body.applyForce 사용
        Matter.Body.applyForce(stone, stone.position, {
          x: -dx * power * 0.001,
          y: -dy * power * 0.001,
        });

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }

    setSelectedStone(null);
    setAimStart(null);
    setAimCurrent(null);
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
        render: { fillStyle: 'white' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 1,
      }),
      Bodies.circle(150, 120, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 2,
      }),
      Bodies.circle(200, 110, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1,
        id: 3,
      }),
      Bodies.circle(100, 300, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 4,
      }),
      Bodies.circle(150, 280, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 5,
      }),
      Bodies.circle(200, 290, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black' },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2,
        id: 6,
      }),
    ];

    World.add(engineRef.current.world, newStones);
    stonesRef.current = newStones;

    setCurrentPlayer(1);
    setGameState('playing');
    setSelectedStone(null);
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
            setSelectedStone(null);
            setAimStart(null);
            setAimCurrent(null);
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
