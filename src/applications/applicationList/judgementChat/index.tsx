import * as _ from './style.ts';
import { ChatList } from './chat_list.ts';
import { Fragment, useEffect, useRef, useState } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn/index.tsx';
import FilterBlock from '@/applications/components/filterBlock/index.tsx';
import JudgementChatObj from '@/applications/components/judgementChatObj/index.tsx';
import { useAtomValue } from 'jotai';
import { chat_num, select_chat } from '@/applications/components/judgementChatObj/state_manager.ts';
import {
  useDeleteJudgementChatLike,
  useGetJudgementChats,
  usePostJudgementChatLike,
} from '@/api/judgement/judgementChat.ts';
import Comment from '@/applications/components/comment/index.tsx';
import { usePostCommentLike } from '@/api/community/postCommentLike.ts';
import { usePostCommentCreate } from '@/api/community/postCommentCreate.ts';
import { usePatchJudgementChats } from '@/api/judgement/judgementChatEdit.ts';
import { useDeleteJudgementChats } from '@/api/judgement/judgementChatDelete.ts';
import { usePostJudgementChats } from '@/api/judgement/judgementChatCreate.ts';
import { usePostLike } from '@/api/community/postLike.ts';
import { useGetUserMutation } from '@/api/user/getUser';

const sort = ['최신', '인기'];

interface judgementChatProps {
  judgement_id: number;
}

