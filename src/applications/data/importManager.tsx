import {Suspense, lazy} from "react";
import {TaskType} from "@/modules/typeModule.tsx";

const Terminal =  lazy(()=> import("../Terminal.tsx"));
const Settings = lazy(()=> import("../settings.tsx"));
const LogIn = lazy(()=> import("../utility/login/index.tsx"));

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
const Apps:TaskType[] =
    [
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
        "component": <Suspense fallback={null}><LogIn/></Suspense>,
        "type": "App",
        "id": 2222,
        "name": "LogIn",
        "layer": undefined,
        "appSetup":{
          "Image" : "default",
          "minWidth" : 800,
          "minHeight" : 464,
          "setUpWidth" : 800,
          "setUpHeight" : 464
        }
      }

    ]

export {Apps}
