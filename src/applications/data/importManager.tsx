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
import { getPixelFromPercent } from "@/lib/getPixelFromPercent.tsx";
import MemorialApproach from "../applicationList/settings/index.tsx";

const Terminal =  lazy(()=> import("../applicationList/terminal/index.tsx"));
const MemorailHistory = lazy(()=> import("../applicationList/memorialHistory/index.tsx"));
const MemorialCommit = lazy(()=> import("../applicationList/memorialCommit/index.tsx"));
const MemorialPreview = lazy(()=> import("../applicationList/memorialPreview/index.tsx"));
const MemorialMerge = lazy(()=> import("../applicationList/memorialMerge/index.tsx"));

import memorialApproach from '@/assets/appIcons/search.svg';
import trashBin from '@/assets/appIcons/empty_bin.svg';
import AnimationSelect from "../applicationList/animationSelect/index.tsx";

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
        },
        "visible": {바탕화면에 보일지 안보일지 여부}
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
      "name": "휴지통",
      "layer": undefined,
      "appSetup":{
        "Image" : trashBin,
        "minWidth" : 200,
        "minHeight" : 150,
        "setUpWidth" : 300,
        "setUpHeight" : 400
      },
      "visible":true,
    },{
      "component": <Suspense fallback={null}><MemorialApproach/></Suspense>,
      "type": "App",
      "id": 2221,
      "name": "추모관",
      "layer": undefined,
      "appSetup":{
        "Image" : memorialApproach,
        "minWidth" : getPixelFromPercent("width", 75),
        "minHeight" : getPixelFromPercent("height", 55),
        "setUpWidth" : getPixelFromPercent("width", 75),
        "setUpHeight" : getPixelFromPercent("height", 55),
      },
      "visible":true,
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
    },
    "visible":false,
  },{
      "component": <Suspense fallback={null}><MemorialMenu stack={[]} push={undefined} pop={undefined} top={undefined}/></Suspense>,
      "type": "App",
      "id": 2223,
      "name": "memorialMenu",
      "layer": undefined,
      "appSetup":{
        "Image" : "default",
        "minWidth" : getPixelFromPercent("width", 75),
        "minHeight" : getPixelFromPercent("height", 55),
        "setUpWidth" : getPixelFromPercent("width", 75),
        "setUpHeight" : getPixelFromPercent("height", 55),
      },
      "visible":false,
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
      },
      "visible":false,
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
      },
      "visible":false,
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
      },
      "visible":false,
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
      },
      "visible":false,
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
      },
      "visible":false,
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
      },
      "visible":false,
    },{
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
       },
       "visible":false,
      },{
        "component": <Suspense fallback={null}><Alert icon="" text={<></>} onClick={() => undefined}/></Suspense>,
        "type": "App",
        "id": 2231,
        "name": "Alert",
        "layer": undefined,
        "appSetup":{
          "Image" : "default",
          "minWidth" : getPixelFromPercent("width", 45),
          "minHeight" : getPixelFromPercent("height", 30),
          "setUpWidth" : getPixelFromPercent("width", 45),
          "setUpHeight" : getPixelFromPercent("height", 30),
        },
        "visible":false,
      },{
        "component": <Suspense fallback={null}><AnimationSelect /></Suspense>,
        "type": "App",
        "id": 2232,
        "name": "애니메이션 선택",
        "layer": undefined,
        "appSetup":{
          "Image" : "default",
          "minWidth" : getPixelFromPercent("width", 60),
          "minHeight" : getPixelFromPercent("height", 55),
          "setUpWidth" : getPixelFromPercent("width", 60),
          "setUpHeight" : getPixelFromPercent("height", 55),
        },
        "visible":true,
      }
  ];

  return baseApps;
};

export default useApps;