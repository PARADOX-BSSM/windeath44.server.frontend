import IndexMenu from '@/applications/components/indexMenu';
import Comment from '@/applications/components/comment';
import Loading from '@/applications/components/loading';
import * as _ from './style';
import { useAtom, useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { useMemorialGet } from '@/api/memorial/memorialGet.ts';
import { Fragment, useEffect, useState, useMemo } from 'react';
import { useGetCharacter } from '@/api/anime/getCharacter.ts';
import type { CharacterData } from '@/api/anime/getCharacter';
import type { memorialData } from '@/api/memorial/memorialGet';
import {
  MemorialCommentsData,
  useGetMemorialComments,
} from '@/api/memorial/getMemorialComments.ts';
import { useCommentWrite } from '@/api/memorial/memorialCommentWrite.ts';
import { useCommentUpdate } from '@/api/memorial/memorialCommentUpdate.ts';
import { useCommentDelete } from '@/api/memorial/memorialCommentDelete.ts';
import { useCommentLike } from '@/api/memorial/memorialCommentLike.ts';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent.tsx';
import { useGetAnimation } from '@/api/anime/getAnimation.ts';
import ribbon from '@/assets/memorial_ribbon.svg';
import { inputPortage } from '@/atoms/inputManager.ts';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { useGetUserMutation } from '@/api/user/getUser';
import { getCookie } from '@/api/auth/cookie.ts';
import { ApplicationProps } from '@/applications/layout/utils';
import axios from 'axios';
import { user as userEndpoint } from '@/config';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialId: number;
  characterId: number;
  props?: ApplicationProps;
  setWindowName?: (name: string) => void;
}
// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? '오후' : '오전';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${Y}-${M}-${D}. ${ampm} ${h}:${m}`;
};

