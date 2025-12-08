let cursorLockImage: string | null = null;

export const setCursorLock = (imagePath: string | null) => {
  cursorLockImage = imagePath;
};

export const setCursorImage = (imagePath: string, force?: boolean) => {
  const finalImage = force ? imagePath : cursorLockImage ?? imagePath;
  const cursor = document.getElementById('cursor');
  if (cursor) {
    cursor.style.backgroundImage = `url('${finalImage}')`;

    // 윈도우 드래그 커서들은 클릭점이 중앙이므로 transform 적용
    const centerCursors = [
      '/assets/cursor/cursor_window_drag_horizontal.svg',
      '/assets/cursor/cursor_window_drag_vertical.svg',
      '/assets/cursor/cursor_window_drag_move.svg',
      '/assets/cursor/cursor_window_drag_45.svg',
      '/assets/cursor/cursor_window_drag_135.svg',
    ];

    if (centerCursors.includes(finalImage)) {
      cursor.style.transform = 'translate(-50%, -50%)';
    } else {
      cursor.style.transform = 'translate(0, 0)';
    }
  }
};

export const CURSOR_IMAGES = {
  hand: '/assets/cursor/cursor_hand.svg',
  default: '/assets/cursor/cursor_default.svg',
  click: '/assets/cursor/cursor_click.gif',
  drag: '/assets/cursor/cursor_drag.svg',
  block: '/assets/cursor/cursor_block.svg',
  drag_horizontal: '/assets/cursor/cursor_window_drag_horizontal.svg',
  drag_vertical: '/assets/cursor/cursor_window_drag_vertical.svg',
  drag_move: '/assets/cursor/cursor_window_drag_move.svg',
  drag_45: '/assets/cursor/cursor_window_drag_45.svg',
  drag_135: '/assets/cursor/cursor_window_drag_135.svg',
} as const;
