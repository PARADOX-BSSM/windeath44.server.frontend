import Application from "./application.jsx";

const Discover = ({taskList, setTaskList}) => {
  let key = 1;
  return(
    <>
      <>
        <button onClick={() => {
          setTaskList(Temp => [...Temp,
            {
              "component": <></>,
              "type": "App",
              "id": key++,
              "layer":taskList.length,
              "name":"Application"
            }
          ])
        }}>Application
        </button>
        <button onClick={() => {
          setTaskList(Temp => [...Temp,
            {
              "component": <>hello</>,
              "type": "App",
              "id": key++,
              "layer":taskList.length,
              "name":"Application2"
            }
          ])
        }}>Application2
        </button>
      </>
    </>
  )
}
export default Discover;