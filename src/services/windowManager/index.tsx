import * as _ from './style.ts';
import { useEffect, useState, Suspense, lazy, useRef } from 'react';
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
import { setCursorImage,CURSOR_IMAGES } from '@/lib/setCursorImg.tsx';
import { useDrag } from 'react-use-gesture';

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
  const isDragging = useRef(false);
  const dragOffset = useRef([0, 0]);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  

  // Drag 감지해서 Cursor 변경
  const bindDrag = useDrag(
    ({ dragging, movement: [mx, my] }) => {
      dragOffset.current = [mx, my];
      isDragging.current = dragging;

      const clickInProgress = clickTimeout.current !== null;
      if (dragging && !clickInProgress && isTextSelecting()) {
        setCursorImage(CURSOR_IMAGES.drag);
      } else if (!dragging && !clickInProgress) {
        setCursorImage(CURSOR_IMAGES.default);
      }
    },
    { pointer: { buttons: [1] } }
  );

  const isTextSelecting = () => {
    const selection = window.getSelection();
    return selection && selection.type === 'Range' && selection.toString().trim().length > 0;
  };

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
        "component": <Discover backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} />,
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
      x = Math.max(bounds.left, Math.min(bounds.width - 1 + bounds.left, x));
      y = Math.max(0, Math.min(bounds.height - 1, y));
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


  // 클릭 시 cursor 변경
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const handleClick = () => {
      const [dx, dy] = dragOffset.current;
      const dragged = Math.abs(dx) > 10 || Math.abs(dy) > 10;
      if (dragged) return;

      setCursorImage(CURSOR_IMAGES.click);
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      clickTimeout.current = setTimeout(() => {
        setCursorImage(CURSOR_IMAGES.default);
        clickTimeout.current = null;
      }, 300);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []); 



  return (
    <_.Desktop>
      <Suspense fallback={null}>
        <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
        <_.Display id='cursorContainer' {...bindDrag()}>
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