export const getPixelFromPercent = (
    direction: "width" | "height",
    percent: number
): number => {
    const container: HTMLElement = document.getElementById("cursorContainer") as HTMLElement;
    if (!container) return 0;

    if (percent < 0 || percent > 100) {
      console.warn(`Invalid percent value: ${percent}. Expected 0-100.`);
      return 0;
    }

    const computed = window.getComputedStyle(container);
    if (direction === "width") {
      const width = parseFloat(computed.width);
      return width * (percent / 100);
    }
    if (direction === "height") {
      const height = parseFloat(computed.height);
      return height * (percent / 100);
    }

    return 0;
}