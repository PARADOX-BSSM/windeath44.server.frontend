import Application from "./application.jsx";

const Discover = ({taskList, setTaskList}) => {
  const Application1 = {
    "component": <></>,
    "type": "App",
    "id": 1234,
    "layer":taskList.length,
    "name":"Application"
  }
  const Application2 = {
    "component": <>hello</>,
    "type": "App",
    "id": 2345,
    "layer":taskList.length,
    "name":"Application2"
  }
  let key = 1;
  return(
    <>
      <>
        <button onClick={() => {
          setTaskList(Temp => (!Temp.includes(Application1))?
            [...Temp, Application1]:[...Temp])
        }}>Application
        </button>
        <button onClick={() => {
          setTaskList(Temp => (!Temp.includes(Application2))?
            [...Temp, Application2]:[...(Temp.splice(1,1,Application1))])
        }}>Application2
        </button>
      </>
    </>
  )
}
export default Discover;