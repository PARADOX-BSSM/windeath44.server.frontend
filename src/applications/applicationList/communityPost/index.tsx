import React from 'react';
import * as _ from './style';
import Posts from '@/applications/components/posts';
import Comment from '@/applications/components/communityComment';
import CommentInput from '@/applications/components/commentInput';
import JudgementPreview from '@/applications/components/judgementPreview';
import MoreComment from '@/applications/components/moreComment';
import chevron from '@/assets/community/chevron-left.svg';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { usePostSingleSearch } from '@/api/community/postSingleSearch';
import {
  usePostCommentSearchByPostId,
  CommentData,
} from '@/api/community/postCommentSearchByPostId';
import { useGetUserMutation } from '@/api/user/getUser';
import { getCookie } from '@/api/auth/cookie';
import { useEffect, useState, Fragment } from 'react';
import Loading from '@/applications/components/loading';
import api from '@/api/axiosInstance';
import { community } from '@/config';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';

interface postProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  postId: number;
}

const CommunityPost = ({ stack, push, pop, top, postId }: postProps) => {
  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const { data, isLoading: isPostLoading, refetch: refetchPost } = usePostSingleSearch(postId);
  const getUserMutation = useGetUserMutation();
  const token = getCookie('access_token');

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    userId: string;
    profile?: string;
  } | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [expandedReplies, setExpandedReplies] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    if (token) {
      setIsUserLoading(true);
      getUserMutation.mutate(undefined, {
        onSuccess: (response: any) => {
          setCurrentUser({
            name: response.data?.name || '사용자',
            userId: response.data?.userId || 'user',
            profile: response.data?.profile,
          });
          setIsUserLoading(false);
        },
        onError: () => {
          setCurrentUser({
            name: '사용자',
            userId: 'userId',
          });
          setIsUserLoading(false);
        },
      });
    } else {
      setCurrentUser({
        name: '게스트',
        userId: 'guest_user',
      });
      setIsUserLoading(false);
    }
  }, [token]);

  // 초기 댓글 로딩
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  // 댓글 조회
  const fetchComments = async () => {
    try {
      setIsCommentsLoading(true);

      const response = await api.get(`${community}/posts/${postId}/comments`);
      const parentComments: CommentData[] = response.data.data || [];

      const commentsWithReplies = await Promise.all(
        parentComments.map(async (parent) => {
          try {
            const repliesResponse = await api.get(
              `${community}/posts/comments/${parent.commentId}`,
            );
            const repliesData = repliesResponse.data.data;
            const replies: CommentData[] = Array.isArray(repliesData) ? repliesData : [];

            return {
              ...parent,
              children: replies,
            };
          } catch (error) {
            console.error(`댓글 ${parent.commentId}의 대댓글 조회 실패:`, error);
            return {
              ...parent,
              children: [],
            };
          }
        }),
      );

      setComments(commentsWithReplies);
    } catch (error) {
      console.error('댓글 조회 실패:', error);
      setComments([]);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const postEdit = () => {
    if (taskTransform) {
      taskTransform('', '게시글 작성', {
        postId: postId,
        defaultTitle: data?.data.title,
        defaultBody: data?.data.body,
        refetchPosts: refetchPost,
      });
    }
  };

  const toggleReplies = (commentId: number) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // 모든 필수 데이터 로딩 체크
  if (isPostLoading || isCommentsLoading || isUserLoading) {
    return <Loading />;
  }

  return (
    <_.Container>
      <_.Main>
        <_.Header>
          <_.BtnIcon
            onClick={() => push(taskSearch?.('communityMain', stackProps))}
            onMouseDown={() => setCursorImage(CURSOR_IMAGES.click)}
            onMouseUp={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
          >
            <_.Icon src={chevron} />
          </_.BtnIcon>
          {data?.data.name || '사용자'}님의 게시글
        </_.Header>
        <_.PostArea>
          <Posts
            user={{ name: data?.data.name || '사용자', userId: data?.data.userId || 'userId' }}
            post={{
              postId: postId,
              title: data?.data.title || 'title',
              body: data?.data.body || 'body',
              createdAt: data?.data.createdAt || 'createdAt',
              likesCount: data?.data.likesCount || 0,
              commentCount: data?.data.commentCount || 0,
            }}
            postDelete={() => push(taskSearch?.('communityMain', stackProps))}
            refetchPost={refetchPost}
            postEdit={postEdit}
          />
          <CommentInput
            name={currentUser?.name}
            userId={currentUser?.userId}
            postId={postId}
            profile={currentUser?.profile}
            refetchComments={fetchComments}
          />
          {comments.map((comment) => {
            const replies = Array.isArray(comment.children) ? comment.children : [];
            const hasMoreReplies = replies.length > 3;
            const isExpanded = expandedReplies[comment.commentId] || false;
            const visibleReplies = isExpanded ? replies : replies.slice(0, 3);
            const showReplyInput = expandedReplies[`reply_${comment.commentId}`] || false;

            return (
              <Fragment key={comment.commentId}>
                <Comment
                  user={{
                    name: comment.name,
                    userId: comment.userId,
                    profile: comment.profile,
                  }}
                  post={{
                    postId: comment.postId,
                    commentId: comment.commentId,
                    body: comment.body,
                    likesCount: comment.likesCount,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                  }}
                  refetchComments={fetchComments}
                  parentCommentId={null}
                  currentUserName={currentUser?.name}
                  currentUserId={currentUser?.userId}
                  currentUserProfile={currentUser?.profile}
                  onReplyClick={() => {
                    setExpandedReplies((prev) => ({
                      ...prev,
                      [`reply_${comment.commentId}`]: !prev[`reply_${comment.commentId}`],
                    }));
                  }}
                  showReplyForm={showReplyInput}
                />
                {showReplyInput && (
                  <CommentInput
                    name={currentUser?.name}
                    userId={currentUser?.userId}
                    postId={postId}
                    profile={currentUser?.profile}
                    parentCommentId={comment.commentId}
                    refetchComments={() => {
                      console.log('대댓글 작성 완료');
                      setExpandedReplies((prev) => ({
                        ...prev,
                        [`reply_${comment.commentId}`]: false,
                      }));
                      fetchComments();
                    }}
                  />
                )}
                {visibleReplies.map((reply) => (
                  <Comment
                    key={reply.commentId}
                    user={{
                      name: reply.name,
                      userId: reply.userId,
                      profile: reply.profile,
                    }}
                    post={{
                      postId: reply.postId,
                      commentId: reply.commentId,
                      body: reply.body,
                      likesCount: reply.likesCount,
                      createdAt: reply.createdAt,
                      updatedAt: reply.updatedAt,
                    }}
                    refetchComments={fetchComments}
                    parentCommentId={reply.parentCommentId}
                    currentUserName={currentUser?.name}
                    currentUserId={currentUser?.userId}
                    currentUserProfile={currentUser?.profile}
                  />
                ))}
                {hasMoreReplies && (
                  <MoreComment
                    num={replies.length - (isExpanded ? 0 : 3)}
                    onClick={() => toggleReplies(comment.commentId)}
                    isExpanded={isExpanded}
                  />
                )}
              </Fragment>
            );
          })}
        </_.PostArea>
      </_.Main>
      <JudgementPreview />
    </_.Container>
  );
};

export default CommunityPost;
