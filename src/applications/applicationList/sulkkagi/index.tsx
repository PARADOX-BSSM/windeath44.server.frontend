import { useState, useRef, useEffect } from 'react';
import * as Matter from 'matter-js';
import * as _ from './style';

const BOARD_SIZE = 400;
const STONE_RADIUS = 12;
const BOARD_PADDING = 40;

const Sulkkagi = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const arrowCanvasRef = useRef<HTMLCanvasElement>(null); // 화살표 전용 Canvas
  const engineRef = useRef<Matter.Engine | null>(null);
  const animationRef = useRef<number | null>(null);
  const stonesRef = useRef<Matter.Body[]>([]);

  // 🔒 UI표시용 state (렌더용)
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedStoneId, setSelectedStoneId] = useState<number | null>(null);
  const [aimStart, setAimStart] = useState<{ x: number; y: number } | null>(null);
  const [aimCurrent, setAimCurrent] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'player1wins' | 'player2wins'>('playing');
  const [isAnimating, setIsAnimating] = useState(false);
  const [stoneCount, setStoneCount] = useState({ player1: 3, player2: 3 });
  const [notifications, setNotifications] = useState<
    { id: number; player: number; message: string; isNew: boolean }[]
  >([]);
  const notificationIdRef = useRef(0);
  const player1CountRef = useRef(0); // 하얀돌 추모관 등록 카운터
  const player2CountRef = useRef(0); // 까만돌 추모관 등록 카운터

  const isDraggingRef = useRef(false);
  const selectedStoneIdRef = useRef<number | null>(null);
  const aimStartRef = useRef<{ x: number; y: number } | null>(null);
  const aimCurrentRef = useRef<{ x: number; y: number } | null>(null);

  // Matter.js 초기화
  useEffect(() => {
    initializeMatter();

    // 화살표 캔버스 DPR 스케일링
    const c = arrowCanvasRef.current;
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      c.width = BOARD_SIZE * dpr;
      c.height = BOARD_SIZE * dpr;
      c.style.width = `${BOARD_SIZE}px`;
      c.style.height = `${BOARD_SIZE}px`;
      const ctx = c.getContext('2d');
      ctx?.scale(dpr, dpr);
    }

    return () => {
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMatter = () => {
    const { Engine, World, Bodies, Runner } = Matter;

    // 엔진 생성
    const engine = Engine.create();
    engine.world.gravity.y = 0; // 중력 제거

    // 벽 생성 (센서로만 처리해 보드 밖으로 나간 돌 판정)
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
        isOut: false,
      }),
      Bodies.circle(150, 120, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1 as any,
        id: 2 as any,
        originalColor: 'white' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(200, 110, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1 as any,
        id: 3 as any,
        originalColor: 'white' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      // 까만돌
      Bodies.circle(100, 300, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2 as any,
        id: 4 as any,
        originalColor: 'black' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(150, 280, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2 as any,
        id: 5 as any,
        originalColor: 'black' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(200, 290, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2 as any,
        id: 6 as any,
        originalColor: 'black' as any,
        isSelected: false as any,
        isOut: false as any,
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

  // 화살표 Canvas 그리기 (ref만 사용)
  const drawArrow = () => {
    const arrowCanvas = arrowCanvasRef.current;
    if (!arrowCanvas) return;

    const ctx = arrowCanvas.getContext('2d');
    if (!ctx) return;

    // 화살표 Canvas 초기화
    ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

    const dragging = isDraggingRef.current;
    const selectedId = selectedStoneIdRef.current;
    const start = aimStartRef.current;
    const current = aimCurrentRef.current;

    if (dragging && selectedId && start && current) {
      const stone = stonesRef.current.find((s: any) => s.id === selectedId);
      if (stone && (stone as any).position) {
        const stoneX = stone.position.x;
        const stoneY = stone.position.y;

        const dx = current.x - start.x;
        const dy = current.y - start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 히스테리시스 적용: 6 이상이면 켬
        if (distance > 6) {
          const maxDistance = 150;
          const powerRatio = Math.min(distance / maxDistance, 1.0);

          // 최애의 사인 핑크/보라 그라데이션
          let arrowColor: string;
          if (powerRatio < 0.5) {
            const ratio = powerRatio * 2;
            // 핑크에서 보라로 (255, 187, 245) → (231, 116, 221)
            const r = Math.floor(255 - (255 - 231) * ratio);
            const g = Math.floor(187 - (187 - 116) * ratio);
            const b = Math.floor(245 - (245 - 221) * ratio);
            arrowColor = `rgb(${r}, ${g}, ${b})`;
          } else {
            const ratio = (powerRatio - 0.5) * 2;
            // 보라에서 진한 보라로 (231, 116, 221) → (180, 60, 170)
            const r = Math.floor(231 - (231 - 180) * ratio);
            const g = Math.floor(116 - (116 - 60) * ratio);
            const b = Math.floor(221 - (221 - 170) * ratio);
            arrowColor = `rgb(${r}, ${g}, ${b})`;
          }

          // 화살표 크기 조절
          const arrowLength = Math.max(distance * 0.8, 30);
          const lineWidth = 2 + powerRatio * 6;
          const arrowHeadSize = 8 + powerRatio * 12;

          // 화살표 끝점 + 각도
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

          // 게이지 배경 (도트 스타일)
          ctx.strokeStyle = 'rgba(46, 46, 46, 0.6)'; // 더 진한 배경
          ctx.lineWidth = 5;
          ctx.lineCap = 'butt'; // 도트 스타일을 위해 둥근 끝 제거
          ctx.beginPath();
          ctx.arc(gaugeX, gaugeY, gaugeRadius, 0, Math.PI * 2);
          ctx.stroke();

          // 게이지 진행
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = 7;
          ctx.lineCap = 'butt'; // 도트 스타일을 위해 둥근 끝 제거
          ctx.beginPath();
          ctx.arc(
            gaugeX,
            gaugeY,
            gaugeRadius,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * powerRatio,
          );
          ctx.stroke();

          // 게이지 외곽선 (픽셀 아트 느낌)
          ctx.strokeStyle = 'var(--primary-black, #2e2e2e)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(gaugeX, gaugeY, gaugeRadius + 4, 0, Math.PI * 2);
          ctx.stroke();

          // 퍼센트 텍스트 (Galmuri11 폰트)
          ctx.fillStyle = 'var(--primary-black, #2e2e2e)';
          ctx.font = 'bold 12px Galmuri11, monospace'; // 픽셀 폰트 사용
          ctx.textAlign = 'center';
          ctx.fillText(`${Math.floor(powerRatio * 100)}%`, gaugeX, gaugeY + 4);
        }
      }
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !engineRef.current) return;

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 바둑판 배경
    ctx.fillStyle = '#ffffff';
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
    stonesRef.current.forEach((stone: any) => {
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

      // 선택된 돌인지 확인 (UI용 state 사용)
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

    // 별도 Canvas에 화살표/게이지 그리기 (ref 값 기반)
    drawArrow();
  };

  const addNotification = (player: number) => {
    const playerName = player === 1 ? '하얀돌' : '까만돌';

    // 팀별 카운터 증가
    let playerCount: number;
    if (player === 1) {
      player1CountRef.current++;
      playerCount = player1CountRef.current;
    } else {
      player2CountRef.current++;
      playerCount = player2CountRef.current;
    }

    const message = `${playerName}(${playerCount})이 추모관에 등록 당했습니다.`;

    const newNotification = {
      id: notificationIdRef.current++,
      player,
      message,
      isNew: true,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // 3초 후 isNew를 false로 변경하여 애니메이션 제거
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === newNotification.id ? { ...notif, isNew: false } : notif)),
      );
    }, 3000);
  };

  const checkGameState = () => {
    if (!stonesRef.current) return;

    let player1Count = 0;
    let player2Count = 0;
    let movingStones = 0;

    stonesRef.current.forEach((stone: any) => {
      if (!stone.position) return;

      // 보드 안에 있는 돌만 카운트
      const isInsideBoard =
        stone.position.x >= -STONE_RADIUS &&
        stone.position.x <= BOARD_SIZE + STONE_RADIUS &&
        stone.position.y >= -STONE_RADIUS &&
        stone.position.y <= BOARD_SIZE + STONE_RADIUS;

      if (isInsideBoard) {
        if (stone.player === 1) player1Count++;
        if (stone.player === 2) player2Count++;

        // 움직이는 돌 체크
        const speed = Math.sqrt(
          stone.velocity.x * stone.velocity.x + stone.velocity.y * stone.velocity.y,
        );
        if (speed > 0.1) movingStones++;
      } else {
        // 보드 밖으로 나간 돌은 isOut 플래그로 표시하고 한 번만 알림 발생
        if (!stone.isOut) {
          stone.isOut = true;
          addNotification(stone.player);
        }
      }
    });

    setStoneCount({ player1: player1Count, player2: player2Count });

    if (player1Count === 0) {
      setGameState('player2wins');
      setIsAnimating(false);
      // 3초 후 자동으로 게임 재시작
      setTimeout(() => {
        resetGame();
      }, 3000);
    } else if (player2Count === 0) {
      setGameState('player1wins');
      setIsAnimating(false);
      // 3초 후 자동으로 게임 재시작
      setTimeout(() => {
        resetGame();
      }, 3000);
    } else {
      setIsAnimating(movingStones > 0);
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
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

    const clickedStone = stonesRef.current.find((stone: any) => {
      if (!stone.position) return false;
      const dx = pos.x - stone.position.x;
      const dy = pos.y - stone.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= STONE_RADIUS && stone.player === currentPlayer;
    });

    // 이전 선택 해제
    if (selectedStoneIdRef.current) {
      const previousStone = stonesRef.current.find(
        (stone: any) => stone.id === selectedStoneIdRef.current,
      );
      if (previousStone) {
        previousStone.render.strokeStyle = 'transparent';
        previousStone.render.lineWidth = 0;
        previousStone.isSelected = false;
      }
    }

    if (clickedStone) {
      // 새로운 돌 선택 (state + ref 동기화)
      setSelectedStoneId(clickedStone.id);
      selectedStoneIdRef.current = clickedStone.id;

      setAimStart(pos);
      aimStartRef.current = pos;

      setAimCurrent(pos);
      aimCurrentRef.current = pos;

      setIsDragging(true);
      isDraggingRef.current = true;

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
      // 빈 공간 클릭 시 선택 해제 (state + ref)
      setSelectedStoneId(null);
      selectedStoneIdRef.current = null;

      setIsDragging(false);
      isDraggingRef.current = false;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);

    if (selectedStoneIdRef.current && !isAnimating && isDraggingRef.current) {
      // 드래그 중일 때
      setAimCurrent(pos);
      aimCurrentRef.current = pos;
      // 선택적으로 즉시 업데이트 (메인 루프가 있으므로 없어도 됨)
      // requestAnimationFrame(drawArrow);
    } else if (!isAnimating && gameState === 'playing') {
      // 호버 상태에서 커서 변경
      const canvas = canvasRef.current;
      if (!canvas) return;

      const hoveredStone = stonesRef.current.find((stone: any) => {
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
    if (
      !selectedStoneIdRef.current ||
      !aimStartRef.current ||
      !aimCurrentRef.current ||
      isAnimating ||
      !Matter
    )
      return;

    const selectedStone = stonesRef.current.find(
      (stone: any) => stone.id === selectedStoneIdRef.current,
    );

    const dx = aimCurrentRef.current.x - aimStartRef.current.x;
    const dy = aimCurrentRef.current.y - aimStartRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5 && selectedStone) {
      const power = Math.min(distance / 50, 0.3);

      Matter.Body.applyForce(selectedStone, selectedStone.position, {
        x: -dx * power * 0.001,
        y: -dy * power * 0.001,
      });

      setCurrentPlayer((p) => (p === 1 ? 2 : 1));
    }

    // 선택 해제 시 렌더링 복구
    if (selectedStoneIdRef.current) {
      const previousStone = stonesRef.current.find(
        (stone: any) => stone.id === selectedStoneIdRef.current,
      );
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

    // state + ref 동기 해제
    setSelectedStoneId(null);
    selectedStoneIdRef.current = null;

    setAimStart(null);
    aimStartRef.current = null;

    setAimCurrent(null);
    aimCurrentRef.current = null;

    setIsDragging(false);
    isDraggingRef.current = false;
  };

  const clearArrowCanvas = () => {
    const c = arrowCanvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
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
        player: 1 as any,
        id: 1 as any,
        originalColor: 'white' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(150, 120, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1 as any,
        id: 2 as any,
        originalColor: 'white' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(200, 110, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'white', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 1 as any,
        id: 3 as any,
        originalColor: 'white' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(100, 300, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2 as any,
        id: 4 as any,
        originalColor: 'black' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(150, 280, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2 as any,
        id: 5 as any,
        originalColor: 'black' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
      Bodies.circle(200, 290, STONE_RADIUS, {
        label: 'stone',
        render: { fillStyle: 'black', strokeStyle: 'transparent', lineWidth: 0 },
        frictionAir: 0.02,
        friction: 0.8,
        restitution: 0.6,
        player: 2 as any,
        id: 6 as any,
        originalColor: 'black' as any,
        isSelected: false as any,
        isOut: false as any,
      }),
    ];

    Matter.World.add(engineRef.current.world, newStones);
    stonesRef.current = newStones;

    // 상태 / ref 초기화
    setCurrentPlayer(1);
    setGameState('playing');
    setSelectedStoneId(null);
    setAimStart(null);
    setAimCurrent(null);
    setIsAnimating(false);
    setStoneCount({ player1: 3, player2: 3 });
    setNotifications([]);
    notificationIdRef.current = 0;
    player1CountRef.current = 0; // 하얀돌 카운터 초기화
    player2CountRef.current = 0; // 까만돌 카운터 초기화

    selectedStoneIdRef.current = null;
    aimStartRef.current = null;
    aimCurrentRef.current = null;
    isDraggingRef.current = false;

    clearArrowCanvas();
  };

  return (
    <_.Container>
      <_.Title>설까기</_.Title>

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

        <_.StoneCountContainer>
          <_.PlayerStoneCount player={1}>
            <_.StoneIcon player={1} />
            하얀돌 {stoneCount.player1}개
          </_.PlayerStoneCount>
          <_.PlayerStoneCount player={2}>
            <_.StoneIcon player={2} />
            까만돌 {stoneCount.player2}개
          </_.PlayerStoneCount>
        </_.StoneCountContainer>
      </_.GameInfo>

      <_.GameArea>
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
              if (selectedStoneIdRef.current) {
                const prev = stonesRef.current.find(
                  (stone: any) => stone.id === selectedStoneIdRef.current,
                );
                if (prev) {
                  prev.render.strokeStyle = 'transparent';
                  prev.render.lineWidth = 0;
                  prev.isSelected = false;
                }
              }
              // 커서 복구
              const canvas = canvasRef.current;
              if (canvas) {
                canvas.style.cursor = 'default';
              }

              // state + ref 모두 초기화
              setSelectedStoneId(null);
              selectedStoneIdRef.current = null;

              setAimStart(null);
              aimStartRef.current = null;

              setAimCurrent(null);
              aimCurrentRef.current = null;

              setIsDragging(false);
              isDraggingRef.current = false;

              // 화살표 캔버스도 정리
              clearArrowCanvas();
            }}
          />

          {/* 화살표 전용 Canvas (게임 Canvas 위에 오버레이) */}
          <canvas
            ref={arrowCanvasRef}
            width={BOARD_SIZE} // CSS 픽셀 기준 (실제 픽셀은 useEffect에서 DPR 반영)
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

        <_.NotificationArea>
          <_.NotificationTitle>추모관 등록 현황</_.NotificationTitle>
          {notifications.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                color: 'var(--primary-black, #2e2e2e)',
                fontSize: '12px',
                fontFamily: 'Galmuri11',
                opacity: 0.7,
                padding: '20px 0',
              }}
            >
              아직 아웃된 돌이 없습니다.
            </div>
          ) : (
            notifications.map((notification) => (
              <_.NotificationItem
                key={notification.id}
                player={notification.player}
                isNew={notification.isNew}
              >
                <_.NotificationIcon player={notification.player} />
                {notification.message}
              </_.NotificationItem>
            ))
          )}
        </_.NotificationArea>
      </_.GameArea>

      <_.Controls>
        <_.ResetButton onClick={resetGame}>게임 다시 시작</_.ResetButton>
      </_.Controls>
    </_.Container>
  );
};

export default Sulkkagi;
