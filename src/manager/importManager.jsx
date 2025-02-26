import {Suspense, lazy} from "react";
const Terminal =  lazy(()=> import("../applications/Terminal.jsx"));

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
      }
    ]

export {Apps}
