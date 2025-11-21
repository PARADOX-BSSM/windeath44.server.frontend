import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Position = { x: number; y: number };
export type IconPositions = Record<string, Position>;
export type GridAvailability = boolean[][];

const GRID_WIDTH = 5.5 * 16; // 80px
const GRID_HEIGHT = 6.5 * 16; // 96px
const GRID_GAP = 1 * 16; // 16px
export const CELL_W = GRID_WIDTH + GRID_GAP; // 96px
export const CELL_H = GRID_HEIGHT + GRID_GAP; // 112px

export const calculateGridSize = (width: number, height: number) => {
  const cols = Math.max(0, Math.floor(width / CELL_W));
  const rows = Math.max(0, Math.floor(height / CELL_H));
  return { cols, rows };
};

export const createEmptyGrid = (cols: number, rows: number): GridAvailability => {
  if (cols <= 0 || rows <= 0) return [];
  return Array.from({ length: rows }, () => Array(cols).fill(false));
};

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

export const iconPositionsAtom = atomWithStorage<IconPositions>('iconPositions', {});
export const gridAvailabilityAtom = atomWithStorage<GridAvailability>('gridAvailability', []);
export const gridSizeAtom = atomWithStorage<{ cols: number; rows: number }>('gridSize', { cols: 0, rows: 0 });

export const initializeGridAtom = atom(
  null,
  (get, set, { appIds, containerWidth, containerHeight }: { appIds: string[], containerWidth: number, containerHeight: number }) => {
    const { cols: newCols, rows: newRows } = calculateGridSize(containerWidth, containerHeight);
    const tempGrid: GridAvailability = createEmptyGrid(newCols, newRows);
    const existingPositions = get(iconPositionsAtom);
    const newIconPositions: IconPositions = {};
    let nextIndex = 0;

    // 기존 위치 유지하면서 화면 밖이면 재배치
    appIds.forEach(id => {
      const pos = existingPositions[id];
      if (!pos || pos.x >= newCols || pos.y >= newRows || tempGrid[pos.y]?.[pos.x]) {
        // 화면 밖이거나 이미 차있으면 새 위치
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

export const updateIconPositionAtom = atom(
  null,
  (get, set, { id, newPosition }: { id: string, newPosition: Position }) => {
    const iconPositions = get(iconPositionsAtom);
    const gridAvailability = get(gridAvailabilityAtom);
    const { cols, rows } = get(gridSizeAtom);
    const { x: newX, y: newY } = newPosition;
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

export const resizeGridAtom = atom(
  null,
  (get, set, { containerWidth, containerHeight }: { containerWidth: number, containerHeight: number }) => {
    const { cols: newCols, rows: newRows } = calculateGridSize(containerWidth, containerHeight);
    const { cols: oldCols, rows: oldRows } = get(gridSizeAtom);
    if (newCols === oldCols && newRows === oldRows) return;

    const iconPositions = get(iconPositionsAtom);
    const newIconPositions: IconPositions = {};
    const tempGrid: GridAvailability = createEmptyGrid(newCols, newRows);
    let nextIndex = 0;
    Object.keys(iconPositions).forEach(id => {
      const pos = iconPositions[id];
      if (!pos || pos.x >= newCols || pos.y >= newRows || tempGrid[pos.y]?.[pos.x]) {
        const placement = findNextAvailablePositionColumnMajor(tempGrid, newCols, newRows, nextIndex);
        if (placement) {
          newIconPositions[id] = placement;
          tempGrid[placement.y][placement.x] = true;
          nextIndex = placement.y + placement.x * newRows + 1;
        }
      } else {
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
