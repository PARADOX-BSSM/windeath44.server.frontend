import {useEffect, useState, Suspense, lazy} from 'react';
const Application = lazy(()=> import('../applications/application.jsx'));
import Discover from "../applications/discover.jsx";

const WindowManager = () => {
  const displayDriver = {
    position: "fixed",
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
  let cursor = null;
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
                              setLayer={setLayer}
                              setTaskList={setTaskList}
                              setFocus={setFocus}
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
      </Suspense>
    </div>
  )
}
export default WindowManager;