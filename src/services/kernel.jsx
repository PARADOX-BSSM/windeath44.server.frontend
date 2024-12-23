import { useState } from 'react'
import WindowManiger from '../manager/windowManager.jsx';
import ProcessManager from '../manager/processManager.js';

function Kernel() {
  const processManager = new ProcessManager();
  return (
    <div className="kernel">
      <WindowManiger PM={processManager} />
    </div>
  )
}

export default Kernel