const Memorial = ({
  stack,
  push,
  pop,
  top,
  memorialId,
  characterId,
  props,
  setWindowName,
}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const setAlert = useAtomValue(alerterAtom);
  const [, setInputValue] = useAtom(inputPortage);
  const [content, setContent] = useState<string>('');
  const token = getCookie('access_token');
  const [indexData, setIndexData] = useState<string[]>([]);
  const [userDataMap, setUserDataMap] = useState<Record<string, { name: string; profile: string }>>({});
  const [characterData, setCharacterData] = useState<CharacterData>({
    characterId: 0,
    animeId: 0,
    name: '',
    lifeTime: 0,
    deathReason: '',
    causeOfDeathDetails: '',
    imageUrl: '',
    bowCount: 0,
    age: 0,
    saying: '',
    state: '',
    deathOfDay: '',
  });
  const mutationGetCharacter = useGetCharacter(setCharacterData);
  const [memorialData, setMemorialData] = useState<memorialData>({
    memorialId: 0,
    characterId: 0,
    chiefs: [],
    bowCount: 0,
    memorialCommitId: 0,
    content: '',
    userId: '',
    createdAt: '',
    mergerId: '',
    updatedAt: '',
  });
  const mutationMemorialGet = useMemorialGet(setMemorialData);
  const [animation, setAnimation] = useState<string>('');
  const mutationAnimation = useGetAnimation(setAnimation);
  const [memorialComment, setMemorialComment] = useState<MemorialCommentsData[]>([]);
  const [hasNextComment, setHasNextComment] = useState<boolean>(false);
  const mutaionGetMemorialComments = useGetMemorialComments(
    setMemorialComment,
    setHasNextComment,
    false,
  );
  const mutationLoadMoreComments = useGetMemorialComments(
    setMemorialComment,
    setHasNextComment,
    true,
  );
  const { mutate: getUser, data: userData } = useGetUserMutation();

  const currentUserId = userData?.data?.userId;

  const mutationCommentWrite = useCommentWrite(setMemorialComment, currentUserId);
  const mutationCommentUpdate = useCommentUpdate(setMemorialComment);
  const mutationCommentDelete = useCommentDelete(setMemorialComment);
  const mutationCommentLike = useCommentLike(setMemorialComment);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    mutationCommentWrite.mutate(
      { memorialId, content },
      {
        onSuccess: () => {
          setContent('');
        },
        onError: () => {
          setAlert?.(
            Seori,
            <>
              댓글 작성 중 문제가 발생했습니다.
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

  const handleReplySubmit = (parentCommentId: number, replyContent: string) => {
    mutationCommentWrite.mutate(
      { memorialId, content: replyContent, parentCommentId },
      {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              답글 작성 중 문제가 발생했습니다.
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

  const handleEditSubmit = (commentId: number, editContent: string) => {
    mutationCommentUpdate.mutate(
      { commentId, content: editContent },
      {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              댓글 수정 중 문제가 발생했습니다.
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

  const handleDeleteSubmit = (commentId: number) => {
    mutationCommentDelete.mutate(
      { commentId },
      {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              댓글 삭제 중 문제가 발생했습니다.
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

  const handleLikeToggle = (commentId: number, isLiked: boolean) => {
    mutationCommentLike.mutate(
      { commentId, isLiked },
      {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              좋아요 처리 중 문제가 발생했습니다.
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

  const handleLoadMore = () => {
    if (memorialComment.length === 0) return;
    const lastCommentId = memorialComment[memorialComment.length - 1].commentId;

    mutationLoadMoreComments.mutate(
      { memorialId, cursorId: lastCommentId },
      {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              추모글을 가져오는 중 문제가 발생했습니다.
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
  useEffect(() => {
    getUser();
    mutationMemorialGet.mutate(memorialId, {
      onError: () => {
        setAlert?.(
          Seori,
          <>
            추모관 정보를 가져오는 중 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
    });
    mutaionGetMemorialComments.mutate(
      { memorialId },
      {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              추모글을 가져오는 중 문제가 발생했습니다.
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
    mutationGetCharacter.mutate(characterId, {
      onError: () => {
        setAlert?.(
          Seori,
          <>
            캐릭터 정보를 가져오는 중 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>,
          () => {
            taskTransform?.('경고', '');
          },
        );
      },
    });
  }, []);

  useEffect(() => {
    if (characterData.animeId) {
      mutationAnimation.mutate(characterData.animeId, {
        onError: () => {
          setAlert?.(
            Seori,
            <>
              애니메이션 정보를 가져오는 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>,
            () => {
              taskTransform?.('경고', '');
            },
          );
        },
      });
    }
  }, [characterData.animeId]);

  // 창 제목 설정
  useEffect(() => {
    if (setWindowName && characterData?.name) {
      setWindowName?.(`추모관 뷰어 - ${characterData.name}`);
    }
  }, [characterData, setWindowName]);

  // content가 변경될 때마다 파싱하여 목차 업데이트
  const parsedContent = useMemo(() => {
    const tempIndexData: string[] = [];
    const result = parseCustomContent(tempIndexData, memorialData.content);
    setIndexData(tempIndexData);
    return result;
  }, [memorialData.content]);

  // 사용자 정보 가져오기
  useEffect(() => {
    if (memorialComment.length === 0) return;

    // 모든 userId 추출 (부모 + 자식 댓글)
    const userIds = new Set<string>();
    memorialComment.forEach((comment) => {
      userIds.add(comment.userId);
      comment.children?.forEach((child) => {
        userIds.add(child.userId);
      });
    });

    const userIdArray = Array.from(userIds);
    if (userIdArray.length === 0) return;

    // GET /users API 호출
    axios
      .get(userEndpoint, {
        params: { userIds: userIdArray },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          params.userIds.forEach((id: string) => {
            searchParams.append('userIds', id);
          });
          return searchParams.toString();
        },
      })
      .then((response) => {
        const users = response.data.data;
        const userMap: Record<string, { name: string; profile: string }> = {};
        users.forEach((user: any) => {
          userMap[user.userId] = {
            name: user.name,
            profile: user.profile,
          };
        });
        setUserDataMap(userMap);
      })
      .catch((error) => {
        console.error('사용자 정보 가져오기 실패:', error);
      });
  }, [memorialComment]);

  // 데이터 로딩 중일 때 로딩 컴포넌트 표시
  if (
    mutationMemorialGet.isPending ||
    mutationGetCharacter.isPending ||
    mutaionGetMemorialComments.isPending ||
    !characterData.characterId ||
    !memorialData.memorialId
  ) {
    return <Loading />;
  }

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };
  const handleCommit = () => {
    if (!token && setAlert) {
      setAlert(
        <>
          게스트는 추모관 수정이 불가합니다.
          <br />
          로그인 후 사용 가능 합니다.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
    } else {
      setInputValue({
        name: characterData.name,
        deathReason: characterData.deathReason,
        date: characterData.deathOfDay,
        lifeCycle: characterData.lifeTime,
        anime: animation,
        animeId: characterData.animeId,
        age: characterData.age,
        profileImage: characterData.imageUrl,
        phrase: characterData.saying,
        causeOfDeathDetails: characterData.causeOfDeathDetails || '',
      });

      // taskTransform으로 캐릭터 정보와 추모관 데이터 전달
      taskTransform?.('', '미리보기');
      taskTransform?.('', '추모관 수정', {
        memorialId: memorialId,
        characterId: characterId,
        characterData: characterData,
        memorialData: memorialData,
        animation: animation,
      });
    }
  };
  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>{characterData.name}</_.Title>
                <_.Subtitle>최근 수정: {formatDate(memorialData.updatedAt)}</_.Subtitle>
              </_.TextContainer>
              <_.History
                onClick={() => {
                  taskTransform?.('', '추모관 기록', {
                    memorialId: memorialId,
                    characterName: characterData.name,
                    lastModified: memorialData.updatedAt,
                  });
                }}
              >
                기록
              </_.History>
              <_.DocumentUpdate onClick={handleCommit}>문서 수정</_.DocumentUpdate>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>{characterData.saying}</_.Quote>
                <_.Index>
                  <_.IndexTitle>목차</_.IndexTitle>
                  {indexData.map((item, idx) => {
                    // console.log(idx);
                    return (
                      <IndexMenu
                        text={item}
                        idx={idx}
                        key={`index-${idx}`}
                      ></IndexMenu>
                    );
                  })}
                </_.Index>
              </_.IndexWrapper>
              <_.ProfileContainer>
                <_.ProfileInnerContainer>
                  {/*<_.PictureContainer>*/}
                  {/*  <_.Ribbon*/}
                  {/*    src={ribbon}*/}
                  {/*    alt="ribbon"*/}
                  {/*  />*/}
                  {/*  <_.Picture imgUrl={inputValue.profileImage} />*/}
                  {/*  <_.Name>{inputValue.name}</_.Name>*/}
                  {/*</_.PictureContainer>*/}

                  <_.PictureContainer>
                    <_.Ribbon
                      src={ribbon}
                      alt="ribbon"
                    />
                    <_.Picture imgUrl={characterData.imageUrl} />
                    <_.Name>{characterData.name}</_.Name>
                  </_.PictureContainer>
                  <_.Information>
                    <_.Row>
                      <_.Attribute>나이</_.Attribute>
                      <_.Value>향년 {characterData.age}세</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사망 날짜</_.Attribute>
                      <_.Value>{characterData.deathOfDay}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사인(死因)</_.Attribute>
                      <_.Value>{characterData?.deathReason}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>상세 사인</_.Attribute>
                      <_.Value>{characterData.causeOfDeathDetails}</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>애니메이션</_.Attribute>
                      <_.Value>{animation}</_.Value>
                      {/*api에 값이 없음*/}
                    </_.Row>
                  </_.Information>
                </_.ProfileInnerContainer>
              </_.ProfileContainer>
            </_.ContentContainer>
          </_.Section1>

          <_.GotoBow
            onClick={() => {
              taskTransform?.('', '절하기', { memorialId: memorialId });
            }}
          >
            절 하러가기
          </_.GotoBow>

          <_.Section2>
            <_.CommentContainer>
              <_.CommentTitle>추모글</_.CommentTitle>
              <_.CommentMain>
                <_.CommentMainInner>
                  <_.InputComment>
                    <form onSubmit={handleSubmit}>
                      <_.InputCommentText
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="추모글을 입력하세요."
                        maxLength={250}
                      ></_.InputCommentText>
                      <_.CharCount>{content.length}/250</_.CharCount>
                    </form>
                  </_.InputComment>
                  {memorialComment.map((comment, idx) => {
                    return (
                      <Fragment key={comment.commentId}>
                        <Comment
                          userid={comment.userId}
                          content={comment.content ? comment.content : ''}
                          idx={idx}
                          commentId={comment.commentId}
                          parentId={comment.parentId}
                          currentUserId={currentUserId}
                          likes={comment.likes}
                          isLiked={comment.isLiked}
                          userName={userDataMap[comment.userId]?.name}
                          userProfile={userDataMap[comment.userId]?.profile}
                          onReplySubmit={handleReplySubmit}
                          onEditSubmit={handleEditSubmit}
                          onDeleteSubmit={handleDeleteSubmit}
                          onLikeToggle={handleLikeToggle}
                        />
                        {comment.children?.map((child, childIdx) => (
                          <Comment
                            key={child.commentId}
                            userid={child.userId}
                            content={child.content ? child.content : ''}
                            idx={idx + childIdx + 1}
                            commentId={child.commentId}
                            parentId={child.parentId}
                            currentUserId={currentUserId}
                            likes={child.likes}
                            isLiked={child.isLiked}
                            userName={userDataMap[child.userId]?.name}
                            userProfile={userDataMap[child.userId]?.profile}
                            onReplySubmit={handleReplySubmit}
                            onEditSubmit={handleEditSubmit}
                            onDeleteSubmit={handleDeleteSubmit}
                            onLikeToggle={handleLikeToggle}
                          />
                        ))}
                      </Fragment>
                    );
                  })}
                  {hasNextComment && (
                    <_.LoadMoreButton onClick={handleLoadMore}>더보기</_.LoadMoreButton>
                  )}
                </_.CommentMainInner>
              </_.CommentMain>
            </_.CommentContainer>
            <_.ArticleContainer>
              <_.ArticleContent>{parsedContent}</_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
};

export default Memorial;
