import {useState} from "react";

const Settings = () => {
  const [tree, setTree] = useState([0]);
  const Push = (value) => {
    setTree([...tree , value]);
  }
  const Pop = () => {
    setTree(tree.splice(-1,1))
  }
  const Top = () => {
    if(tree.length>0)
      return tree[tree.length - 1];
    else
      return 0;
  }
  console.log(tree.length);
  return (
    <>
      <button>
        Wallpaper
      </button>
    </>
  )
}
export default Settings;