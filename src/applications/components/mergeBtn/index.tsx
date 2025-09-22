import * as _ from './style';
import { useCreateCharacter } from '@/api/anime/createCharacter';
import { useUploadImage } from '@/api/anime/uploadImage';
import { useApplyMemorial } from '@/api/memorial/applyMemorial';
import { inputPortage, inputContent } from '@/atoms/inputManager';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import { useProcessManager } from '@/hooks/processManager';
import { useAtom, useAtomValue } from 'jotai';
import { usePostCommit, usePostPullRequest } from '@/api/memorial/userCommit.ts';
import { memorialIdAtom, userIdAtom } from '@/atoms/memorialManager.ts';
import { useGetPrsQuery } from '@/api/memorial/cheifCommit.ts';

interface PropsType {
  text: string;
}

const MergeBtn = ({ text }: PropsType) => {
  const [inputValue, useInputValue] = useAtom(inputPortage);
  const [contentValue, useContentValue] = useAtom(inputContent);
  const [userId] = useAtom(userIdAtom);
  const [memorialId] = useAtom(memorialIdAtom);
  const createCharacterMutation = useCreateCharacter();
  const commitMutation = usePostCommit();
  const { data, isLoading, isError, error } = useGetPrsQuery({ memorialId });
  const pullRequestMutation = usePostPullRequest();
  const uploadImageMutation = useUploadImage();
  const applyMemorialMutation = useApplyMemorial();
  const [, , removeTask] = useProcessManager();
  const taskSearch = useAtomValue(taskSearchAtom);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(inputValue.date)) {
      alert('날짜 형식이 올바르지 않습니다. 예) 2023-04-12');
      return;
    }

    console.log({ ...inputValue, ...contentValue });

    const isApply = taskSearch?.('MemorialApply');
    const isCommit = taskSearch?.('MemorialCommit');

    if (isApply) {
      createCharacterMutation.mutate(
        { ...inputValue, ...contentValue },
        {
          onSuccess: (characterId: number) => {
            uploadImageMutation.mutate({
              image: inputValue.profileImage,
              characterId: characterId,
            });
            applyMemorialMutation.mutate({
              characterId: characterId,
              content: contentValue.content,
            });
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
        },
      );
    }
    if (isCommit) {
      commitMutation.mutate(
        { memorialId, content: contentValue.content, userId },
        {
          onSuccess: () => {
            pullRequestMutation.mutate({
              memorialPullRequestId: data.memorialPullRequestId,
              userId,
            });
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
        },
      );
    }
  };

  return <_.SubmitBtn onClick={handleSubmit}>{text}</_.SubmitBtn>;
};

export default MergeBtn;
