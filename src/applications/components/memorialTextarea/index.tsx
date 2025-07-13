import { useEffect, useState } from 'react';
import MergeBtn from '../mergeBtn';
import * as _ from './style';
import { useAtom } from 'jotai';
import { inputContent } from '@/atoms/inputManager';

interface PropsType {
  btnText?: string;
  from: string;
  content: string;
  isReadonly?: boolean;
  isPerson?: boolean;
}

const MemorialTextarea = ({
  btnText = '',
  from,
  content,
  isReadonly = false,
  isPerson = false,
}: PropsType) => {
  const [contentIn, setContentIn] = useAtom(inputContent);

  useEffect(() => {
    setContentIn((prev) => ({
      ...prev,
      content: content,
    }));
  }, [content, setContentIn]);

  return (
    <>
      <_.Container>
        {isPerson ? <_.Title>- @{from}의 작성안</_.Title> : <_.Title>{from}</_.Title>}
        <_.CommitAreaContainer>
          <_.CommitArea
            value={contentIn.content}
            onChange={(e) => setContentIn((prev) => ({ ...prev, content: e.target.value }))}
            readOnly={isReadonly}
          ></_.CommitArea>
        </_.CommitAreaContainer>
      </_.Container>
      {isPerson ? <MergeBtn text={btnText} /> : <></>}
    </>
  );
};

export default MemorialTextarea;
