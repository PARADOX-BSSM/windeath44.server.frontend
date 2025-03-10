

type TaskType = {
  "component" : JSX.Element,
  "type" : string,
  "id" : number | undefined,
  "layer" : number | undefined,
  "name" : string,
  "appSetup" : {
    "Image" : string | undefined,
    "minWidth" : number | undefined,
    "minHeight" : number | undefined,
  } | undefined,
}


export type {TaskType}