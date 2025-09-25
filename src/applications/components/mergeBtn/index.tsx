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
import { usePostCommit, usePostPullRequest } from '@/api/memorial/userCommit.ts';
import { memorialIdAtom, userIdAtom, currentStackTopAtom } from '@/atoms/memorialManager.ts';
import { useGetPrsQuery } from '@/api/memorial/cheifCommit.ts';

interface PropsType {
  text: string;
}

const MergeBtn = ({ text }: PropsType) => {
  const [inputValue, setInputValue] = useAtom(inputPortage);
  const [contentIn, setContentIn] = useAtom(inputContent);
  const [userId] = useAtom(userIdAtom);
  const [memorialId] = useAtom(memorialIdAtom);
  const createCharacterMutation = useCreateCharacter();
  const commitMutation = usePostCommit();
  const { data, isLoading, isError, error } = useGetPrsQuery({ memorialId });
  const pullRequestMutation = usePostPullRequest();
  const uploadImageMutation = useUploadImage();
  const applyMemorialMutation = useApplyMemorial();
  const [taskList, , removeTask] = useProcessManager();
  const taskSearch = useAtomValue(taskSearchAtom);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const currentStackTop = useAtomValue(currentStackTopAtom);

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

    console.log({ ...inputValue, ...contentIn });

    const isApply = currentStackTop?.name === 'MemorialApply';
    const isCommit = taskList.some((task) => task.name === '추모관 수정');

    if (isApply) {
      createCharacterMutation.mutate(
        { ...inputValue, ...contentIn },
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
                content: contentIn.content,
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
            setInputValue({
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
            setContentIn({ characterId: '', content: '' });
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
    }
    if (isCommit) {
      commitMutation.mutate(
        { memorialId, content: contentIn.content, userId },
        {
          onSuccess: (commitResponse) => {
            if (commitResponse?.data === undefined || commitResponse.data === null) return;
            console.log(commitResponse.data);
            pullRequestMutation.mutate(
              {
                memorialCommitId: parseInt(commitResponse.data),
              },
              {
                onError: () => {
                  setAlert?.(
                    Choten,
                    <>
                      수정 신청 중 오류가 발생했습니다.
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
            setInputValue({
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
            setContentIn({ characterId: '', content: '' });
            let task = taskSearch?.('미리보기');
            if (task) removeTask(task);
            task = taskSearch?.('추모관 수정');
            if (task) removeTask(task);
          },
          onError: () => {
            setAlert?.(
              Choten,
              <>
                수정 내용 저장 중 오류가 발생했습니다.
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
    }
  };
  return <_.SubmitBtn onClick={handleSubmit}>{text}</_.SubmitBtn>;
};

export default MergeBtn;
