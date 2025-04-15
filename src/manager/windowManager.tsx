import { useEffect, useState, Suspense, lazy } from 'react';
import styled from "styled-components";
import Discover from "../applications/discover.tsx";
import Observer from "../applications/utility/Observer.tsx";
import { useProcessManager } from "./processManager.tsx";
import { TaskType } from "../modules/typeModule.tsx";
import '../Theme.css';
const Application = lazy(() => import('../applications/application.tsx'));


const TaskBar = styled.footer`
    position: sticky;
    bottom: 0;
    width: inherit;
    height: 3.125rem;
    z-index: 998;
    background-color: springgreen;
`;
const Display = styled.main`
    height : 100vh;
    aspect-ratio: 4/3;
    inset: 0;
    margin: 0 auto;
    cursor: none;
`;
const TaskList = styled.ul`
    margin:0;
    padding: 0;
    height: 100%;
    width: 100%;
    list-style: none;
    display: flex;
    align-content: center;
`;
const BackgroundDiv = styled.div<{width:number}>`
    margin:0;
    padding:0;
    height:100vh;
    width: ${({ width }) => `${width}px`};
    z-index : 9999;
    background-color:black;
`
const Desktop = styled.div`
  margin:0;
  padding:0;
  display:flex;
`


const WindowManager = () => {
  const taskButtonStyle = {
    height: "100%",
    backgroundColor: "lightgreen"
  };
  const taskSelectButtonStyle = {
    height: "100%",
    backgroundColor: "seagreen"
  }
  const taskStyle = { margin: "0.25rem" };

  const [cursorVec, setCursorVec] = useState<string[]>(["0", "0"]);  //보정 후 커서 위치
  const [mouseBeacon, setMouseBeacon] = useState<number[]>([0, 0]); //마우스 절대 위치
  const [layer, setLayer] = useState<number>(1);  //최대 레이어
  const [focus, setFocus] = useState<string>("Discover"); //최대 레이어를 사용중인 애플리케이션
  const [taskList, addTask, removeTask] = useProcessManager();
  const [startOption, setStartOption] = useState<boolean>(false);
  const [backUpFocus, setBackUpFocus] = useState(focus);
  const [tabDownInterrupt, setTabDownInterrupt] = useState("empty");

  const [sideWidth, setSideWidth] = useState<number>(0);


  // 포커스가 바뀔 때마다
  useEffect(() => {
    if (focus !== "Observer") {
      setStartOption(false);
    }
  }, [focus])

  //초기 기본 설정
  useEffect(() => {
    const discover: TaskType = {
      "component": <Discover />,
      "type": "Shell",
      "id": 0,
      "layer": 0,
      "name": "Discover",
      "appSetup": undefined
    }
    setTimeout(() => { //Discover 실행
      addTask(
        discover
      )
    }, 200)
  }, [])


  // 가상 커서 구현
  useEffect(() => {
    const container: HTMLElement = document.getElementById("cursorContainer") as HTMLElement; // 화면 기준을 컨테이너로 설정
    const cursor = document.getElementById("cursor"); // 커서 불러오기

    if (!container || !cursor) return;

    // 컨테이너의 위치 및 크기
    const bounds = container.getBoundingClientRect();
    console.log(bounds.height, bounds.width)
    document.addEventListener("mousemove", (event: MouseEvent) => {
      let x = event.clientX - bounds.x + bounds.left;
      let y = event.clientY - bounds.y;
      // 컨테이너 내부에만 커서를 제한
      x = Math.max(bounds.left, Math.min(bounds.width - 5 + bounds.left, x));
      y = Math.max(0, Math.min(bounds.height - 5, y));

      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;

      setMouseBeacon([event.clientX, event.clientY]);
      setCursorVec([`${x}`, `${y}`]);
    });
  }, [])


  //side div 크기 초기 설정
  useEffect(() => {
    const updateSideWidth = () => {
      const fullWidth = window.innerWidth;
      const fullHeight = window.innerHeight;
      const containerWidth = fullHeight * 4 / 3;
      const calculatedSide = (fullWidth - containerWidth) / 2;
      setSideWidth(Math.max(0, calculatedSide));
    }
  
    updateSideWidth(); // 초기 계산
    window.addEventListener('resize', updateSideWidth); // 반응형 대응
    return () => window.removeEventListener('resize', updateSideWidth);
  }, []);



  return (
    <Desktop>
      <Suspense fallback={null}>
        <BackgroundDiv width={sideWidth}></BackgroundDiv>
        <Display id='cursorContainer'>
          <div id="cursor"></div>
          {
            taskList.map((task: TaskType) => {
              return (
                <Application key={task.name}
                  name={task.name}
                  uid={task.id}
                  type={task.type}
                  appSetup={task.appSetup}
                  layer={layer}
                  focus={focus}
                  taskList={taskList}
                  cursorVec={cursorVec}
                  tabDownInterrupt={tabDownInterrupt}
                  setLayer={setLayer}
                  setFocus={setFocus}
                  setTabDownInterrupt={setTabDownInterrupt}
                  removeTask={removeTask}
                  removeCompnent={task}
                  mouseBeacon={mouseBeacon}
                >{task.component}</Application>
              )
            })
          }
          {startOption ? <Observer addTask={addTask} /> : <></>}
          <TaskBar>
            <TaskList>
              {
                taskList.map((task) => {
                  if (task.type === "Shell") {
                    return (
                      <li style={taskStyle} key={"Observer"}>
                        <button style={startOption ? taskSelectButtonStyle : taskButtonStyle}
                          onClick={() => {
                            setStartOption(!startOption);
                            if (startOption) {
                              setFocus(backUpFocus);
                            } else {
                              setBackUpFocus(focus);
                              setFocus("Observer");
                            }
                          }
                          }>Start</button>
                      </li>
                    )
                  } else {
                    if (task.name === focus) {
                      return (
                        <li style={taskStyle} key={task.name}>
                          <button style={taskSelectButtonStyle} onClick={() => {
                            setTabDownInterrupt(task.name);
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
            </TaskList>
          </TaskBar>
        </Display>
        <BackgroundDiv width={sideWidth}></BackgroundDiv>
      </Suspense>
    </Desktop>
  )
}
export default WindowManager;