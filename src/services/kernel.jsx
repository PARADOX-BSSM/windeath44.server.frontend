import { useState } from 'react'
import WindowManiger from '../manager/windowManager.jsx';

function Kernel() {
  //작업 관리를 위한 메니저 호출
  return (
    <div className="kernel">
      <WindowManiger />
    </div>
  )
}

export default Kernel
