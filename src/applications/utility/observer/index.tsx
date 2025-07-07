import * as _ from './style';
import useApps from "@/applications/data/importManager";
import { TaskType } from "@/modules/typeModule.tsx";
import { useState, useEffect } from 'react';
import File from '@/assets/File.svg';

const Observer = (props: any) => {
  const [containerLeft, setContainerLeft] = useState<number>(0); //observe에 넘길 container 비율
  const Apps = useApps();

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
        {Apps.map((Application: TaskType) => {
          return (
            <_.Snapshot key={Application.id} onClick={() => {
              props.addTask(Application);
            }}>
              <_.SnapshotImg src={File}/>
              <_.SnapshotText >{Application.name}</_.SnapshotText>
            </_.Snapshot>
          )
        })}
      </_.SnapshotList>
    </_.Container>
  )
}
export default Observer;