import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useAtom, useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useState, useEffect } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import { inputContent } from '@/atoms/inputManager';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { useGetUserMutation } from '@/api/user/getUser';
import { useGetMemorialApplicationQuery } from '@/api/memorial/getMemorialApplication';
import { useMemorialApplicationUpdateMutation } from '@/api/memorial/updateMemorialApplication';
import { alerterAtom } from '@/atoms/alerter';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import Loading from '@/applications/components/loading';
import { useProcessManager } from '@/hooks/processManager';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialApplicationId: number;
}

const MemorialApplicationEdit = ({
  stack,
  push,
  pop,
  top,
  memorialApplicationId,
}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [userName, setUserName] = useState('guest');
  const [contentIn, setContentIn] = useAtom(inputContent);
  const { mutate: getUser } = useGetUserMutation();
  const setAlert = useAtomValue(alerterAtom);
  const [taskList, , removeTask] = useProcessManager();
  const updateMutation = useMemorialApplicationUpdateMutation();

  // 추모관 신청 데이터 조회
  const {
    data: applicationData,
    isLoading,
    error,
  } = useGetMemorialApplicationQuery(memorialApplicationId);

  useEffect(() => {
    getUser(undefined, {
      onSuccess: (data) => {
        setUserName(data.data.userId);
      },
      onError: (err) => {
        console.error('에러:', err);
      },
    });
  }, []);

  // 기존 데이터를 content atom에 설정
  useEffect(() => {
    if (applicationData?.data?.content) {
      setContentIn({ characterId: '', content: applicationData.data.content });
    }
  }, [applicationData, setContentIn]);

  const handleSubmit = () => {
    if (!contentIn.content || contentIn.content.trim() === '') {
      setAlert?.(Seori, <>추모관 내용을 작성해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    updateMutation.mutate(
      {
        memorialApplicationId,
        data: {
          content: contentIn.content,
        },
      },
      {
        onSuccess: () => {
          setAlert?.(Seori, <>추모관 신청이 성공적으로 수정되었습니다.</>, () => {
            taskTransform?.('경고', '');
          });
          setContentIn({ characterId: '', content: '' });
          // 창 닫기
          let task = taskList.find((t) => t.name === '추모관 신청 수정');
          if (task) removeTask(task);
        },
        onError: () => {
          setAlert?.(
            Seori,
            <>
              추모관 신청 수정 중 오류가 발생했습니다.
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

  if (isLoading) {
    return (
      <_.Container>
        <_.LoadingText>신청 내용을 불러오는 중...</_.LoadingText>
      </_.Container>
    );
  }

  if (error || !applicationData?.data) {
    return (
      <_.Container>
        <_.ErrorText>신청 내용을 불러오는 중 오류가 발생했습니다.</_.ErrorText>
      </_.Container>
    );
  }

  return (
    <_.Container>
      <_.Section1>
        <_.Header>
          <_.HeaderTextContainer>
            <_.CharacterNameText>추모관 신청 수정</_.CharacterNameText>
            <_.Status>문서 수정 중</_.Status>
          </_.HeaderTextContainer>
          <_.AuthorshipFrom>@{userName}의 요청</_.AuthorshipFrom>
        </_.Header>
      </_.Section1>

      <_.TextAreaContainer>
        <MemorialTextarea
          btnText=""
          from={userName}
          content={applicationData.data.content}
          isPerson={false}
        />
      </_.TextAreaContainer>

      <_.SubmitBtnContainer>
        <_.SubmitBtn
          onClick={handleSubmit}
          onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
          onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
          추모관 신청 수정하기
        </_.SubmitBtn>
      </_.SubmitBtnContainer>

      {updateMutation.isPending && (
        <Loading
          text="수정 중입니다..."
          overlay={true}
          color="white"
        />
      )}
    </_.Container>
  );
};

export default MemorialApplicationEdit;
