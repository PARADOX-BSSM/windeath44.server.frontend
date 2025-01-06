import Application from "./application.jsx";

const Discover = ({addTask}) => {
  const Application1 = {
    "component": <></>,
    "type": "App",
    "id": 1234,
    "name":"Application1"
  }
  const Application2 = {
    "component": <>hello</>,
    "type": "App",
    "id": 2345,
    "name":"Application2"
  }
  return(
    <>
      <>
        <button onClick={() => {
          addTask(Application1);
        }}>Application
        </button>
        <button onClick={() => {
          addTask(Application2);
        }}>Application2
        </button>
      </>
    </>
  )
}
export default Discover;