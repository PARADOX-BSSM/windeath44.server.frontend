import { useEffect, useRef } from 'react';

export default function RhythmGame() {
  const gameContainer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ✅ Safari WebGL2 폴리필 (가장 먼저 실행)
    if (!(HTMLCanvasElement.prototype as any).getContextSafariWebGL2Fixed) {
      (HTMLCanvasElement.prototype as any).getContextSafariWebGL2Fixed = function () {
        return this.getContext('webgl2') || this.getContext('webgl');
      };
    }

    // ✅ Unity loader 로드
    const script = document.createElement('script');
    script.src = '/unity/Project_HG/Build/Project_HG.loader.js';

    script.onload = () => {
      // @ts-ignore
      createUnityInstance(canvasRef.current, {
        buildUrl: '/unity/Project_HG/Build',
        dataUrl: '/unity/Project_HG/Build/Project_HG.data.unityweb',
        frameworkUrl: '/unity/Project_HG/Build/Project_HG.framework.js.unityweb',
        codeUrl: '/unity/Project_HG/Build/Project_HG.wasm.unityweb',
        streamingAssetsUrl: '/unity/Project_HG/StreamingAssets',
        companyName: 'PARADOX',
        productName: 'Project_HG',
        productVersion: '1.0',
      }).catch((err: any) => console.error(err));
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={gameContainer}
      id="unity-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'black',
      }}
    >
      {/* ✅ Unity가 사용할 실제 canvas를 미리 만들어둠 */}
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
