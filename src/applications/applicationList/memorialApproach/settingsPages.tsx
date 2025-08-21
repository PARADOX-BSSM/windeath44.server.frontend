import Memorial from "../memorial"
import MemorailHistory from "../memorialHistory"

const Main = ({number, setSignal}) => {
  if(number === 0)
    return (
      <>
        {/* <button onClick={() => {
          setSignal(1)
        }}>
          Wallpaper
        </button> */}
        <Memorial />
      </>
    )
  else
    return (
      <>
      </>
    )
}
const Wallpaper = ({number, setSignal}) => {
  if(number === 1)
    return (
      <>
        {/* <header>
          <button onClick={() => {
            setSignal('back');
          }}>Back
          </button>
          wallpaper
        </header> */}
        <MemorailHistory />
      </>
    )
  else
    return (
      <>
      </>
    )
}

export {Main, Wallpaper}