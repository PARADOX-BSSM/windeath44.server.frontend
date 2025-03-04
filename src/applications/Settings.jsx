import {useState} from "react";

const Settings = () => {
  const [tree, setTree] = useState([0]);
  const Push = (value) => {
    setTree([...tree , value]);
  }
  const Pop = () => {
    if(tree.length>0) {
      let copy = [...tree];
      copy.splice(-1,1)
      setTree([...copy])
    }
  }
  const Top = () => {
    if(tree.length>0)
      return tree[tree.length - 1];
    else
      return 0;
  }

  if(Top()===0)
    return (
      <>
        <button onClick={() => {
          Push(1)
        }}>
          Wallpaper
        </button>
        <button onClick={() => {
          Push(2)
        }}>
          Account
        </button>
      </>
    )
  else if (Top() === 1)
    return (
      <>
        <header>
          <button onClick={() => {
            Pop()
          }}>Back
          </button>
          wallpaper
        </header>
      </>
    )
  else if (Top() === 2)
    return (
      <>
        <button onClick={() => {
          Pop()
        }}>Back
        </button>
        Account
      </>
    )
}
export default Settings;