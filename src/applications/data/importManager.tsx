import {Suspense, lazy} from "react";
import {TaskType} from "@/modules/typeModule.tsx";
import Search from "@/applications/applicationList/search";
import MemorialMenu from "../applicationList/memorialMenu/index.tsx";
import Memorial from "../applicationList/memorial/index.tsx";
import Bow from "@/applications/applicationList/bow";
import { useAtom } from 'jotai';
import { isLogInedAtom } from "@/atoms/windowManager.ts";
import { useProcessManager } from "@/hooks/processManager.tsx";
import { getTaskCreators } from "@/services/windowManager/tasks.tsx";
import MemorialApply from "../applicationList/memorialApply/index.tsx";
import Alert from "../applicationList/alert/index.tsx";
import { getPixelFromPercent } from "@/services/kernel.tsx";

const Terminal =  lazy(()=> import("../applicationList/terminal/index.tsx"));
const Settings = lazy(()=> import("../applicationList/settings/index.tsx"));
const LogIn = lazy(()=> import("../utility/login/index.tsx"));
const MemorailHistory = lazy(()=> import("../applicationList/memorialHistory/index.tsx"));
const MemorialCommit = lazy(()=> import("../applicationList/memorialCommit/index.tsx"));
const MemorialPreview = lazy(()=> import("../applicationList/memorialPreview/index.tsx"));
const MemorialMerge = lazy(()=> import("../applicationList/memorialMerge/index.tsx"));

//Application Import 형식 예시
/*
{
        "component": <Suspense fallback={null}>{App 컴포넌트}</Suspense>,
        "type": "App",
        "id": {App 고유 id},
        "name": {App 이름},
        "appSetup":{
          "Image" : {대표 이미지},
          "minWidth" : {최소 넓이},
          "minHeight" : {최소 높이},
          "setUpWidth" : {넓이 초기값},
          "setUpHeight" : {높이 초기값},
        }
}
 */
const useApps = (): TaskType[] => {
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const [taskList, addTask, removeTask] = useProcessManager();

  const { logIn, signUp, emailChack, auth } = getTaskCreators(
    setIsLogIned,
    addTask,
    removeTask
  );

  const baseApps: TaskType[] = [
    logIn,
    signUp,
    emailChack,
    auth,
    {
      "component": <Suspense fallback={null}><Terminal/></Suspense>,
      "type": "App",
      "id": 2210,
      "name": "Terminal",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 200,
        "minHeight" : 150,
        "setUpWidth" : 300,
        "setUpHeight" : 400
      }
    },{
      "component": <Suspense fallback={null}><Settings/></Suspense>,
      "type": "App",
      "id": 2221,
      "name": "Settings",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 200,
        "minHeight" : 150,
        "setUpWidth" : 300,
        "setUpHeight" : 400
      }
    },{
      "component": <Suspense fallback={null}><Search/></Suspense>,
      "type": "App",
      "id": 2222,
      "name": "Search",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 676,
        "minHeight" : 360,
        "setUpWidth" : 676,
        "setUpHeight" : 360
    }
  },{
      "component": <Suspense fallback={null}><MemorialMenu stack={[]} push={undefined} pop={undefined} top={undefined}/></Suspense>,
      "type": "App",
      "id": 2223,
      "name": "추모관",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 800,
        "minHeight" : 464,
        "setUpWidth" : 800,
        "setUpHeight" : 464
      }
    },{
      "component": <Suspense fallback={null}><Memorial stack={[]} push={undefined} pop={undefined} top={undefined} /></Suspense>,
      "type": "App",
      "id": 2224,
      "name": "memorial",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 840,
        "minHeight" : 420,
        "setUpWidth" : 850,
        "setUpHeight" : 750,
      }
    },{
      "component": <Suspense fallback={null}><MemorailHistory stack={[]} push={undefined} pop={undefined} top={undefined}/></Suspense>,
      "type": "App",
      "id": 2225,
      "name": "memorailHistory",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 580,
        "minHeight" : 420,
        "setUpWidth" : 850,
        "setUpHeight" : 500,
      }
    },{
      "component": <Suspense fallback={null}><MemorialCommit stack={[]} push={undefined} pop={undefined} top={undefined}/></Suspense>,
      "type": "App",
      "id": 2226,
      "name": "MemorialCommit",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 580,
        "minHeight" : 420,
        "setUpWidth" : 850,
        "setUpHeight" : 500,
      }
    },{
      "component": <Suspense fallback={null}><MemorialApply stack={[]} push={undefined} pop={undefined} top={undefined}/></Suspense>,
      "type": "App",
      "id": 2227,
      "name": "MemorialApply",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 580,
        "minHeight" : 420,
        "setUpWidth" : 850,
        "setUpHeight" : 500,
      }
    },{
      "component": <Suspense fallback={null}><MemorialPreview/></Suspense>,
      "type": "App",
      "id": 2228,
      "name": "MemorialPreview",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 580,
        "minHeight" : 420,
        "setUpWidth" : 850,
        "setUpHeight" : 500,
      }
    },{
      "component": <Suspense fallback={null}><MemorialMerge/></Suspense>,
      "type": "App",
      "id": 2229,
      "name": "MemorialMerge",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : 580,
        "minHeight" : 420,
        "setUpWidth" : 850,
        "setUpHeight" : 500,
      }
    },
      {
        "component": <Suspense fallback={null}><Bow/></Suspense>,
        "type": "App",
        "id": 2230,
        "name": "Bow",
        "layer": undefined,
        "appSetup":{
          "Image" : "default",
          "minWidth" : 580,
          "minHeight" : 420,
          "setUpWidth" : 850,
          "setUpHeight" : 500,
        }
      },
    {
      "component": <Suspense fallback={null}><Alert icon="" text={<></>} onClick={() => undefined}/></Suspense>,
      "type": "App",
      "id": 2229,
      "name": "Alert",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : getPixelFromPercent("width", 40),
        "minHeight" : 220,
        "setUpWidth" : getPixelFromPercent("width", 40),
        "setUpHeight" : 220,
      }
    },
  ];

  return baseApps;
};

export default useApps;