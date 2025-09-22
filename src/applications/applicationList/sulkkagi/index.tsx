import { useState, useRef, useEffect } from 'react';
import * as Matter from 'matter-js';
import * as _ from './style';
import { createAllStones, STONE_RADIUS, BIG_STONE_RADIUS } from './data';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';
import whiteStoneUrl from '@/assets/sulkkagi/white_stone.svg?url';
import blackStoneUrl from '@/assets/sulkkagi/black_stone.svg?url';

// 전역 이미지 캐시
let globalStoneImages: {
  white: HTMLImageElement | null;
  black: HTMLImageElement | null;
} = { white: null, black: null };
let globalImagesLoaded = false;

// 전역 이미지 로딩 함수
const loadGlobalStoneImages = (): Promise<void> => {
  if (globalImagesLoaded) return Promise.resolve();

  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalImages = 2;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        globalImagesLoaded = true;
        resolve();
      }
    };

    // 하얀 돌 이미지 로드
    const whiteImg = new Image();
    whiteImg.onload = checkComplete;
    whiteImg.onerror = checkComplete; // 에러시에도 완료 처리
    whiteImg.src = whiteStoneUrl;
    globalStoneImages.white = whiteImg;

    // 검은 돌 이미지 로드
    const blackImg = new Image();
    blackImg.onload = checkComplete;
    blackImg.onerror = checkComplete; // 에러시에도 완료 처리
    blackImg.src = blackStoneUrl;
    globalStoneImages.black = blackImg;
  });
};

