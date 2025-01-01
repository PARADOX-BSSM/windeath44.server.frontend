import {useEffect, useState} from 'react';
import Application from '../applications/application.jsx';
import Discover from "../applications/discover.jsx";

const WindowManager = () => {
  const displayDriver = {
    position: "fixed",
    inset: 0
  };
  const [layer, setLayer] = useState(1);
  const [focus,setFocus] = useState(null);
  const [taskList, setTaskList] = useState([]);
  useEffect(()=>{
    setTimeout(()=>{
      setTaskList(Temp=> [...Temp,
        {
          "component":<Discover taskList={taskList} setTaskList={setTaskList}/>,
          "type":"Shell",
          "id":taskList.length,
          "layer":taskList.length
        }
      ])
    }, 200)
  },[])
  return(
    <main className="window-manager" style={displayDriver}>
      {
        taskList.map((task) => {
          return(
            <Application key={task.id}
                         uid={task.id}
                         type={task.type}
                         layer={layer}
                         setLayer={setLayer}
            >{task.component}</Application>
          )
        })
      }
    </main>
  )
}
export default WindowManager;