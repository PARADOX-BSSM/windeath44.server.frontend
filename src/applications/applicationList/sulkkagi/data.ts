import * as Matter from 'matter-js';

export const STONE_RADIUS = 12;

// 돌의 물리 속성 설정
export const STONE_PHYSICS = {
  frictionAir: 0.04, // 공기 저항 (움직임 중 서서히 속도 감소)
  friction: 0.8, // 마찰력 (다른 돌이나 벽과의 마찰)
  restitution: 0.8, // 반발력 (부딪혔을 때 튕기는 정도)
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
    y: 100,
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
  // 까만돌들
  {
    x: 100,
    y: 300,
    player: 2,
    id: 4,
    color: 'black',
  },
  {
    x: 200,
    y: 300,
    player: 2,
    id: 5,
    color: 'black',
  },
  {
    x: 300,
    y: 300,
    player: 2,
    id: 6,
    color: 'black',
  },
];

// Matter.js Body 생성 함수
export const createStone = (stoneData: (typeof INITIAL_STONES)[0]) => {
  return Matter.Bodies.circle(stoneData.x, stoneData.y, STONE_RADIUS, {
    label: 'stone',
    render: {
      fillStyle: stoneData.color,
      strokeStyle: 'transparent',
      lineWidth: 0,
    },
    frictionAir: STONE_PHYSICS.frictionAir,
    friction: STONE_PHYSICS.friction,
    restitution: STONE_PHYSICS.restitution,
    player: stoneData.player as any,
    id: stoneData.id as any,
    originalColor: stoneData.color as any,
    isSelected: false as any,
    isOut: false as any,
  });
};

// 모든 돌들을 생성하는 함수
export const createAllStones = () => {
  return INITIAL_STONES.map(createStone);
};
