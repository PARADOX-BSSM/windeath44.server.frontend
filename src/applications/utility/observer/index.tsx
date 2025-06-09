import * as _ from './style';
import {Apps} from '@/applications/data/importManager';
import {TaskType} from "@/modules/typeModule.tsx";
import {useState,useEffect} from 'react';

const Observer = (props:any) => {
  const [containerLeft, setContainerLeft] = useState<number>(0); //observe에 넘길 container 비율

  useEffect(() => {
    const container = document.getElementById("cursorContainer");
    if (container) {
      const bounds = container.getBoundingClientRect();
      setContainerLeft(bounds.left);
    }
  }, []);

  return (
    <_.Container left={containerLeft}>
      <_.Logo>
      </_.Logo>
      <_.SnapshotList>
        {Apps.map((Application:TaskType)=>{
          return(
            <_.Snapshot key={Application.id}>
              <button onClick={() => {
                props.addTask(Application);
              }}>{Application.name}</button>
            </_.Snapshot>
          )
        })}
      </_.SnapshotList>
    </_.Container>
  )
}
export default Observer;