import {Suspense, lazy} from 'react';
const Terminal = lazy(() => import('./Terminal'));

const Discover = ({addTask, Application1, Application2, terminal}) => {
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
      <div className="app-button">
        <button onDoubleClick={() => {
          addTask(terminal);
        }}>
        </button>
        <span className="app-title">terminal</span>
      </div>
    </>
  )
}
export default Discover;