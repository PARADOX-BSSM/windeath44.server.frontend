import * as _ from './style.ts';
import { useEffect, useState, Suspense, lazy } from 'react';
import { useAtom } from 'jotai';
import { isLogInedAtom, focusAtom, backUpFocusAtom, startOptionAtom } from '@/atoms/windowManager.ts';
import Discover from "../../applications/discover.tsx";
import Observer from "../../applications/utility/observer/index.tsx";
import { useProcessManager } from "../../hooks/processManager.tsx";
import { TaskType } from "../../modules/typeModule.tsx";
import { getTaskCreators } from './tasks';
import { useTaskTransformFunction } from '@/hooks/taskTransformer.tsx';
import { useTaskSearchFunction } from '@/hooks/taskSearch.tsx';
import { useAlerter } from '@/hooks/alerter.tsx';

const Application = lazy(() => import('../../applications/layout/index.tsx'));

const WindowManager = () => {
  const [cursorVec, setCursorVec] = useState<number[]>([0, 0, 0, 0]);
  const [sideWidth, setSideWidth] = useState<number>(0);

  // jotai 전역 상태
  const [focus, setFocus] = useAtom(focusAtom);
  const [startOption, setStartOption] = useAtom(startOptionAtom);
  const [backUpFocus, setBackUpFocus] = useAtom(backUpFocusAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);

  const [taskList, addTask, removeTask] = useProcessManager();
  const { logIn, signUp, emailChack, auth } = getTaskCreators(setIsLogIned, addTask, removeTask);

  // Custom Hook 초기화 역할
  useTaskTransformFunction();
  useTaskSearchFunction();
  useAlerter();

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
        "component": <Discover startOption={startOption} setStartOption={setStartOption} backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} />,
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