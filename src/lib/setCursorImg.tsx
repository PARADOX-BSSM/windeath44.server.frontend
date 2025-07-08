

export const setCursorImage = (imagePath: string) => {
  const cursor = document.getElementById("cursor");
  if (cursor) {
    cursor.style.backgroundImage = `url('${imagePath}')`;
  }
};

export const CURSOR_IMAGES = {
  hand: '/assets/cursor/cursor_hand.svg',
  default: '/assets/cursor/cursor_default.svg',
  click: '/assets/cursor/cursor_click.gif',
  drag: '/assets/cursor/cursor_drag.svg',
  block: '/assets/cursor/cursor_block.svg'
} as const;