const JudgementChat = ({ judgement_id }: judgementChatProps) => {
  const [ChatList, setChatList] = useState([]);
  const { mutate: getChats, data } = useGetJudgementChats();
  const { mutate: postLike } = usePostJudgementChatLike();
  const { mutate: deleteLike } = useDeleteJudgementChatLike();
  const { mutate: createChat } = usePostJudgementChats();
  const { mutate: editChat } = usePatchJudgementChats();
  const { mutate: deleteChat } = useDeleteJudgementChats();

  // 로그인한 유저 정보 가져오기
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const currentUserId = userData?.data?.userId || '';
  const currentUserName = userData?.data?.name || '';
  const currentUserProfile = userData?.data?.profile || '';
  const currentUserRole = userData?.data?.role || '';

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      getChats(
        { judgement_id, user_id: currentUserId },
        {
          onSuccess: (data) => {
            setChatList(data.data);
          },
        },
      );
    }
  }, [currentUserId]);

  const useCreateChat = (content: string, parentCommentId?: number | null) => {
    createChat(
      {
        judgement_id: judgement_id,
        body: content,
        parentCommentId: parentCommentId ?? null,
        user_id: currentUserId,
        user_name: currentUserName,
        user_profile: currentUserProfile,
      },
      {
        onSuccess: (data) => {
          // ✅ 여기가 핵심! setChatList를 호출해야 함
          getChats(
            { judgement_id, user_id: currentUserId },
            {
              onSuccess: (newData) => {
                setChatList(newData.data); // ← UI 업데이트!

                setTimeout(() => {
                  if (scroll_ref.current) {
                    scroll_ref.current.scrollTo({
                      top: scroll_ref.current.scrollHeight,
                    });
                  }
                });
              },
            },
          );
          set_input_value(''); // input 초기화
        },
        onError: (error) => {
          console.error('댓글 생성 실패:', error);
        },
      },
    );
  };

  const useEditChat = (content: string, comment_id: number) => {
    editChat(
      {
        comment_id: comment_id,
        body: content,
        user_id: currentUserId,
        role: currentUserRole,
      },
      {
        onSuccess: (data) => {
          // ✅ 여기가 핵심! setChatList를 호출해야 함
          getChats(
            { judgement_id, user_id: currentUserId },
            {
              onSuccess: (newData) => {
                setChatList(newData.data); // ← UI 업데이트!

                setTimeout(() => {
                  if (scroll_ref.current) {
                    scroll_ref.current.scrollTo({
                      top: scroll_ref.current.scrollHeight,
                    });
                  }
                });
              },
            },
          );
          set_input_value(''); // input 초기화
        },
        onError: (error) => {
          console.error('댓글 생성 실패:', error);
        },
      },
    );
  };

  const useDeleteChat = (comment_id: number) => {
    deleteChat(
      {
        comment_id,
        user_id: currentUserId,
        role: currentUserRole,
      },
      {
        onSuccess: (data) => {
          // ✅ 여기가 핵심! setChatList를 호출해야 함
          getChats(
            { judgement_id, user_id: currentUserId },
            {
              onSuccess: (newData) => {
                setChatList(newData.data); // ← UI 업데이트!
              },
            },
          );
          set_input_value(''); // input 초기화
        },
        onError: (error) => {
          console.error('댓글 생성 실패:', error);
        },
      },
    );
  };

  const handleLikeToggle = (comment_id: number, isLiked: boolean) => {
    if (isLiked) {
      // 이미 좋아요 상태 → 좋아요 취소
      deleteLike(
        { comment_id, user_id: currentUserId },
        {
          onSuccess: () => {
            getChats(
              { judgement_id, user_id: currentUserId },
              {
                onSuccess: (newData) => {
                  setChatList(newData.data);
                },
              },
            );
          },
          onError: (error) => {
            console.error('좋아요 취소 실패:', error);
          },
        },
      );
    } else {
      // 좋아요 안 눌린 상태 → 좋아요 추가
      postLike(
        { comment_id, user_id: currentUserId },
        {
          onSuccess: () => {
            getChats(
              { judgement_id, user_id: currentUserId },
              {
                onSuccess: (newData) => {
                  setChatList(newData.data);
                },
              },
            );
          },
          onError: (error) => {
            console.error('좋아요 추가 실패:', error);
          },
        },
      );
    }
  };

  const chat_list = ChatList.sort((a, b) => {
    const aKey = a.parentCommentId ?? a.commentId; // parent_id가 null이면 id 사용
    const bKey = b.parentCommentId ?? b.commentId;

    // 1차 기준: parent_id 또는 id
    if (aKey !== bKey) return aKey - bKey;

    // 2차 기준: id (같은 그룹 내에서 id 오름차순)
    return a.commentId - b.commentId;
  });

  const scroll_ref = useRef<HTMLDivElement>(null);

  const select = useAtomValue(select_chat);
  const chat_count = useAtomValue(chat_num);

  useEffect(() => {
    if (select != -1) {
      console.log(chat_count);
      scroll_ref.current.scrollTo();
    }
  }, [select]);

  const [input_value, set_input_value] = useState('');

  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState('최신');
  const selected = useAtomValue(select_chat);

  return (
    <_.Container>
      <_.Input_Sep>
        <_.Chat_Back>
          <_.Title_Div>
            <_.Title_Text>배심원 토의</_.Title_Text>
            <_.Select_Div>
              <FilterBlock
                label=""
                option={choice}
                isOpen={open}
                list={sort}
                onChange={(e) => {
                  setChoice(e);
                  setOpen(false);
                }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </_.Select_Div>
          </_.Title_Div>

          <_.Discussion ref={scroll_ref}>
            {chat_list
              .filter(
                (item) =>
                  (judgement_id === item.judgmentId && item.parentCommentId == null) ||
                  selected === item.parentCommentId,
              )
              .map((item, idx) => {
                return (
                  <Fragment key={item.commentId}>
                    <Comment
                      idx={idx}
                      userid={item.userId}
                      currentUserId={currentUserId}
                      userName={item.name}
                      commentId={item.commentId}
                      content={item.body}
                      userProfile={item.profile}
                      likes={item.likesCount}
                      parentId={item.parentCommentId}
                      isLiked={item.isLiked}
                      onReplySubmit={(commentId, content) => {
                        useCreateChat(content, commentId);
                      }}
                      onEditSubmit={(commentId, content) => {
                        useEditChat(content, commentId);
                      }}
                      onDeleteSubmit={(commentId) => {
                        useDeleteChat(commentId);
                      }}
                      onLikeToggle={handleLikeToggle}
                    />
                    {item.children?.map((child, childIdx) => {
                      return (
                        <Comment
                          idx={idx + childIdx + 1}
                          key={child.commentId}
                          userid={child.userId}
                          currentUserId={currentUserId}
                          userName={child.name}
                          commentId={child.commentId}
                          content={child.body}
                          userProfile={child.profile}
                          likes={child.likesCount}
                          parentId={child.parentCommentId}
                          isLiked={child.isLiked}
                          onReplySubmit={(commentId, content) => {
                            useCreateChat(content, commentId);
                          }}
                          onEditSubmit={(commentId, content) => {
                            useEditChat(content, commentId);
                          }}
                          onDeleteSubmit={(commentId) => {
                            useDeleteChat(commentId);
                          }}
                          onLikeToggle={handleLikeToggle}
                        />
                      );
                    })}
                  </Fragment>
                );
              })}
          </_.Discussion>
        </_.Chat_Back>

        <_.Input_Div
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (input_value.trim()) {
              useCreateChat(input_value);
            }
          }}
        >
          <_.Input
            value={input_value}
            placeholder="댓글을 입력하세요"
            onChange={(value) => {
              set_input_value(value.target.value);
            }}
          />
          <_.Submit_Btn>
            <MemorialBtn
              name="게시"
              type="menu"
              width="46px"
              height="22px"
              fontSize="11px"
              onClick={(e) => {
                e.preventDefault();
                if (input_value.trim()) {
                  useCreateChat(input_value);
                }
              }}
            />
          </_.Submit_Btn>
        </_.Input_Div>
      </_.Input_Sep>
    </_.Container>
  );
};

export default JudgementChat;
