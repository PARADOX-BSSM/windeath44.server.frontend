import WindowManager from './windowManager/index.tsx';

function Kernel() {
  //작업 관리를 위한 메니저 호출

  return (
    <div className="kernel">
      <WindowManager />
    </div>
  )
}

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

export default Kernel
