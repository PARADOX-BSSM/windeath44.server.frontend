import { toNumber } from "@/modules/typeModule.tsx";

export function getCorner(cursorVec: number[], window: React.CSSProperties) {
  const [x, y] = cursorVec;
  const { left, top, width, height } = window;

  const nearRight = x >= toNumber(left) + toNumber(width) - 10;
  const nearLeft = x <= toNumber(left) + 10;
  const nearBottom = y >= toNumber(top) + toNumber(height) - 10;

  return [nearRight, nearLeft, nearBottom] as [boolean, boolean, boolean];
}

export function widthCondition(corner: [boolean, boolean, boolean]) {
  const [nearRight, nearLeft, nearBottom] = corner;
  return ((nearRight && nearBottom) || (nearLeft && nearBottom) || nearRight || nearLeft);
}
export function heightCondition(corner: [boolean, boolean, boolean]) {
  const [nearRight, nearLeft, nearBottom] = corner;
  return ((nearRight && nearBottom) || (nearLeft && nearBottom) || nearBottom);
}
export function leftCondition(corner: [boolean, boolean, boolean]) {
  const [, nearLeft, nearBottom] = corner;
  return ((nearLeft && nearBottom) || nearLeft);
}

export type DragParams = {
  offset: [number, number];
};