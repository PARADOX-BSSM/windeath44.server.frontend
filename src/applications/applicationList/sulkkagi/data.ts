import * as Matter from 'matter-js';

export const STONE_RADIUS = 12;
export const BIG_STONE_RADIUS = 18; // 큰 돌 반지름 (1.5배)

// 돌의 물리 속성 설정
export const STONE_PHYSICS = {
  frictionAir: 0.04, // 공기 저항 (움직임 중 서서히 속도 감소)
  friction: 0.8, // 마찰력 (다른 돌이나 벽과의 마찰)
  restitution: 0.8, // 반발력 (부딪혔을 때 튕기는 정도)
};

// 큰 돌 전용 물리 속성 (더 잘 움직이도록)
export const BIG_STONE_PHYSICS = {
  frictionAir: 0.03, // 공기 저항 낮음 (더 오래 굴러감)
  friction: 0.5, // 마찰력 낮음 (더 잘 미끄러짐)
  restitution: 0.9, // 반발력 높음 (더 잘 튕김)
};

// 돌 초기 위치 및 속성 데이터
export const INITIAL_STONES = [
  // 하얀돌들
  {
    x: 300,
    y: 100,
    player: 1,
    id: 1,
    color: 'white',
  },
  {
    x: 200,
    y: 160,
    player: 1,
    id: 2,
    color: 'white',
  },
  {
    x: 100,
    y: 100,
    player: 1,
    id: 3,
    color: 'white',
  },
  {
    x: 250,
    y: 140,
    player: 1,
    id: 4,
    color: 'white',
  },
  {
    x: 150,
    y: 140,
    player: 1,
    id: 5,
    color: 'white',
  },
  // 까만돌들
  {
    x: 100,
    y: 300,
    player: 2,
    id: 6,
    color: 'black',
  },
  {
    x: 200,
    y: 240,
    player: 2,
    id: 7,
    color: 'black',
  },
  {
    x: 300,
    y: 300,
    player: 2,
    id: 8,
    color: 'black',
  },
  {
    x: 150,
    y: 260,
    player: 2,
    id: 9,
    color: 'black',
  },
  {
    x: 250,
    y: 260,
    player: 2,
    id: 10,
    color: 'black',
  },
  // 하얀돌 팀 큰 돌
  {
    x: 200,
    y: 110,
    player: 1,
    id: 11,
    color: '#f0f0f0', // 연한 회색 (하얀돌보다 조금 어둡게)
    isBig: true,
  },
  // 까만돌 팀 큰 돌
  {
    x: 200,
    y: 290,
    player: 2,
    id: 12,
    color: '#2c2c2c', // 진한 회색 (까만돌보다 조금 밝게)
    isBig: true,
  },
];

// Matter.js Body 생성 함수
export const createStone = (stoneData: (typeof INITIAL_STONES)[0]) => {
  // 큰 돌이면 큰 반지름 사용, 아니면 일반 반지름 사용
  const radius = (stoneData as any).isBig ? BIG_STONE_RADIUS : STONE_RADIUS;
  const isBig = (stoneData as any).isBig;

  // 큰 돌이면 전용 물리 속성 사용
  const physics = isBig ? BIG_STONE_PHYSICS : STONE_PHYSICS;

  const body = Matter.Bodies.circle(stoneData.x, stoneData.y, radius, {
    label: 'stone',
    render: {
      fillStyle: stoneData.color,
      strokeStyle: 'transparent',
      lineWidth: 0,
    },
    frictionAir: physics.frictionAir,
    friction: physics.friction,
    restitution: physics.restitution,
    // 큰 돌도 일반 돌과 비슷한 밀도로 (잘 움직이도록)
    density: isBig ? 0.0015 : 0.001,
  });

  // 커스텀 속성들을 body에 추가
  (body as any).player = stoneData.player;
  (body as any).id = stoneData.id;
  (body as any).originalColor = stoneData.color;
  (body as any).isSelected = false;
  (body as any).isOut = false;
  (body as any).isBig = isBig || false;

  return body;
};

// 모든 돌들을 생성하는 함수
export const createAllStones = () => {
  return INITIAL_STONES.map(createStone);
};
