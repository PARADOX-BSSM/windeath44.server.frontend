type TaskType = {
  "component" : JSX.Element,
  "type" : string,
  "id" : number | undefined,
  "layer" : number | undefined,
  "name" : string,
  "appSetup" : {
    "Image" : string | undefined,
    "minWidth" : number | string | undefined,
    "minHeight" : number | string | undefined,
    "setUpWidth" : number | string | undefined,
    "setUpHeight" : number | string | undefined,
  } | undefined,
}

const toNumber = (to:string|any) => (to as any as number)

export type {TaskType}
export {toNumber}