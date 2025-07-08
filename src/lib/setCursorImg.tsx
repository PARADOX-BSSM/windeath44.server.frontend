

export const setCursorImage = (imagePath: string) => {
  const cursor = document.getElementById("cursor");
  if (cursor) {
    cursor.style.backgroundImage = `url('${imagePath}')`;
  }
};