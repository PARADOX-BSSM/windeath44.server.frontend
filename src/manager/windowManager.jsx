import {useEffect, useState} from 'react';
import Application from '../applications/application.jsx';
import Discover from "../applications/discover.jsx";

const WindowManager = () => {
  const displayDriver = {
    position: "fixed",
    inset: 0
  };
  const [layer, setLayer] = useState(1);
  const [taskList, setTaskList] = useState([]);
  const addTask = (component) => {
    setTaskList(Task => (!Task.includes(component))?
      [...Task, component]:[...Task])
  }
  useEffect(() => {
    console.log(taskList);
  },[taskList]);
  useEffect(()=>{
    setTimeout(()=>{
      setTaskList(Temp=> [...Temp,
        {
          "component":<Discover addTask = {addTask}/>,
          "type":"Shell",
          "id":taskList.length,
          "layer":0,
          "name":"Discover"
        }
      ])
    }, 200)
  },[])
  return(
    <main className="window-manager" style={displayDriver}>
      {
        taskList.map((task) => {
          return (
            <Application key={task.name}
                         uid={task.id}
                         type={task.type}
                         layer={layer}
                         setLayer={setLayer}
            >{task.component}</Application>
          )
        })
      }
      <footer className="task-bar">
        <ul className="task-list">
          {
            taskList.map((task) => {
              return (
                <li className="task" key={task.name}><button>{task.name}</button></li>
              )
            })
          }
        </ul>
      </footer>
    </main>

  )
}
export default WindowManager;