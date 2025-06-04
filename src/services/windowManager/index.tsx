import * as _ from './style.ts';
import { useEffect, useState, Suspense, lazy } from 'react';
import Discover from "../../applications/discover.tsx";
import Observer from "../../applications/utility/observer/index.tsx";
import {useProcessManager} from "../../hooks/processManager/processManager.tsx";
import {TaskType} from "../../modules/typeModule.tsx";
import LogIn from '@/applications/utility/login';
import SignUp from "@/applications/utility/signUp";
const Application = lazy(()=> import('../../applications/layout/index.tsx'));
import EmailChack from "applications/utility/emailCheck";
import Auth from "@/applications/utility/auth";


const WindowManager = () => {

  const [cursorVec, setCursorVec] = useState<number[]>([0, 0, 0, 0]);  //보정 후 커서 위치
  const [mouseBeacon, setMouseBeacon] = useState<number[]>([0, 0]); //마우스 절대 위치
  const [layer, setLayer] = useState<number>(1);  //최대 레이어
  const [focus, setFocus] = useState<string>("Discover"); //최대 레이어를 사용중인 애플리케이션
  const [taskList, addTask, removeTask] = useProcessManager();
  const [startOption, setStartOption] = useState<boolean>(false);
  const [backUpFocus, setBackUpFocus] = useState(focus);
  const [tabDownInterrupt, setTabDownInterrupt] = useState("empty");
  const [isLogIned, setIsLogIned] = useState(false); //로그인 상태(나중에 게스트와 구분하기 위해 str 써도 될듯)

  const [sideWidth, setSideWidth] = useState<number>(0);

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

  const logIn:TaskType = { //로그인 Task
    "component": <Suspense fallback={null}><LogIn setIsLogIned={setIsLogIned} changeToSignUp={changeToSignUp} changeToEmailCheck={changeToEmailCheck}/></Suspense>,
    "type": "App",
    "id": 1,
    "name": "LogIn",
    "layer": undefined,
    "appSetup":{
      "Image" : "default",
      "minWidth" : 748,
      "minHeight" : 464,
      "setUpWidth" : 748,
      "setUpHeight" : 464
    }
  }

  const signUp:TaskType = { //회원가입 Task
    "component": <Suspense fallback={null}><SignUp changeToLogIn={changeToLogIn}/></Suspense>,
    "type": "App",
    "id": 2,
    "name": "SignUp",
    "layer": undefined,
    "appSetup":{
      "Image" : "default",
      "minWidth" : 748,
      "minHeight" : 550,
      "setUpWidth" : 748,
      "setUpHeight" : 550
    }
  }
  const emailChack:TaskType = { //이메일 입력 Task
    "component": <Suspense fallback={null}><EmailChack changeToLogIn={changeToLogIn} changeToAuth={changeToAuth}/></Suspense>,
    "type": "App",
    "id": 3,
    "name": "EmailChack",
    "layer": undefined,
    "appSetup":{
      "Image" : "default",
      "minWidth" : 748,
      "minHeight" : 464,
      "setUpWidth" : 748,
      "setUpHeight" : 464
    }
  }
  const auth:TaskType = { //인증 번호 입력 Task
    "component": <Suspense fallback={null}><Auth changeToLogIn={changeToLogIn} changeToEmailCheck={changeToEmailCheck}/></Suspense>,
    "type": "App",
    "id": 4,
    "name": "auth",
    "layer": undefined,
    "appSetup":{
      "Image" : "default",
      "minWidth" : 748,
      "minHeight" : 464,
      "setUpWidth" : 748,
      "setUpHeight" : 464
    }
  }


  // 포커스가 바뀔 때마다
  useEffect(() => {
    if (focus !== "Observer") {
      setStartOption(false);
    }
  },[focus])
  useEffect(()=>{ //초기 기본 설정
    if (isLogIned) { //로그인이 되어 있으면
      removeTask(logIn)
      const discover:TaskType = {
        "component":<Discover startOption={startOption} setStartOption={setStartOption} focus={focus} setFocus={setFocus} backUpFocus={backUpFocus} setBackUpFocus={setBackUpFocus} setTabDownInterrupt={setTabDownInterrupt} />,
        "type":"Shell",
        "id":0,
        "layer":-3,
        "name":"Discover",
        "appSetup":undefined
      }
      setTimeout(()=>{ //Discover 실행
        addTask(
          discover
        )
      }, 200)
    }
    else {
      setTimeout(()=>{ //로그인 창 실행
        addTask(
          logIn
        )
      }, 200)
    }
  },[isLogIned])

  useEffect(() => {
    const container:HTMLElement = document.getElementById("cursorContainer") as HTMLElement; // 화면 기준을 컨테이너로 설정
    const cursor = document.getElementById("cursor"); // 커서 불러오기

    if (!container || !cursor) return;

    cursor.style.zIndex = "9990";

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
      setCursorVec([x, y]);
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
    <_.Desktop>
      <Suspense fallback={null}>
        <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
        <_.Display id='cursorContainer'>
          <div id="cursor"></div>
              {
                taskList.map((task:TaskType) => {
                  return (
                    <Application key={task.name}
                                 name={task.name}
                                 uid={task.id}
                                 type={task.type}
                                 appSetup={task.appSetup}
                                 setUpHeight={task.appSetup?.setUpHeight}
                                 setUpWidth={task.appSetup?.setUpWidth}
                                 layer={layer}
                                 focus={focus}
                                 taskList={taskList}
                                 cursorVec={cursorVec}
                                 tabDownInterrupt={tabDownInterrupt}
                                 isLogIned={isLogIned}
                                 setLayer={setLayer}
                                 setFocus={setFocus}
                                 setTabDownInterrupt={setTabDownInterrupt}
                                 setIsLogIned={setIsLogIned}
                                 removeTask={removeTask}
                                 removeCompnent={task}
                                 mouseBeacon={mouseBeacon}
                    >{task.component}</Application>
                  )
                })
              }
              {startOption? <Observer addTask={addTask}/>:<></>}
        </_.Display>
        <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
      </Suspense>
    </_.Desktop>
  )
}
export default WindowManager;