import {useEffect, useState, Suspense, lazy} from 'react';
const Application = lazy(()=> import('../applications/application.jsx'));
import Discover from "../applications/discover.jsx";
import Terminal from '../applications/Terminal.jsx';
import {Apps} from './importManager.jsx';
const WindowManager = () => {
  const displayDriver = {
    height: "100%",
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
  const [cursorLeft, setCursorLeft] = useState("0");
  const [cursorTop, setCursorTop] = useState("0");
  const [mouseBeacon, setMouseBeacon] = useState([]);
  const [layer, setLayer] = useState(1);
  const [focus, setFocus] = useState("Discover");
  const [taskList, setTaskList] = useState([]);
  const addTask = (component) => {
    setTaskList(Task => (!Task.includes(component))?
      [...Task, component]:[...Task])
  }
  const removeTask = (component) => {
    setTaskList(Task => (Task.some(item => item.name === component.name))?
    Task.filter(item => item.name !== component.name):[...Task])
    console.log(taskList.filter(item => item.name !== Application1.name));
  }
  useEffect(() => {
    console.log(1, taskList);
  }, [taskList]); 
  let cursor = null;
  useEffect(()=>{
    setTimeout(()=>{
      setTaskList(Temp=> [...Temp,
        {
          "component":<Discover addTask = {addTask} Apps={Apps}/>,
          "type":"Shell",
          "id":taskList.length,
          "layer":0,
          "name":"Discover"
        }
      ])
    }, 200)
    const container = document.getElementById("container");
    cursor = document.getElementById("cursor");

    console.log(container);

    // 컨테이너의 위치 및 크기
    const bounds = container.getBoundingClientRect();

    console.log(bounds);

    document.addEventListener("mousemove", (event) => {
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        setMouseBeacon([event.clientX, event.clientY]);
        // 컨테이너 내부에만 커서를 제한
        x = Math.max(0, Math.min(bounds.width, x));
        y = Math.max(0, Math.min(bounds.height, y));

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        
        setCursorLeft(`${x}`);
        setCursorTop(`${y}`);
    });
  },[])

  

  return(
    <div>
      <Suspense fallback={null}>
      <div className="king">
        <div className="outside"></div>
          <main style={displayDriver}>
            <div id="container">
              <div id="cursor"></div>
              {
                taskList.map((task) => {
                  return (
                    <Application key={task.name}
                                 name={task.name}
                                 uid={task.id}
                                 type={task.type}
                                 appSetup={task.appSetup}
                                 layer={layer}
                                 focus={focus}
                                 taskList={taskList}
                                 cursorLeft={cursorLeft}
                                 cursorTop={cursorTop}
                                 setLayer={setLayer}
                                 setTaskList={setTaskList}
                                 setFocus={setFocus}
                                 removeTask={removeTask}
                                 removeCompnent={task}
                                 mouseBeacon={mouseBeacon}
                    >{task.component}</Application>
                  )
                })
              }
              <footer style={taskBarStyle}>
                <ul style={taskListStyle}>
                  {
                    taskList.map((task) => {
                      if(task.type==="Shell") {
                        return(
                          <li style={taskStyle} key={task.name}>
                            <button onClick={()=>{console.log("Discover")}}></button>
                          </li>
                        )
                      } else {
                        if (task.name === focus) {
                          return (
                            <li style={taskStyle} key={task.name}>
                            <button onClick={() => {
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
            </div>
          </main>
          <div className="outside"></div>
        </div>
      </Suspense>
    </div>
  )
}
export default WindowManager;