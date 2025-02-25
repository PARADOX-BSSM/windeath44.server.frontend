import {useEffect, useState, Suspense, lazy} from 'react';
const Application = lazy(()=> import('../applications/application.jsx'));
import Discover from "../applications/discover.jsx";
import Terminal from '../applications/Terminal.jsx';

const WindowManager = () => {
  const Application1 = {
    "component": <></>,
    "type": "App",
    "id": 1234,
    "name":"Application1"
  }
  const Application2 = {
    "component": <>hello</>,
    "type": "App",
    "id": 2345,
    "name":"Application2"
  }
  const terminal = {
    "component": <Suspense fallback={null}><Terminal /></Suspense>,
    "type": "App",
    "id": 2210,
    "name":"Terminal"
  }

  const displayDriver = {
    height: "100%",
    inset: 0
  };
  const [cursorLeft, setCursorLeft] = useState("0");
  const [cursorTop, setCursorTop] = useState("0"); 
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
          "component":<Discover addTask = {addTask}
                                                    Application1={Application1}
                                                    Application2={Application2}
                                                    terminal={terminal}/>,
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
          <main className="window-manager" style={displayDriver}>
            <div id="container">
              <div id="cursor"></div>
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
                                cursorLeft={cursorLeft}
                                cursorTop={cursorTop}
                                Application1={Application1}
                                Application2={Application2}
                                terminal={terminal}
                                setLayer={setLayer}
                                setTaskList={setTaskList}
                                setFocus={setFocus}
                                removeTask={removeTask}
                    >{task.component}</Application>
                  )
                })
              }
              <footer className="task-bar">
                <ul className="task-list">
                  {
                    taskList.map((task) => {
                      if(task.type==="Shell") {
                        return(
                          <li className="shell-task" key={task.name}>
                            <button onClick={()=>{console.log("Discover")}}></button>
                          </li>
                        )
                      } else {
                        if (task.name === focus) {
                          return (
                            <li className="task-select" key={task.name}>
                            <button onClick={() => {
                              }}>{task.name}</button>
                            </li>
                          )
                        } else {
                          return (
                            <li className="task" key={task.name}>
                              <button onClick={() => {
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