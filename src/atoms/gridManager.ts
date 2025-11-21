// 📌 TYPE DEFINITIONS
export type Position = { x: number; y: number };
export type IconPositions = Record<string, Position>;
export type GridAvailability = boolean[][];

// ICON AND GRID CONSTANTS
const GRID_WIDTH = 5 * 16; // 80px
const GRID_HEIGHT = 6 * 16; // 96px
const GRID_GAP = 1 * 16; // 16px
export const CELL_W = GRID_WIDTH + GRID_GAP; // 96px
export const CELL_H = GRID_HEIGHT + GRID_GAP; // 112px

/** 컨테이너 크기에서 그리드 열/행 수 계산 */
export const calculateGridSize = (width: number, height: number) => {
  const cols = Math.max(0, Math.floor(width / CELL_W));
  const rows = Math.max(0, Math.floor(height / CELL_H));
  return { cols, rows };
};

/** 빈 그리드 생성 */
export const createEmptyGrid = (cols: number, rows: number): GridAvailability => {
  if (cols <= 0 || rows <= 0) return [];
  return Array.from({ length: rows }, () => Array(cols).fill(false));
};

/** 왼쪽 위부터 아래로, 한 줄 끝나면 오른쪽으로 이동하면서 다음 빈 위치 찾기 */
export const findNextAvailablePositionColumnMajor = (
  grid: GridAvailability,
  cols: number,
  rows: number,
  startIndex: number
): Position | null => {
  for (let i = startIndex; i < rows * cols; i++) {
    const x = Math.floor(i / rows); // 열
    const y = i % rows;             // 위부터 아래

    if (x >= cols) break;
    if (!grid[y][x]) return { x, y };
  }
  return null;
};

import { atom } from 'jotai';

// ----------------------------------------------------
// 📌 Core State Atoms
// ----------------------------------------------------
export const iconPositionsAtom = atom<IconPositions>({});
export const gridAvailabilityAtom = atom<GridAvailability>([]);
export const gridSizeAtom = atom({ cols: 0, rows: 0 });

// ----------------------------------------------------
// 📌 Writeable Derived Atoms
// ----------------------------------------------------
export const initializeGridAtom = atom(
  null,
  (get, set, { appIds, containerWidth, containerHeight }: { appIds: string[], containerWidth: number, containerHeight: number }) => {
    const { cols, rows } = calculateGridSize(containerWidth, containerHeight);
    const newIconPositions: IconPositions = {};
    const tempGrid: GridAvailability = createEmptyGrid(cols, rows);

    // column-major: 왼쪽 위부터 아래로, 한 열 끝나면 오른쪽
    appIds.forEach((id, index) => {
      const x = Math.floor(index / rows);
      const y = index % rows;

      if (x < cols) {
        newIconPositions[id] = { x, y };
        tempGrid[y][x] = true;
      }
    });

    set(iconPositionsAtom, newIconPositions);
    set(gridSizeAtom, { cols, rows });
    set(gridAvailabilityAtom, tempGrid);
  }
);

export const updateIconPositionAtom = atom(
  null,
  (get, set, { id, newPosition }: { id: string, newPosition: Position }) => {
    const iconPositions = get(iconPositionsAtom);
    const gridAvailability = get(gridAvailabilityAtom);
    const gridSize = get(gridSizeAtom);

    const { x: newX, y: newY } = newPosition;
    const { cols, rows } = gridSize;
    const currentPosition = iconPositions[id];

    if (newX < 0 || newY < 0 || newX >= cols || newY >= rows) return;
    const isCollision = gridAvailability[newY]?.[newX] && (currentPosition?.x !== newX || currentPosition?.y !== newY);
    if (isCollision) return;
    if (currentPosition && currentPosition.x === newX && currentPosition.y === newY) return;

    const newGrid = gridAvailability.map(row => [...row]);
    if (currentPosition) newGrid[currentPosition.y][currentPosition.x] = false;
    newGrid[newY][newX] = true;

    set(iconPositionsAtom, { ...iconPositions, [id]: newPosition });
    set(gridAvailabilityAtom, newGrid);
  }
);

/** 벗어난 아이콘만 재배치, 왼쪽 위부터 아래로 채우고 한 열 끝나면 오른쪽으로 이동 */
export const resizeGridAtom = atom(
  null,
  (get, set, { containerWidth, containerHeight }: { containerWidth: number, containerHeight: number }) => {
    const { cols: newCols, rows: newRows } = calculateGridSize(containerWidth, containerHeight);
    const currentGridSize = get(gridSizeAtom);
    if (newCols === currentGridSize.cols && newRows === currentGridSize.rows) return;

    const iconPositions = get(iconPositionsAtom);
    const newIconPositions: IconPositions = {};
    const tempGrid: GridAvailability = createEmptyGrid(newCols, newRows);

    let nextIndex = 0;
    Object.keys(iconPositions).forEach(id => {
      const pos = iconPositions[id];

      if (!pos || pos.x >= newCols || pos.y >= newRows || tempGrid[pos.y]?.[pos.x]) {
        // 벗어난 아이콘 재배치
        const placement = findNextAvailablePositionColumnMajor(tempGrid, newCols, newRows, nextIndex);
        if (placement) {
          newIconPositions[id] = placement;
          tempGrid[placement.y][placement.x] = true;
          nextIndex = placement.y + placement.x * newRows + 1;
        }
      } else {
        // 기존 위치 유지
        newIconPositions[id] = pos;
        tempGrid[pos.y][pos.x] = true;
        nextIndex = pos.y + pos.x * newRows + 1;
      }
    });

    set(iconPositionsAtom, newIconPositions);
    set(gridSizeAtom, { cols: newCols, rows: newRows });
    set(gridAvailabilityAtom, tempGrid);
  }
);
