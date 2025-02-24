import {Suspense, lazy} from 'react';
const Terminal = lazy(() => import('./Terminal'));

const Discover = ({addTask}) => {
  const Apps = [
    {
      "component": <Suspense fallback={null}><></></Suspense>,
      "type": "App",
      "id": 2345,
      "name": "Settings"
    },
    {
      "component": <Suspense fallback={null}><Terminal /></Suspense>,
      "type": "App",
      "id": 2210,
      "name":"Terminal"
    }
  ]

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