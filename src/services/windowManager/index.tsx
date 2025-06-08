import * as _ from './style.ts';
import { useEffect, useState, Suspense, lazy } from 'react';
import { useAtom } from 'jotai';
import { isLogInedAtom, focusAtom, backUpFocusAtom, startOptionAtom } from '@/atoms/windowManager.ts';
import Discover from "../../applications/discover.tsx";
import Observer from "../../applications/utility/observer/index.tsx";
import { useProcessManager } from "../../hooks/processManager.tsx";
import { TaskType } from "../../modules/typeModule.tsx";
import LogIn from '@/applications/utility/login';
import SignUp from "@/applications/utility/signUp";
const Application = lazy(() => import('../../applications/layout/index.tsx'));
import EmailChack from "applications/utility/emailCheck";
import Auth from "@/applications/utility/auth";


const WindowManager = () => {
  const [cursorVec, setCursorVec] = useState<number[]>([0, 0, 0, 0]);
  const [mouseBeacon, setMouseBeacon] = useState<number[]>([0, 0]);
  const [sideWidth, setSideWidth] = useState<number>(0);

  // jotai 전역 상태
  const [focus, setFocus] = useAtom(focusAtom);
  const [startOption, setStartOption] = useAtom(startOptionAtom);
  const [backUpFocus, setBackUpFocus] = useAtom(backUpFocusAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);

  const [taskList, addTask, removeTask] = useProcessManager();

  const changeToSignUp = () => {
    addTask(signUp);
    removeTask(logIn);
  }
  const changeToLogIn = () => {
    addTask(logIn);
    removeTask(signUp);
    removeTask(emailChack);
    removeTask(auth);
  }
  const changeToEmailCheck = () => {
    addTask(emailChack)
    removeTask(logIn);
    removeTask(auth);
  }
  const changeToAuth = () => {
    addTask(auth)
    removeTask(emailChack);
  }

  const logIn: TaskType = {
    "component": <Suspense fallback={null}><LogIn setIsLogIned={setIsLogIned} changeToSignUp={changeToSignUp} changeToEmailCheck={changeToEmailCheck} /></Suspense>,
    "type": "App",
    "id": 1,
    "name": "LogIn",
    "layer": undefined,
    "appSetup": {
      "Image": "default",
      "minWidth": 748,
      "minHeight": 464,
      "setUpWidth": 748,
      "setUpHeight": 464
    }
  }

  const signUp: TaskType = {
    "component": <Suspense fallback={null}><SignUp changeToLogIn={changeToLogIn} /></Suspense>,
    "type": "App",
    "id": 2,
    "name": "SignUp",
    "layer": undefined,
    "appSetup": {
      "Image": "default",
      "minWidth": 748,
      "minHeight": 550,
      "setUpWidth": 748,
      "setUpHeight": 550
    }
  }
  const emailChack: TaskType = {
    "component": <Suspense fallback={null}><EmailChack changeToLogIn={changeToLogIn} changeToAuth={changeToAuth} /></Suspense>,
    "type": "App",
    "id": 3,
    "name": "EmailChack",
    "layer": undefined,
    "appSetup": {
      "Image": "default",
      "minWidth": 748,
      "minHeight": 464,
      "setUpWidth": 748,
      "setUpHeight": 464
    }
  }
  const auth: TaskType = {
    "component": <Suspense fallback={null}><Auth changeToLogIn={changeToLogIn} changeToEmailCheck={changeToEmailCheck} /></Suspense>,
    "type": "App",
    "id": 4,
    "name": "auth",
    "layer": undefined,
    "appSetup": {
      "Image": "default",
      "minWidth": 748,
      "minHeight": 464,
      "setUpWidth": 748,
      "setUpHeight": 464
    }
  }


  // 포커스가 바뀔 때마다
  useEffect(() => {
    if (focus !== "Observer") {
      setStartOption(false);
    }
  }, [focus])
  useEffect(() => { //초기 기본 설정
    if (isLogIned) {
      removeTask(logIn)
      const discover: TaskType = {
        "component": <Discover startOption={startOption} setStartOption={setStartOption} focus={focus} setFocus={setFocus} backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} />,
        "type": "Shell",
        "id": 0,
        "layer": -3,
        "name": "Discover",
        "appSetup": undefined
      }
      setTimeout(() => { addTask(discover) }, 200)
    }
    else {
      setTimeout(() => { addTask(logIn) }, 200)
    }
  }, [isLogIned])

  useEffect(() => {
    const container: HTMLElement = document.getElementById("cursorContainer") as HTMLElement;
    const cursor = document.getElementById("cursor");
    if (!container || !cursor) return;
    cursor.style.zIndex = "9990";
    const bounds = container.getBoundingClientRect();
    document.addEventListener("mousemove", (event: MouseEvent) => {
      let x = event.clientX - bounds.x + bounds.left;
      let y = event.clientY - bounds.y;
      x = Math.max(bounds.left, Math.min(bounds.width - 5 + bounds.left, x));
      y = Math.max(0, Math.min(bounds.height - 5, y));
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      setMouseBeacon([event.clientX, event.clientY]);
      setCursorVec([x, y]);
    });
  }, [])

  useEffect(() => {
    const updateSideWidth = () => {
      const fullWidth = window.innerWidth;
      const fullHeight = window.innerHeight;
      const containerWidth = fullHeight * 4 / 3;
      const calculatedSide = (fullWidth - containerWidth) / 2;
      setSideWidth(Math.max(0, calculatedSide));
    }
    updateSideWidth();
    window.addEventListener('resize', updateSideWidth);
    return () => window.removeEventListener('resize', updateSideWidth);
  }, []);

  return (
    <_.Desktop>
      <Suspense fallback={null}>
        <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
        <_.Display id='cursorContainer'>
          <div id="cursor"></div>
          {
            taskList.map((task: TaskType) => {
              return (
                <Application
                  key={task.name}
                  name={task.name}
                  uid={task.id}
                  type={task.type}
                  appSetup={task.appSetup}
                  setUpHeight={task.appSetup?.setUpHeight}
                  setUpWidth={task.appSetup?.setUpWidth}
                  cursorVec={cursorVec}
                  removeTask={removeTask}
                  removeCompnent={task}
                  mouseBeacon={mouseBeacon}
                >
                  {task.component}
                </Application>
              )
            })
          }
          {startOption ? <Observer addTask={addTask} /> : <></>}
        </_.Display>
        <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
      </Suspense>
    </_.Desktop>
  )
}
export default WindowManager;