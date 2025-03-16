const Main = ({number, setSignal}) => {
  if(number === 0)
    return (
      <>
        <button onClick={() => {
          setSignal(1)
        }}>
          Wallpaper
        </button>
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
        <header>
          <button onClick={() => {
            setSignal('back');
          }}>Back
          </button>
          wallpaper
        </header>
      </>
    )
  else
    return (
      <>
      </>
    )
}

export {Main, Wallpaper}