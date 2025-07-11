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

    if (direction === "width") {
      return screenWidth * (percent / 100);
    }
    if (direction === "height") {
      return screenHeight * (percent / 100);
    }

    return 0;
}