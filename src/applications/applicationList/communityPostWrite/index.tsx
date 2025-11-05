import React from 'react';
import * as _ from './style';
import { useState, useEffect } from 'react';
import CommunityBtn from '@/applications/components/communityBtn';
import ChevronIcon from '@/assets/community/chevron-left.svg';
import { usePostCreate } from '@/api/community/postCreate';
import { useGetUserMutation } from '@/api/user/getUser';

const CommunityPostWrite: React.FC = () => {
  const postCreateMutation = usePostCreate();
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const currentUserId = userData?.data?.userId;
  const [loadPage, setLoadPage] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const postCreate = () => {
    /*if (!currentUserId) {
      console.log('유저 정보가 없습니다');
      return;
    }*/

    postCreateMutation.mutate(
      {
        user_id: 'testid',
        title: title,
        body: body,
        status: 'PUBLISHED',
      },
      {
        onSuccess: () => {
          console.log('게시글 작성 완료');
          setTitle('');
          setBody('');
        },
        onError: () => {
          console.log('게시글 작성 중 에러 발생');
        },
      },
    );
  };
  return (
    <_.Container>
      {!loadPage ? (
        <>
          <_.Title
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <_.Content
            placeholder="자유롭게 글을 작성해 보세요."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></_.Content>
        </>
      ) : (
        <>
          <_.Header>
            <_.BeforeBtn onClick={() => setLoadPage(false)}>
              <_.Icon src={ChevronIcon} />
            </_.BeforeBtn>
            임시저장 불러오기
          </_.Header>
          <_.PostArea>
            {
              <_.Post>
                <_.PostText>
                  <_.PostTitle>아니근데진짜</_.PostTitle>
                  <_.PostContent>살려주라...</_.PostContent>
                </_.PostText>
                <_.PostBtnArea>
                  <_.PostBtn>선택</_.PostBtn>
                  <_.PostBtn>삭제</_.PostBtn>
                </_.PostBtnArea>
              </_.Post>
            }
          </_.PostArea>
        </>
      )}

      <_.BtnArea>
        <CommunityBtn
          name="이미지 첨부"
          type="submit"
        />
        <CommunityBtn
          name="임시저장/불러오기"
          selected={loadPage}
          onClick={() => setLoadPage(!loadPage)}
          type="menu"
        />
        <CommunityBtn
          name="게시"
          type="submit"
          onClick={postCreate}
        />
      </_.BtnArea>
    </_.Container>
  );
};
export default CommunityPostWrite;
