import { useEffect, useRef } from 'react';
import MergeBtn from '../mergeBtn';
import * as _ from './style';
import { useAtom, useAtomValue } from 'jotai';
import { inputContent } from '@/atoms/inputManager';
import Help from '@/assets/help.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';

interface PropsType {
  btnText?: string;
  from: string;
  content: string;
  isReadonly?: boolean;
  isPerson?: boolean;
  memorialId?: number;
  characterId?: number;
}

const MemorialTextarea = ({
  btnText = '',
  from,
  content,
  isReadonly = false,
  isPerson = false,
  memorialId,
  characterId,
}: PropsType) => {
  const [contentIn, setContentIn] = useAtom(inputContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [isClickOpen, setClickOpen] = useState<boolean>(false);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const handleClickOpen = () => {
    taskTransform?.('', '도움말');
  };

  // 태그 자동완성 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const newValue = e.target.value;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = newValue.substring(0, cursorPos);

    // 먼저 값 업데이트
    setContentIn((prev) => ({ ...prev, content: newValue }));

    // > 입력 시 태그 자동완성 체크
    if (textBeforeCursor.endsWith('>')) {
      // 커스텀 태그 목록 (닫는 태그가 필요한 태그들)
      const customTags = ['목차', '사진', '동영상', '강조'];

      // 마지막 < 찾기
      const lastOpenBracket = textBeforeCursor.lastIndexOf('<');
      if (lastOpenBracket !== -1) {
        const tagContent = textBeforeCursor.substring(lastOpenBracket + 1, cursorPos - 1);

        // 태그명만 추출 (속성 제거)
        const tagName = tagContent.split(/\s/)[0];

        // 이미 닫는 태그가 있는지 확인
        const closingTag = `</${tagName}>`;
        const textAfterCursor = newValue.substring(cursorPos);
        const alreadyHasClosingTag = textAfterCursor.trim().startsWith(closingTag);

        // 커스텀 태그인지 확인하고 닫는 태그가 없으면 추가
        if (customTags.includes(tagName) && !alreadyHasClosingTag) {
          const updatedValue =
            newValue.substring(0, cursorPos) + closingTag + newValue.substring(cursorPos);

          // 값 업데이트
          setContentIn((prev) => ({ ...prev, content: updatedValue }));

          // 커서 위치를 태그 사이로 이동
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = cursorPos;
              textareaRef.current.selectionEnd = cursorPos;
              textareaRef.current.focus();
            }
          }, 0);
        }
      }
    }
  };

  useEffect(() => {
    if (!setContentIn || contentIn.content) return; // 이미 내용이 있으면 덮어쓰지 않음
    setContentIn((prev) => ({
      ...prev,
      content: content,
    }));
  }, [content, setContentIn]); // contentIn.content는 의존성에서 제외

  return (
    <>
      <_.Container>
        <_.TitleContainer>
          {isPerson ? <_.Title>- @{from}의 작성안</_.Title> : <_.Title>{from}</_.Title>}
          <_.Image
            src={Help}
            alt={'help'}
            onClick={handleClickOpen}
            onMouseEnter={() => {
              setCursorImage(CURSOR_IMAGES.hand);
            }}
            onMouseLeave={() => {
              setCursorImage(CURSOR_IMAGES.default);
            }}
          />
        </_.TitleContainer>
        <_.CommitAreaContainer>
          <_.CommitArea
            ref={textareaRef}
            value={contentIn.content}
            onChange={handleChange}
            readOnly={isReadonly}
            onMouseEnter={() => {
              setCursorImage(CURSOR_IMAGES.drag);
            }}
            onMouseLeave={() => {
              setCursorImage(CURSOR_IMAGES.default);
            }}
          ></_.CommitArea>
        </_.CommitAreaContainer>
      </_.Container>
      {isPerson && btnText ? (
        <MergeBtn
          text={btnText}
          memorialId={memorialId || 0}
          characterId={characterId}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default MemorialTextarea;
