import React from 'react';
import * as _ from './style';
import { useState, useEffect } from 'react';
import CommunityBtn from '@/applications/components/communityBtn';
import ChevronIcon from '@/assets/community/chevron-left.svg';
import { usePostCreate } from '@/api/community/postCreate';
import { usePostUpdate } from '@/api/community/postUpdate';
import { usePostListSearch } from '@/api/community/postListSearch';
import { usePostDelete } from '@/api/community/postDelete';
import { useGetUserMutation } from '@/api/user/getUser';
import { alerterAtom } from '@/atoms/alerter';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import DraftPost from '@/applications/components/draftPost';

interface postData {
  postId?: number;
  defaultTitle?: string;
  defaultBody?: string;
  refetchPosts?: () => void;
  stack?: any[];
  push?: any;
  pop?: any;
  top?: any;
}

const CommunityPostWrite: React.FC<postData> = ({
  postId,
  defaultTitle,
  defaultBody,
  refetchPosts,
  stack,
  push,
  pop,
  top,
}: postData) => {
  const postCreateMutation = usePostCreate();
  const postUpdateMutation = usePostUpdate();
  const postListSearchMutation = usePostListSearch();
  const postDeleteMutation = usePostDelete();
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const currentUserId = userData?.data?.userId;
  const [loadPage, setLoadPage] = useState(false);
  const [title, setTitle] = useState(defaultTitle || '');
  const [body, setBody] = useState(defaultBody || '');
  const [draftPosts, setDraftPosts] = useState<
    Array<{
      postId: number;
      userId: string;
      title: string;
      body: string;
      status: string;
      isBlind: boolean;
      createdAt: string;
      updatedAt: string;
      viewsCount: number;
      likesCount: number;
      postCommentCount: number;
    }>
  >([]);

  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  useEffect(() => {
    getUser();
  }, []);

  const postCreate = () => {
    if (typeof title !== 'string' || typeof body !== 'string' || !title.trim() || !body.trim()) {
      setAlert?.(<>제목과 내용을 모두 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    if (!currentUserId && setAlert) {
      setAlert(
        <>
          유저 정보를 찾아올 수 없습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    }

    // 게시글 수정
    if (postId) {
      postUpdateMutation.mutate(
        {
          postId: postId,
          user_id: currentUserId!,
          title: title,
          body: body,
          status: 'PUBLISHED',
          isBlind: false,
        },
        {
          onSuccess: () => {
            console.log('게시글 수정 완료');
            if (refetchPosts) {
              refetchPosts();
            }
            if (pop) {
              pop();
            }
          },
          onError: () => {
            setAlert?.(<>게시글이 수정되지 않았습니다.</>, () => {
              taskTransform?.('경고', '');
            });
          },
        },
      );
    } else {
      // 게시글 작성
      postCreateMutation.mutate(
        {
          user_id: currentUserId!,
          title: title,
          body: body,
          status: 'PUBLISHED',
        },
        {
          onSuccess: () => {
            console.log('게시글 작성 완료');
            setTitle('');
            setBody('');
            if (refetchPosts) {
              refetchPosts();
            }
            if (pop) {
              pop();
            }
          },
          onError: () => {
            setAlert?.(<>게시글이 작성되지 않았습니다.</>, () => {
              taskTransform?.('경고', '');
            });
          },
        },
      );
    }
  };
  const postDraft = () => {
    if (title || body) {
      if (!currentUserId) {
        setAlert?.(
          <>
            유저 정보를 찾아올 수 없습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
        return;
      }

      setAlert?.(<>임시저장 하시겠습니까?</>, () => {
        postCreateMutation.mutate(
          {
            user_id: currentUserId,
            title: title,
            body: body,
            status: 'DRAFT',
          },
          {
            onSuccess: () => {
              console.log('게시글 임시저장 완료');
              setTitle('');
              setBody('');
              refetchPosts?.();
              if (pop) {
                pop();
              }
            },
            onError: () => {
              setAlert?.(<>게시글이 작성되지 않았습니다.</>, () => {
                taskTransform?.('경고', '');
              });
            },
          },
        );
        taskTransform?.('경고', '');
      });
    } else {
      if (!currentUserId) {
        setAlert?.(
          <>
            유저 정보를 찾아올 수 없습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
        return;
      }

      postListSearchMutation.mutate(
        {
          user_id: currentUserId,
          status: 'DRAFT',
        },
        {
          onSuccess: (data) => {
            setDraftPosts(data.data.posts);
            setLoadPage(!loadPage);
          },
          onError: () => {
            setAlert?.(<>게시글을 불러올 수 없습니다</>, () => {
              taskTransform?.('경고', '');
            });
          },
        },
      );
      return;
    }
    setLoadPage(!loadPage);
  };

  const handleSelectDraft = (postId: number, draftTitle: string, draftBody: string) => {
    setTitle(String(draftTitle || ''));
    setBody(String(draftBody || ''));
    setLoadPage(false);
  };

  const handleDeleteDraft = (postId: number) => {
    setAlert?.(<>선택한 임시저장 게시글을 삭제하시겠습니까?</>, () => {
      postDeleteMutation.mutate(
        { post_id: postId, user_id: currentUserId! },
        {
          onSuccess: () => {
            setDraftPosts((prev) => prev.filter((post) => post.postId !== postId));
            setAlert?.(<>임시저장 게시글이 삭제되었습니다.</>, () => {
              taskTransform?.('경고', '');
            });
          },
          onError: () => {
            setAlert?.(<>임시저장 게시글 삭제에 실패했습니다.</>, () => {
              taskTransform?.('경고', '');
            });
          },
        },
      );
      taskTransform?.('경고', '');
    });
  };

  return (
    <_.Container>
      {!loadPage ? (
        <>
          <_.Title
            type="text"
            placeholder="제목을 입력해주세요"
            defaultValue={defaultTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <_.Content
            placeholder="자유롭게 글을 작성해 보세요."
            defaultValue={defaultBody}
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
            {draftPosts.length > 0 ? (
              draftPosts.map((post) => (
                <DraftPost
                  key={post.postId}
                  postId={post.postId}
                  title={post.title}
                  body={post.body}
                  onSelect={handleSelectDraft}
                  onDelete={handleDeleteDraft}
                />
              ))
            ) : (
              <_.NoDataMessage>임시저장된 게시글이 없습니다.</_.NoDataMessage>
            )}
          </_.PostArea>
        </>
      )}

      <_.BtnArea>
        <CommunityBtn
          name="도움말"
          type="submit"
          onClick={() => taskTransform?.('', '도움말')}
        />
        {postId ? (
          <></>
        ) : (
          <CommunityBtn
            name="임시저장/불러오기"
            selected={loadPage}
            onClick={postDraft}
            type="menu"
          />
        )}
        <CommunityBtn
          name="취소"
          type="submit"
          onClick={() => pop?.()}
        />
        <CommunityBtn
          name={postId ? '수정' : '게시'}
          type="submit"
          onClick={postCreate}
        />
      </_.BtnArea>
    </_.Container>
  );
};
export default CommunityPostWrite;
