export const getPixelFromPercent = (
  direction: "width" | "height",
  percent: number
): number => {
  if (percent < 0 || percent > 100) {
    console.warn(`Invalid percent value: ${percent}. Expected 0-100.`);
    return 0;
  }

  const screenHeight = window.innerHeight;
  const screenWidth = screenHeight * (4 / 3);

  const base = direction === "width"
    ? screenWidth
    : direction === "height"
      ? screenHeight
      : 0;

  const pixelValue = base * (percent / 100);
  const remValue = pixelValue / 16;

  return remValue;
};
