import MergeBtn from '../mergeBtn';
import * as _ from './style';
import { useAtom, useAtomValue } from 'jotai';
import Help from '@/assets/help.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { memorialContentAtom } from '@/atoms/memorialManager.ts';

interface PropsType {
  btnText?: string;
  from: string;
  isReadonly?: boolean;
  isPerson?: boolean;
}
const MemorialTextarea = ({
  btnText = '',
  from,
  isReadonly = false,
  isPerson = false,
}: PropsType) => {
  const [editorState, setEditorState] = useAtom(memorialContentAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const handleClickOpen = () => {
    taskTransform?.('', '도움말');
  };

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
            value={editorState.content}
            onChange={(e) =>
              setEditorState({
                ...editorState,
                content: e.target.value,
              })
            }
            readOnly={isReadonly}
          ></_.CommitArea>
        </_.CommitAreaContainer>
      </_.Container>
      {isPerson ? <MergeBtn text={btnText} /> : <></>}
    </>
  );
};

export default MemorialTextarea;
