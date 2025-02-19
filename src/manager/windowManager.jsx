import {useEffect, useState, Suspense, lazy} from 'react';
const Application = lazy(()=> import('../applications/application.jsx'));
import Discover from "../applications/discover.jsx";

const WindowManager = () => {
  const displayDriver = {
    position: "fixed",
    inset: 0
  };
  const taskBarStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "3.125rem",
    zIndex: 99999,
    backgroundColor: "springgreen"
  };
  const taskListStyle = {
    margin:0,
    padding: 0,
    height: "100%",
    width: "100%",
    listStyle: "none",
    display: "flex",
    alignContent: "center"
  };
  const taskButtonStyle = {
    height: "100%",
    backgroundColor:"lightgreen"
  };
  const taskSelectButtonStyle = {
    height: "100%",
    backgroundColor:"seagreen"
  }
  const taskStyle = { margin: "0.25rem" };
  const [layer, setLayer] = useState(1);
  const [focus, setFocus] = useState("Discover");
  const [taskList, setTaskList] = useState([]);
  const addTask = (component) => {
    setTaskList(Task => (!Task.includes(component))?
      [...Task, component]:[...Task])
  }
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
    <Suspense fallback={null}>
      <main style={displayDriver}>
        {
          taskList.map((task) => {
            return (
              <Application key={task.name}
                           name={task.name}
                           uid={task.id}
                           type={task.type}
                           layer={layer}
                           focus={focus}
                           taskList={taskList}
                           setLayer={setLayer}
                           setTaskList={setTaskList}
                           setFocus={setFocus}
              >{task.component}</Application>
            )
          })
        }
        <footer style={taskBarStyle}>
          <ul style={taskListStyle}>
            {
              taskList.map((task) => {
                if(task.type!=="Shell") {
                  if (task.name === focus) {
                    return (
                      <li style={taskStyle} key={task.name}>
                        <button style={taskSelectButtonStyle} onClick={() => {
                        }}>{task.name}</button>
                      </li>
                    )
                  } else {
                    return (
                      <li style={taskStyle} key={task.name}>
                        <button style={taskButtonStyle} onClick={() => {
                          setFocus(task.name);
                        }}>{task.name}</button>
                      </li>
                    )
                  }
                }
              })
            }
          </ul>
        </footer>
      </main>
    </Suspense>
  )
}
export default WindowManager;