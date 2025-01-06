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
      <div className="app-button">
        <button onDoubleClick={() => {
          addTask(Application1);
        }}>
        </button>
        <span className="app-title">Application</span>
      </div>
      <div className="app-button">
        <button onDoubleClick={() => {
          addTask(Application2);
        }}>
        </button>
        <span className="app-title">Application2</span>
      </div>
    </>
  )
}
export default Discover;