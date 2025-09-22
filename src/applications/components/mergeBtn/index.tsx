import * as _ from './style';
import { useCreateCharacter } from '@/api/anime/createCharacter';
import { useUploadImage } from '@/api/anime/uploadImage';
import { useApplyMemorial } from '@/api/memorial/applyMemorial';
import Choten from '@/assets/profile/choten.svg';
import { inputPortage, inputContent } from '@/atoms/inputManager';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { useProcessManager } from '@/hooks/processManager';
import { useAtom, useAtomValue } from 'jotai';

interface PropsType {
  text: string;
}

const MergeBtn = ({ text }: PropsType) => {
  const [inputValue, useInputValue] = useAtom(inputPortage);
  const [contentValue, useContentValue] = useAtom(inputContent);
  const createCharacterMutation = useCreateCharacter();
  const uploadImageMutation = useUploadImage();
  const applyMemorialMutation = useApplyMemorial();
  const [, , removeTask] = useProcessManager();
  const taskSearch = useAtomValue(taskSearchAtom);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(inputValue.date)) {
      setAlert?.(
        Choten,
        <>
          날짜 형식이 올바르지 않습니다.
          <br />
          예) 2023-04-12
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }

    console.log({ ...inputValue, ...contentValue });

    createCharacterMutation.mutate(
      { ...inputValue, ...contentValue },
      {
        onSuccess: (characterId: number) => {
          uploadImageMutation.mutate(
            {
              image: inputValue.profileImage,
              characterId: characterId,
            },
            {
              onError: () => {
                setAlert?.(
                  Choten,
                  <>
                    이미지 업로드 중 오류가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해 주세요.
                  </>,
                  () => {
                    taskTransform?.('경고', '');
                  },
                );
              },
            },
          );
          applyMemorialMutation.mutate(
            {
              characterId: characterId,
              content: contentValue.content,
            },
            {
              onSuccess: () => {
                setAlert?.(Choten, <>추모관이 성공적으로 신청되었습니다.</>, () => {
                  taskTransform?.('경고', '');
                });
              },
              onError: () => {
                setAlert?.(
                  Choten,
                  <>
                    추모관 신청 중 오류가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해 주세요.
                  </>,
                  () => {
                    taskTransform?.('경고', '');
                  },
                );
              },
            },
          );
          useInputValue({
            name: '',
            deathReason: '자연사(自然死)' as deathType,
            date: '',
            lifeCycle: 0,
            anime: '',
            animeId: '',
            age: 0,
            profileImage: '',
            phrase: '',
          });
          useContentValue({ characterId: '', content: '' });
          let task = taskSearch?.('미리보기');
          if (task) removeTask(task);
          task = taskSearch?.('추모관');
          if (task) removeTask(task);
        },
        onError: () => {
          setAlert?.(
            Choten,
            <>
              캐릭터 등록 중 오류가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      },
    );
  };

  return <_.SubmitBtn onClick={handleSubmit}>{text}</_.SubmitBtn>;
};

export default MergeBtn;
