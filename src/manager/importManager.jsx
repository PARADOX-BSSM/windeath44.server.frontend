import {Suspense, lazy} from "react";
const Terminal =  lazy(()=> import("../applications/Terminal.jsx"));
const Settings = lazy(()=> import("../applications/Settings.jsx"));

const Apps =
    [
      {
        "component": <Suspense fallback={null}><Terminal/></Suspense>,
        "type": "App",
        "id": 2210,
        "name": "Terminal",
        "appSetup":{
          "minWidth" : 200,
          "minHeight" : 150
        }
      },{
        "component": <Suspense fallback={null}><Settings/></Suspense>,
        "type": "App",
        "id": 2221,
        "name": "Settings"
      }
    ]

export {Apps}
