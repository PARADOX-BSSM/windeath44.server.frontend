import WindowManager from './windowManager.tsx';

function Kernel() {
  //작업 관리를 위한 메니저 호출
  return (
    <div className="kernel">
      <WindowManager />
    </div>
  )
}

export default Kernel
