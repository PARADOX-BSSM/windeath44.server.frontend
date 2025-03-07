import {Suspense, lazy} from "react";
const Terminal =  lazy(()=> import("../applications/Terminal.jsx"));
const Settings = lazy(()=> import("../applications/settings.jsx"));

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
          "minHeight" : {최소 높이}
        }
}
 */

const Apps =
    [
      {
        "component": <Suspense fallback={null}><Terminal/></Suspense>,
        "type": "App",
        "id": 2210,
        "name": "Terminal",
        "appSetup":{
          "Image" : "default",
          "minWidth" : 200,
          "minHeight" : 150
        }
      },{
        "component": <Suspense fallback={null}><Settings/></Suspense>,
        "type": "App",
        "id": 2221,
        "name": "Settings",
        "appSetup":{
          "Image" : "default",
          "minWidth" : 200,
          "minHeight" : 150
        }
      }
    ]

export {Apps}