// SVG 배경 이미지를 사용한 돌 렌더링 함수
function drawStoneWithSvgBackground(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  theme: 'white' | 'black',
) {
  const img = theme === 'white' ? globalStoneImages.white : globalStoneImages.black;

  // 그림자 효과 먼저 그리기
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  if (img && img.complete && img.naturalWidth > 0) {
    ctx.save();

    // 이미지 스무딩 비활성화 (픽셀 아트를 위해)
    ctx.imageSmoothingEnabled = false;

    // 원형 클리핑 마스크 적용
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();

    // SVG 이미지를 돌 크기에 맞게 스케일링하여 그리기 (약간 작게)
    const imgSize = r * 1.8;
    ctx.drawImage(img, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);

    ctx.restore();

    // 돌 윤곽선 그리기
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // 이미지가 로드되지 않았으면 기본 원형 돌
    ctx.fillStyle = theme === 'white' ? '#f0f0f0' : '#2c2c2c';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // 기본 돌에도 윤곽선 추가
    ctx.strokeStyle = theme === 'white' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

const BOARD_SIZE = 400;
const BOARD_PADDING = 40;

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  gameMode?: 'ai' | 'pvp';
}

const Sulkkagi = ({ stack, push, pop, top, gameMode = 'ai' }: dataStructureProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const arrowCanvasRef = useRef<HTMLCanvasElement>(null); // 화살표 전용 Canvas
  const engineRef = useRef<Matter.Engine | null>(null);
  const animationRef = useRef<number | null>(null);
  const stonesRef = useRef<Matter.Body[]>([]);

  // UI표시용 state (렌더용)
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedStoneId, setSelectedStoneId] = useState<number | null>(null);
  const [aimStart, setAimStart] = useState<{ x: number; y: number } | null>(null);
  const [aimCurrent, setAimCurrent] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'player1wins' | 'player2wins'>('playing');
  const [showResultModal, setShowResultModal] = useState(false);
  const [isAiTurn, setIsAiTurn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stoneCount, setStoneCount] = useState({ player1: 4, player2: 4 }); // 일반돌 3개 + 큰돌 1개
  const [notifications, setNotifications] = useState<
    { id: number; player: number; message: string; isNew: boolean }[]
  >([]);
  const notificationIdRef = useRef(0);
  const player1CountRef = useRef(0); // 하얀돌 추모관 등록 카운터
  const player2CountRef = useRef(0); // 까만돌 추모관 등록 카운터

  // SVG 이미지 로딩 상태
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const isDraggingRef = useRef(false);
  const selectedStoneIdRef = useRef<number | null>(null);
  const aimStartRef = useRef<{ x: number; y: number } | null>(null);
  const aimCurrentRef = useRef<{ x: number; y: number } | null>(null);

  // SVG 이미지 로딩을 위한 useEffect
  useEffect(() => {
    const loadImages = async () => {
      try {
        await loadGlobalStoneImages();
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to load stone images:', error);
        setImagesLoaded(true); // 에러가 발생해도 기본 돌로 렌더링하기 위해 true로 설정
      }
    };

    loadImages();
  }, []);

  // 이미지 로딩 완료 시 강제 리렌더링
  useEffect(() => {
    if (imagesLoaded) {
      requestAnimationFrame(() => {
        draw();
      });
    }
  }, [imagesLoaded]);

  // Matter.js 초기화
  useEffect(() => {
    initializeMatter();

    // 메인 게임 캔버스 DPR 스케일링
    const mainCanvas = canvasRef.current;
    if (mainCanvas) {
      const dpr = window.devicePixelRatio || 1;
      mainCanvas.width = BOARD_SIZE * dpr;
      mainCanvas.height = BOARD_SIZE * dpr;
      mainCanvas.style.width = `${BOARD_SIZE}px`;
      mainCanvas.style.height = `${BOARD_SIZE}px`;
      const ctx = mainCanvas.getContext('2d');
      ctx?.scale(dpr, dpr);
    }

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

  // AI 턴 자동 실행
  useEffect(() => {
    if (
      gameMode === 'ai' &&
      currentPlayer === 1 &&
      !isAnimating &&
      gameState === 'playing' &&
      !isAiTurn
    ) {
      const timer = setTimeout(() => {
        executeAiMove();
      }, 500); // 0.5초 딜레이 후 AI 움직임

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, isAnimating, gameState, gameMode, isAiTurn]);

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

    // 돌 생성 (data.ts에서 가져오기)
    const stones = createAllStones();

    // 월드에 추가
    World.add(engine.world, [...walls, ...stones]);

    // 충돌 이벤트 리스너 추가
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        // 돌과 벽의 충돌 확인
        if (bodyA.label === 'stone' && bodyB.label === 'wall') {
          handleStoneOut(bodyA);
        } else if (bodyB.label === 'stone' && bodyA.label === 'wall') {
          handleStoneOut(bodyB);
        }
      });
    });

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
          // 최대 거리 제한: 100%에 도달하면 더 이상 늘어나지 않음
          const limitedDistance = Math.min(distance, maxDistance);
          const powerRatio = limitedDistance / maxDistance;

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

          // 화살표 크기 조절 (제한된 거리 기준)
          const arrowLength = Math.max(limitedDistance * 0.8, 30);
          const lineWidth = 2 + powerRatio * 6;
          const arrowHeadSize = 8 + powerRatio * 12;

          // 화살표 끝점 + 각도 (제한된 거리 기준)
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;
          const arrowEndX = stoneX - normalizedDx * arrowLength;
          const arrowEndY = stoneY - normalizedDy * arrowLength;
          const angle = Math.atan2(-dy, -dx);

          // 화살표 시작점 (돌의 가장자리에서 시작)
          const stoneRadius = stone.isBig ? BIG_STONE_RADIUS : STONE_RADIUS;
          const arrowStartX = stoneX - normalizedDx * stoneRadius;
          const arrowStartY = stoneY - normalizedDy * stoneRadius;

          // 화살표 몸체 (헤드 크기만큼 짧게 그어서 헤드와 겹치지 않도록)
          const bodyEndX = arrowEndX + normalizedDx * (arrowHeadSize * 0.7);
          const bodyEndY = arrowEndY + normalizedDy * (arrowHeadSize * 0.7);

          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(arrowStartX + 3, arrowStartY);
          ctx.lineTo(bodyEndX, bodyEndY);
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
    // DPI 스케일링을 고려한 Canvas 크기로 clear
    ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

    // 바둑판 배경
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

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

    // 돌 그리기 (절차적 렌더링 사용)
    stonesRef.current.forEach((stone: any) => {
      if (!stone.position || stone.isOut) return; // 아웃된 돌은 그리지 않음

      const x = stone.position.x;
      const y = stone.position.y;

      // 돌의 실제 반지름 (큰 돌 vs 일반 돌)
      const stoneRadius = stone.isBig ? BIG_STONE_RADIUS : STONE_RADIUS;

      // 선택된 돌인지 확인 (UI용 state 사용)
      const isSelected = selectedStoneId === stone.id;

      // SVG 배경 이미지를 사용한 돌 렌더링
      const theme = stone.player === 1 ? 'white' : 'black';
      drawStoneWithSvgBackground(ctx, x, y, stoneRadius, theme);

      // 선택 테두리
      if (stone.render.lineWidth > 0) {
        ctx.strokeStyle = stone.render.strokeStyle;
        ctx.lineWidth = stone.render.lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, stoneRadius, 0, Math.PI * 2);
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
        ctx.arc(x, y, stoneRadius + 8 + extraRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 별도 Canvas에 화살표/게이지 그리기 (ref 값 기반)
    drawArrow();
  };

  // 벽에 충돌한 돌 처리 함수
  const handleStoneOut = (stone: any) => {
    if (!stone.isOut) {
      stone.isOut = true;
      addNotification(stone.player);
      // 돌을 보드 밖으로 완전히 이동 (안 보이게)
      Matter.Body.setPosition(stone, { x: -1000, y: -1000 });
    }
  };

  const addNotification = (player: number) => {
    const playerName = player === 1 ? '하얀설' : '까만설';

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

      // 아웃되지 않은 돌만 카운트
      if (!stone.isOut) {
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
      setShowResultModal(true);
    } else if (player2Count === 0) {
      setGameState('player1wins');
      setIsAnimating(false);
      setShowResultModal(true);
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

    // AI 모드에서는 player1(하얀돌)은 AI가 조작하므로 사람은 player2(검은돌)만 조작 가능
    if (gameMode === 'ai' && currentPlayer === 1) {
      return;
    }

    const pos = getMousePos(e);

    const clickedStone = stonesRef.current.find((stone: any) => {
      if (!stone.position) return false;
      const dx = pos.x - stone.position.x;
      const dy = pos.y - stone.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const stoneRadius = stone.isBig ? BIG_STONE_RADIUS : STONE_RADIUS;
      return distance <= stoneRadius && stone.player === currentPlayer;
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
      setCursorImage(CURSOR_IMAGES.drag);
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

      // AI 모드에서는 player1 턴일 때 커서 변경 안함
      if (gameMode === 'ai' && currentPlayer === 1) {
        setCursorImage(CURSOR_IMAGES.default);
        return;
      }

      const hoveredStone = stonesRef.current.find((stone: any) => {
        if (!stone.position) return false;
        const dx = pos.x - stone.position.x;
        const dy = pos.y - stone.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const stoneRadius = stone.isBig ? BIG_STONE_RADIUS : STONE_RADIUS;
        return distance <= stoneRadius && stone.player === currentPlayer;
      });

      setCursorImage(hoveredStone ? CURSOR_IMAGES.hand : CURSOR_IMAGES.default);
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
      // 화살표와 동일한 powerRatio 계산
      const maxDistance = 150;
      const limitedDistance = Math.min(distance, maxDistance);
      const powerRatio = limitedDistance / maxDistance;

      // 기준 힘
      const basePower = selectedStone.isBig ? 0.035 : 0.014;
      const power = powerRatio * basePower;

      // 방향은 원래 벡터를 정규화해서 사용
      const normalizedDx = dx / distance;
      const normalizedDy = dy / distance;

      Matter.Body.applyForce(selectedStone, selectedStone.position, {
        x: -normalizedDx * power,
        y: -normalizedDy * power,
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
    setCursorImage(CURSOR_IMAGES.default);

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

  // 강화된 AI 플레이어 로직
  const executeAiMove = () => {
    if (!engineRef.current || currentPlayer !== 1 || isAnimating || gameState !== 'playing') {
      return;
    }

    setIsAiTurn(true);

    // AI가 조작할 수 있는 돌들 (player1) 찾기
    const aiStones = stonesRef.current.filter((stone: any) => stone.player === 1 && !stone.isOut);

    if (aiStones.length === 0) return;

    // 상대방 돌들 (player2) 찾기
    const enemyStones = stonesRef.current.filter(
      (stone: any) => stone.player === 2 && !stone.isOut,
    );

    if (enemyStones.length === 0) return;

    // 강화된 AI 전략 계산
    const bestMove = calculateEnhancedBestMove(aiStones, enemyStones);

    if (bestMove) {
      // 1초 후 AI 행동 실행 (사람이 보기 좋게)
      setTimeout(() => {
        const { stone, direction, power, moveType } = bestMove;

        // 이동 타입에 따른 랜덤성 조절
        let randomAngle = 0;
        if (moveType === 'attack') {
          randomAngle = (Math.random() - 0.5) * 0.15; // 공격시 정확도 높임
        } else if (moveType === 'defensive') {
          randomAngle = (Math.random() - 0.5) * 0.3; // 방어시 더 자유롭게
        } else {
          randomAngle = (Math.random() - 0.5) * 0.2; // 일반적인 경우
        }

        const finalDx = direction.x * Math.cos(randomAngle) - direction.y * Math.sin(randomAngle);
        const finalDy = direction.x * Math.sin(randomAngle) + direction.y * Math.cos(randomAngle);

        // 힘 적용
        Matter.Body.applyForce(stone, stone.position, {
          x: finalDx * power,
          y: finalDy * power,
        });

        // 차례 변경
        setCurrentPlayer(2);
        setIsAiTurn(false);
      }, 1000);
    } else {
      setIsAiTurn(false);
    }
  };

  // 강화된 AI 전략 계산 함수
  const calculateEnhancedBestMove = (aiStones: any[], enemyStones: any[]) => {
    let bestScore = -Infinity;
    let bestMove: {
      stone: any;
      direction: { x: number; y: number };
      power: number;
      moveType: 'attack' | 'defensive' | 'positioning';
    } | null = null;

    for (const aiStone of aiStones) {
      // 1. 벽 위험도 평가
      const wallDanger = evaluateWallDanger(aiStone);

      // 2. 방어 우선 상황 체크 (더 공격적으로 조정)
      if (wallDanger > 0.85) {
        // 위험 임계값을 높여서 더 공격적으로
        // 매우 위험한 상황에서만 도망가기
        const escapeMove = calculateEscapeMove(aiStone);
        if (escapeMove && escapeMove.score > bestScore) {
          bestScore = escapeMove.score;
          bestMove = {
            stone: aiStone,
            direction: escapeMove.direction,
            power: escapeMove.power,
            moveType: 'defensive',
          };
        }
        continue; // 다른 전략 고려하지 않음
      }

      // 3. 공격 기회 평가
      for (const enemyStone of enemyStones) {
        const attackMove = evaluateAttackMove(aiStone, enemyStone, aiStones, enemyStones);

        if (attackMove.score > bestScore) {
          bestScore = attackMove.score;
          bestMove = {
            stone: aiStone,
            direction: attackMove.direction,
            power: attackMove.power,
            moveType: 'attack',
          };
        }
      }

      // 4. 포지션 개선 기회 평가
      const positionMove = evaluatePositioning(aiStone, aiStones, enemyStones);
      if (positionMove.score > bestScore) {
        bestScore = positionMove.score;
        bestMove = {
          stone: aiStone,
          direction: positionMove.direction,
          power: positionMove.power,
          moveType: 'positioning',
        };
      }
    }

    return bestMove;
  };

  // 강화된 벽 위험도 평가 함수
  const evaluateWallDanger = (stone: any) => {
    const x = stone.position.x;
    const y = stone.position.y;

    const distanceToWalls = [
      x, // 왼쪽 벽
      y, // 위쪽 벽
      BOARD_SIZE - x, // 오른쪽 벽
      BOARD_SIZE - y, // 아래쪽 벽
    ];

    const minDistance = Math.min(...distanceToWalls);

    // 단계별 위험도 계산
    if (minDistance > 80) return 0; // 안전
    if (minDistance > 60) return 0.2; // 약간 위험
    if (minDistance > 40) return 0.5; // 위험
    if (minDistance > 20) return 0.8; // 매우 위험
    return 1.0; // 극도로 위험
  };

  // 벽에서 도망가는 이동 계산
  const calculateEscapeMove = (stone: any) => {
    const x = stone.position.x;
    const y = stone.position.y;

    // 보드 중앙으로 향하는 방향 계산
    const centerX = BOARD_SIZE / 2;
    const centerY = BOARD_SIZE / 2;

    const dx = centerX - x;
    const dy = centerY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return null;

    return {
      score: 500, // 높은 우선순위
      direction: { x: dx / distance, y: dy / distance },
      power: stone.isBig ? 0.02 : 0.01, // 적당한 힘으로
    };
  };

  // 강화된 공격 이동 평가
  const evaluateAttackMove = (
    aiStone: any,
    targetEnemy: any,
    allAiStones: any[],
    allEnemyStones: any[],
  ) => {
    const dx = targetEnemy.position.x - aiStone.position.x;
    const dy = targetEnemy.position.y - aiStone.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return { score: -1000, direction: { x: 0, y: 0 }, power: 0 };

    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    let score = 0;

    // 1. 아웃 가능성 평가 (새로운 핵심 기능)
    const knockoutPotential = evaluateKnockoutPotential(
      aiStone,
      targetEnemy,
      normalizedDx,
      normalizedDy,
    );
    score += knockoutPotential.score;

    // 2. 거리 점수 (가까울수록 좋음)
    const distanceScore = (Math.max(0, 300 - distance) / 300) * 100;
    score += distanceScore;

    // 3. 적의 벽 근접성 (적을 벽으로 밀어낼 가능성)
    const enemyWallDanger = evaluateWallDanger(targetEnemy);
    score += enemyWallDanger * 250; // 벽에 가까운 적을 더 우선 타격

    // 4. 큰 돌 vs 작은 돌 전략
    const stoneAdvantage = evaluateStoneAdvantage(aiStone, targetEnemy, distance);
    score += stoneAdvantage;

    // 5. 자신의 안전성 확인 (강화됨)
    const selfKnockoutRisk = evaluateSelfKnockoutRisk(
      aiStone,
      normalizedDx,
      normalizedDy,
      distance,
      knockoutPotential.canKnockout,
    );
    const safetyPenalty = calculateSafetyPenalty(
      aiStone,
      normalizedDx,
      normalizedDy,
      allEnemyStones,
    );

    // 자신이 아웃될 위험이 높으면 점수를 크게 감점
    score -= selfKnockoutRisk.penalty;
    score -= safetyPenalty;

    // 자신이 아웃될 확률이 높으면 아예 공격하지 않음
    if (selfKnockoutRisk.willSelfKnockout) {
      return { score: -2000, direction: { x: normalizedDx, y: normalizedDy }, power: 0 };
    }

    // 6. 강화된 동적 힘 조절 (아웃 가능성 + 안전성 고려)
    const power = calculateEnhancedPower(
      aiStone,
      targetEnemy,
      distance,
      enemyWallDanger,
      knockoutPotential.canKnockout,
      { x: normalizedDx, y: normalizedDy },
    );

    return {
      score,
      direction: { x: normalizedDx, y: normalizedDy },
      power,
    };
  };

  // 자신의 아웃 위험 평가 함수 (새로운 안전 기능)
  const evaluateSelfKnockoutRisk = (
    aiStone: any,
    attackDirX: number,
    attackDirY: number,
    attackDistance: number,
    isStrongAttack: boolean,
  ) => {
    const currentX = aiStone.position.x;
    const currentY = aiStone.position.y;

    // 공격 시 반동 계산 (뉴턴의 제3법칙)
    const recoilMultiplier = isStrongAttack ? 0.4 : 0.25; // 강한 공격일수록 큰 반동
    const baseRecoil = attackDistance > 150 ? 35 : attackDistance > 100 ? 25 : 15;
    const recoilDistance = baseRecoil * recoilMultiplier;

    // 큰 돌은 반동이 작음 (관성이 큼)
    const massReduction = aiStone.isBig ? 0.7 : 1.0;
    const finalRecoilDistance = recoilDistance * massReduction;

    // 반동 방향 (공격 방향의 반대)
    const recoilDirX = -attackDirX;
    const recoilDirY = -attackDirY;

    // 반동 후 예상 위치
    const predictedX = currentX + recoilDirX * finalRecoilDistance;
    const predictedY = currentY + recoilDirY * finalRecoilDistance;

    // 반동 후 벽과의 거리
    const distanceToWallAfterRecoil = Math.min(
      predictedX,
      predictedY,
      BOARD_SIZE - predictedX,
      BOARD_SIZE - predictedY,
    );

    let penalty = 0;
    let willSelfKnockout = false;

    // 반동으로 벽 밖으로 나가는지 확인
    if (predictedX < 0 || predictedX > BOARD_SIZE || predictedY < 0 || predictedY > BOARD_SIZE) {
      penalty = 1000; // 확실한 자기 아웃: 매우 큰 패널티
      willSelfKnockout = true;
    } else if (distanceToWallAfterRecoil < 15) {
      penalty = 600; // 매우 위험
      willSelfKnockout = true;
    } else if (distanceToWallAfterRecoil < 30) {
      penalty = 300; // 위험
    } else if (distanceToWallAfterRecoil < 50) {
      penalty = 150; // 약간 위험
    }

    // 현재 벽에 가까운 상태에서 공격하는 경우 추가 패널티
    const currentWallDanger = evaluateWallDanger(aiStone);
    if (currentWallDanger > 0.5) {
      penalty *= 1 + currentWallDanger; // 현재 위험도에 비례해서 패널티 증가
    }

    return {
      penalty,
      willSelfKnockout,
      predictedPosition: { x: predictedX, y: predictedY },
      recoilDistance: finalRecoilDistance,
    };
  };

  // 아웃 가능성 평가 함수 (새로운 핵심 기능)
  const evaluateKnockoutPotential = (
    aiStone: any,
    targetEnemy: any,
    dirX: number,
    dirY: number,
  ) => {
    const enemyX = targetEnemy.position.x;
    const enemyY = targetEnemy.position.y;

    // 공격 후 적의 예상 이동 거리 계산
    const aiMass = aiStone.isBig ? 1.5 : 1.0;
    const enemyMass = targetEnemy.isBig ? 1.5 : 1.0;
    const massRatio = aiMass / enemyMass;

    // 예상 이동 거리 (물리 시뮬레이션 근사)
    const estimatedKickDistance = massRatio * 80; // 기본 킥 거리

    // 적이 이동할 예상 위치
    const predictedX = enemyX + dirX * estimatedKickDistance;
    const predictedY = enemyY + dirY * estimatedKickDistance;

    // 예상 위치가 벽 밖인지 확인
    const willBeOut =
      predictedX < 0 || predictedX > BOARD_SIZE || predictedY < 0 || predictedY > BOARD_SIZE;

    // 벽과의 거리로 아웃 확률 계산
    const distanceToWallAfterHit = Math.min(
      predictedX,
      predictedY,
      BOARD_SIZE - predictedX,
      BOARD_SIZE - predictedY,
    );

    let knockoutScore = 0;
    let canKnockout = false;

    if (willBeOut) {
      // 확실한 아웃: 최고 점수
      knockoutScore = 500;
      canKnockout = true;
    } else if (distanceToWallAfterHit < 30) {
      // 매우 높은 아웃 확률
      knockoutScore = 300;
      canKnockout = true;
    } else if (distanceToWallAfterHit < 60) {
      // 높은 아웃 확률
      knockoutScore = 150;
      canKnockout = true;
    } else if (distanceToWallAfterHit < 100) {
      // 중간 아웃 확률
      knockoutScore = 75;
    }

    // 큰 돌로 작은 돌을 치는 경우 보너스
    if (aiStone.isBig && !targetEnemy.isBig) {
      knockoutScore *= 1.3;
    }

    return {
      score: knockoutScore,
      canKnockout,
      estimatedDistance: estimatedKickDistance,
    };
  };

  // 돌 우위성 평가 (큰돌 vs 작은돌 전략)
  const evaluateStoneAdvantage = (aiStone: any, enemyStone: any, distance: number) => {
    const aiIsBig = aiStone.isBig;
    const enemyIsBig = enemyStone.isBig;

    // 큰 돌로 작은 돌 공격: 매우 유리
    if (aiIsBig && !enemyIsBig && distance < 150) {
      return 100;
    }

    // 작은 돌로 큰 돌 공격: 가까운 거리에서만
    if (!aiIsBig && enemyIsBig && distance < 80) {
      return 50;
    }

    // 같은 크기: 보통
    if (aiIsBig === enemyIsBig) {
      return 20;
    }

    return 0;
  };

  // 강화된 동적 힘 조절 (아웃 가능성 + 자신의 안전성 고려)
  const calculateEnhancedPower = (
    aiStone: any,
    enemyStone: any,
    distance: number,
    enemyWallDanger: number,
    canKnockout: boolean,
    attackDirection: { x: number; y: number } = { x: 0, y: 0 },
  ) => {
    const basePower = aiStone.isBig ? 0.025 : 0.012; // 기본 파워를 조금 줄임 (안전성 고려)
    let powerMultiplier = 1;

    // 자신의 현재 위험도 평가
    const selfWallDanger = evaluateWallDanger(aiStone);

    // 자신이 위험한 상황에서는 파워를 줄임
    if (selfWallDanger > 0.7) {
      powerMultiplier *= 0.6; // 매우 위험하면 40% 감소
    } else if (selfWallDanger > 0.5) {
      powerMultiplier *= 0.8; // 위험하면 20% 감소
    }

    // 아웃 가능성이 높고 자신이 안전할 때만 강하게 공격
    if (canKnockout && selfWallDanger < 0.5) {
      powerMultiplier *= 1.4; // 자신이 안전할 때만 강하게
    } else if (canKnockout && selfWallDanger < 0.7) {
      powerMultiplier *= 1.2; // 약간 위험하면 조금만 강하게
    } else {
      // 일반적인 거리에 따른 힘 조절
      if (distance < 80) {
        powerMultiplier *= 0.7; // 가까운 거리: 약간 약한 힘
      } else if (distance < 150) {
        powerMultiplier *= 0.9; // 중간 거리: 조금 약한 힘
      } else {
        powerMultiplier *= 1.0; // 먼 거리: 기본 힘
      }
    }

    // 적이 벽에 매우 가까우면 더욱 강하게 (단, 자신이 안전할 때만)
    if (enemyWallDanger > 0.7 && selfWallDanger < 0.5) {
      powerMultiplier *= 1.3; // 벽에 매우 가까우면 30% 추가
    } else if (enemyWallDanger > 0.5 && selfWallDanger < 0.6) {
      powerMultiplier *= 1.1; // 벽에 가까우면 10% 추가
    }

    // 큰 돌로 작은 돌을 공격하는 경우 추가 파워 (안전할 때만)
    if (aiStone.isBig && !enemyStone.isBig && selfWallDanger < 0.6) {
      powerMultiplier *= 1.1; // 안전할 때만 10% 추가 파워
    }

    // 최대 파워 제한 (자신의 위험도에 따라 조절)
    const maxPowerBase = aiStone.isBig ? 0.045 : 0.03;
    const maxPower = maxPowerBase * (1 - selfWallDanger * 0.3); // 위험할수록 최대 파워 제한
    const finalPower = Math.min(basePower * powerMultiplier, maxPower);

    return Math.max(finalPower, 0.005); // 최소 파워 보장
  };

  // 기존 동적 힘 조절 (호환성을 위해 유지)
  const calculateDynamicPower = (
    aiStone: any,
    enemyStone: any,
    distance: number,
    enemyWallDanger: number,
  ) => {
    // 새로운 함수를 호출하되 canKnockout은 false로 처리
    return calculateEnhancedPower(aiStone, enemyStone, distance, enemyWallDanger, false);
  };

  // 포지셔닝 평가
  const evaluatePositioning = (aiStone: any, allAiStones: any[], allEnemyStones: any[]) => {
    const x = aiStone.position.x;
    const y = aiStone.position.y;

    // 보드 중앙에 가까울수록 좋음
    const centerX = BOARD_SIZE / 2;
    const centerY = BOARD_SIZE / 2;
    const distanceToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    // 너무 중앙에 있으면 점수 낮춤 (다양성을 위해)
    let positionScore = 0;
    if (distanceToCenter > 50 && distanceToCenter < 120) {
      positionScore = 50; // 적당한 중앙 위치
    } else if (distanceToCenter > 150) {
      positionScore = 30; // 중앙으로 이동 필요
    }

    if (positionScore > 0) {
      const dx = centerX - x + (Math.random() - 0.5) * 60; // 약간의 랜덤성
      const dy = centerY - y + (Math.random() - 0.5) * 60;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        return {
          score: positionScore,
          direction: { x: dx / distance, y: dy / distance },
          power: aiStone.isBig ? 0.015 : 0.008,
        };
      }
    }

    return { score: 0, direction: { x: 0, y: 0 }, power: 0 };
  };

  // 기존 AI 전략 계산 함수 (호환성을 위해 유지)
  const calculateBestMove = (aiStones: any[], enemyStones: any[]) => {
    let bestScore = -Infinity;
    let bestMove: { stone: any; direction: { x: number; y: number }; power: number } | null = null;

    for (const aiStone of aiStones) {
      for (const enemyStone of enemyStones) {
        const moveScore = evaluateMove(aiStone, enemyStone, aiStones, enemyStones);

        if (moveScore.score > bestScore) {
          bestScore = moveScore.score;
          bestMove = {
            stone: aiStone,
            direction: moveScore.direction,
            power: moveScore.power,
          };
        }
      }
    }

    return bestMove;
  };

  // 개별 수의 점수 계산
  const evaluateMove = (
    aiStone: any,
    targetEnemy: any,
    allAiStones: any[],
    allEnemyStones: any[],
  ) => {
    const dx = targetEnemy.position.x - aiStone.position.x;
    const dy = targetEnemy.position.y - aiStone.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return { score: -1000, direction: { x: 0, y: 0 }, power: 0 };

    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    // 기본 점수 계산
    let score = 0;

    // 1. 거리 점수 (가까울수록 좋음)
    const distanceScore = (Math.max(0, 300 - distance) / 300) * 100;
    score += distanceScore;

    // 2. 경계 근접성 점수 (상대방 돌을 경계로 밀어낼 가능성)
    const enemyToBorderDistance = Math.min(
      targetEnemy.position.x, // 왼쪽 경계
      targetEnemy.position.y, // 위쪽 경계
      BOARD_SIZE - targetEnemy.position.x, // 오른쪽 경계
      BOARD_SIZE - targetEnemy.position.y, // 아래쪽 경계
    );
    const borderScore = (Math.max(0, 100 - enemyToBorderDistance) / 100) * 150;
    score += borderScore;

    // 3. 큰 돌 활용 보너스
    if (aiStone.isBig && distance < 200) {
      score += 50; // 큰 돌을 가까운 거리에서 사용하면 보너스
    }

    // 4. 연쇄 공격 가능성 (다른 적 돌도 함께 밀어낼 수 있는지)
    let chainScore = 0;
    for (const otherEnemy of allEnemyStones) {
      if (otherEnemy.id === targetEnemy.id) continue;

      const distToOther = Math.sqrt(
        Math.pow(otherEnemy.position.x - targetEnemy.position.x, 2) +
          Math.pow(otherEnemy.position.y - targetEnemy.position.y, 2),
      );

      if (distToOther < 50) {
        // 다른 적 돌이 가까이 있으면
        chainScore += 30;
      }
    }
    score += chainScore;

    // 5. 자신의 안전성 (공격 후 자신이 위험해지는지)
    const safetyPenalty = calculateSafetyPenalty(
      aiStone,
      normalizedDx,
      normalizedDy,
      allEnemyStones,
    );
    score -= safetyPenalty;

    // 힘 계산 (거리와 상황에 따라 조절)
    let power: number;
    if (distance < 80) {
      // 가까운 거리: 약한 힘으로 정밀 타격
      power = aiStone.isBig ? 0.015 : 0.008;
    } else if (distance < 150) {
      // 중간 거리: 중간 힘
      power = aiStone.isBig ? 0.025 : 0.012;
    } else {
      // 먼 거리: 강한 힘
      power = aiStone.isBig ? 0.035 : 0.018;
    }

    // 경계 근처 적에게는 더 강한 힘 사용
    if (enemyToBorderDistance < 60) {
      power *= 1.3;
    }

    return {
      score,
      direction: { x: normalizedDx, y: normalizedDy },
      power,
    };
  };

  // 안전성 패널티 계산
  const calculateSafetyPenalty = (aiStone: any, dirX: number, dirY: number, enemyStones: any[]) => {
    // 공격 후 예상 위치 계산
    const estimatedNewX = aiStone.position.x + dirX * 30; // 반동 예상
    const estimatedNewY = aiStone.position.y + dirY * 30;

    let penalty = 0;

    // 경계에 너무 가까워지면 패널티
    const borderDistance = Math.min(
      estimatedNewX,
      estimatedNewY,
      BOARD_SIZE - estimatedNewX,
      BOARD_SIZE - estimatedNewY,
    );

    if (borderDistance < 40) {
      penalty += (40 - borderDistance) * 2;
    }

    // 적 돌들 근처로 가면 패널티 (반격 위험)
    for (const enemy of enemyStones) {
      const distToEnemy = Math.sqrt(
        Math.pow(enemy.position.x - estimatedNewX, 2) +
          Math.pow(enemy.position.y - estimatedNewY, 2),
      );

      if (distToEnemy < 60) {
        penalty += (60 - distToEnemy) * 0.5;
      }
    }

    return penalty;
  };

  const resetGame = () => {
    if (!engineRef.current) return;

    const { World, Bodies } = Matter;

    // 기존 돌들 제거
    World.remove(engineRef.current.world, stonesRef.current);

    // 새 돌들 생성 (data.ts에서 가져오기)
    const newStones = createAllStones();

    Matter.World.add(engineRef.current.world, newStones);
    stonesRef.current = newStones;

    // 상태 / ref 초기화
    setCurrentPlayer(1);
    setGameState('playing');
    setSelectedStoneId(null);
    setAimStart(null);
    setAimCurrent(null);
    setIsAnimating(false);
    setStoneCount({ player1: 4, player2: 4 }); // 일반돌 3개 + 큰돌 1개
    setNotifications([]);
    setShowResultModal(false);
    setIsAiTurn(false);
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
              {gameMode === 'ai'
                ? currentPlayer === 1
                  ? isAiTurn
                    ? '컴퓨터 (생각 중...)'
                    : '컴퓨터'
                  : '플레이어'
                : currentPlayer === 1
                  ? '하얀돌'
                  : '까만돌'}
            </_.CurrentPlayer>
          </div>

          {/* {gameState !== 'playing' && (
            <_.WinMessage>{gameState === 'player1wins' ? '하얀돌' : '까만돌'} 승리!</_.WinMessage>
          )} */}
        </_.TurnInfo>

        <_.StoneCountContainer>
          <_.PlayerStoneCount player={1}>
            <_.StoneIcon player={1} />
            {gameMode === 'ai' ? '컴퓨터' : '하얀돌'} {stoneCount.player1}개
          </_.PlayerStoneCount>
          <_.PlayerStoneCount player={2}>
            <_.StoneIcon player={2} />
            {gameMode === 'ai' ? '플레이어' : '까만돌'} {stoneCount.player2}개
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
              setCursorImage(CURSOR_IMAGES.default);

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

          {isAnimating && <_.AnimatingIndicator>설 굴러가는 중...</_.AnimatingIndicator>}
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
              아직 아웃된 설이 없습니다.
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
        <_.ResetButton
          onClick={() => {
            pop(top);
            // console.log('그만두기');
          }}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          그만두기
        </_.ResetButton>
      </_.Controls>

      {showResultModal && (
        <_.ResultModal>
          <_.ResultContent>
            <_.ResultTitle>게임 종료!</_.ResultTitle>
            <_.ResultMessage>
              {gameMode === 'ai'
                ? gameState === 'player1wins'
                  ? '컴퓨터'
                  : '플레이어'
                : gameState === 'player1wins'
                  ? '하얀설'
                  : '까만설'}{' '}
              승리!
              <br />
              {gameMode === 'ai'
                ? gameState === 'player1wins'
                  ? '당신의 모든 설이 추모관에 등록되었습니다.'
                  : '컴퓨터의 모든 설이 추모관에 등록되었습니다.'
                : gameState === 'player1wins'
                  ? '까만설이 모두 추모관에 등록되었습니다.'
                  : '하얀설이 모두 추모관에 등록되었습니다.'}
            </_.ResultMessage>
            <_.ResultCloseButton
              onClick={resetGame}
              onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
              onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            >
              다시 시작
            </_.ResultCloseButton>
          </_.ResultContent>
        </_.ResultModal>
      )}
    </_.Container>
  );
};

export default Sulkkagi;
