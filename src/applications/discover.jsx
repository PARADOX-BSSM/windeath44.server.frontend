import {Suspense, lazy} from 'react';
const Terminal = lazy(() => import('./Terminal'));

const Discover = ({addTask, Apps}) => {
  return(
    <>
      {Apps.map(Application => {
        return (
          <div key={Application.name} className="app-button">
            <button onDoubleClick={() => {
              addTask(Application);
            }}>
            </button>
            <span className="app-title">{Application.name}</span>
          </div>
        )
      })}
    </>
  )
}
export default Discover;