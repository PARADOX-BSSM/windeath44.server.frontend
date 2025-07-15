import { useEffect } from 'react';
import MergeBtn from '../mergeBtn';
import * as _ from './style';
import { useAtom, useAtomValue } from 'jotai';
import { inputContent } from '@/atoms/inputManager';
import Help from '@/assets/help.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';

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
  // const [isClickOpen, setClickOpen] = useState<boolean>(false);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const handleClickOpen = () => {
    taskTransform?.('', '도움말');
  };
  useEffect(() => {
    setContentIn((prev) => ({
      ...prev,
      content: content,
    }));
  }, [content, setContentIn]);

  return (
    <>
      <_.Container>
        <_.TitleContainer>
          {isPerson ? <_.Title>- @{from}의 작성안</_.Title> : <_.Title>{from}</_.Title>}
          <_.Image
            src={Help}
            alt={'help'}
            onClick={handleClickOpen}
          />
        </_.TitleContainer>
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
