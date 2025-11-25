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
import { useGetCharactersByCharacterIds } from '@/api/anime/getCharactersByCharacterIds.ts';
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
import { useGetUserMutation } from '@/api/user/getUser';
import { getCookie } from '@/api/auth/cookie.ts';
import { ApplicationProps } from '@/applications/layout/utils';
import axios from 'axios';
import { user as userEndpoint, memorial as memorialEndpoint } from '@/config';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';
import api from '@/api/axiosInstance';
import { memorialViewerListAtom } from '@/atoms/memorialManager';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialId: number;
  characterId: number;
  props?: ApplicationProps;
  setWindowName?: (name: string) => void;
  instanceId?: string;
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
  instanceId,
}: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const setAlert = useAtomValue(alerterAtom);
  const [, setInputValue] = useAtom(inputPortage);
  const [, setViewerList] = useAtom(memorialViewerListAtom);
  const [content, setContent] = useState<string>('');
  const token = getCookie('access_token');
  const [indexData, setIndexData] = useState<string[]>([]);
  const [userDataMap, setUserDataMap] = useState<Record<string, { name: string; profile: string }>>(
    {},
  );
  const [officialCharactersData, setOfficialCharactersData] = useState<CharacterData[]>([]);
  const [officialUserIdToCharacterId, setOfficialUserIdToCharacterId] = useState<
    Map<string, number>
  >(new Map());
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
  const mutationGetCharactersByCharacterIds =
    useGetCharactersByCharacterIds(setOfficialCharactersData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    const submittedContent = content;
    setContent(''); // submit 직후 즉시 input 비우기

    mutationCommentWrite.mutate(
      { memorialId, content: submittedContent },
      {
        onSuccess: async () => {
          // 서버가 생성된 댓글을 반환하지 않으므로, 직접 API 호출로 실제 ID 획득
          // mutation을 사용하지 않고 직접 호출하여 전체 교체 방지
          try {
            const response = await api.get(`${memorialEndpoint}/comment/${memorialId}`, {
              params: { size: 10 },
            });
            const serverComments = response.data.data.data;

            // 임시 댓글(음수 ID)을 실제 댓글로 교체
            setMemorialComment((prev) => {
              return prev.map((comment) => {
                if (comment.commentId < 0) {
                  // content가 일치하는 서버 댓글 찾기
                  const realComment = serverComments.find(
                    (sc: MemorialCommentsData) =>
                      sc.content === comment.content && sc.userId === comment.userId,
                  );
                  return realComment || comment;
                }
                return comment;
              });
            });
          } catch (error) {
            console.error('댓글 목록 조회 실패:', error);
          }
        },
        onError: () => {
          setContent(submittedContent); // 에러 시 입력했던 내용 복원
          setAlert?.(
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
        onSuccess: async () => {
          // 서버가 생성된 댓글을 반환하지 않으므로, 직접 API 호출로 실제 ID 획득
          try {
            const response = await api.get(`${memorialEndpoint}/comment/${memorialId}`, {
              params: { size: 10 },
            });
            const serverComments = response.data.data.data;

            // 임시 답글(음수 ID)을 실제 답글로 교체
            setMemorialComment((prev) => {
              return prev.map((comment) => {
                // 답글(children)에서 임시 댓글 찾기
                if (comment.children && comment.children.length > 0) {
                  const updatedChildren = comment.children.map((child) => {
                    if (child.commentId < 0) {
                      // 서버 댓글에서 부모 댓글 찾기
                      const parentInServer = serverComments.find(
                        (sc: MemorialCommentsData) => sc.commentId === comment.commentId,
                      );
                      if (parentInServer?.children) {
                        // 부모의 children에서 content가 일치하는 답글 찾기
                        const realReply = parentInServer.children.find(
                          (rc: MemorialCommentsData) =>
                            rc.content === child.content && rc.userId === child.userId,
                        );
                        return realReply || child;
                      }
                    }
                    return child;
                  });
                  return { ...comment, children: updatedChildren };
                }
                return comment;
              });
            });
          } catch (error) {
            console.error('답글 목록 조회 실패:', error);
          }
        },
        onError: () => {
          setAlert?.(
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
    if (characterData?.animeId) {
      mutationAnimation.mutate(characterData.animeId, {
        onError: () => {
          setAlert?.(
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
  }, [characterData?.animeId]);

  // 창 제목 설정
  useEffect(() => {
    if (setWindowName && characterData?.name) {
      setWindowName?.(`추모관 뷰어 - ${characterData.name}`);
    }
  }, [characterData, setWindowName]);

  // 마운트 시 리스트에 추가, 언마운트 시 제거
  useEffect(() => {
    if (!instanceId) {
      console.warn('Memorial: instanceId is undefined');
      return;
    }

    setViewerList((prev) => [
      ...prev,
      {
        instanceId,
        windowName: '추모관 뷰어',
        characterId,
      },
    ]);

    return () => {
      setViewerList((prev) => prev.filter((v) => v.instanceId !== instanceId));
    };
  }, [instanceId, characterId, setViewerList]);

  // characterData.name이 로드되면 리스트의 windowName 업데이트
  useEffect(() => {
    if (instanceId && characterData?.name) {
      setViewerList((prev) =>
        prev.map((v) =>
          v.instanceId === instanceId
            ? { ...v, windowName: `추모관 뷰어 - ${characterData.name}` }
            : v,
        ),
      );
    }
  }, [instanceId, characterData?.name, setViewerList]);

  // content가 변경될 때마다 파싱하여 목차 업데이트
  const parsedContent = useMemo(() => {
    const tempIndexData: string[] = [];
    const result = parseCustomContent(tempIndexData, memorialData!.content);
    setIndexData(tempIndexData);
    return result;
  }, [memorialData?.content]);

  // 사용자 정보 가져오기
  useEffect(() => {
    if (memorialComment.length === 0) return;

    // 모든 userId 추출 (부모 + 자식 댓글)
    const userIds = new Set<string>();
    const officialCharacterIds = new Set<number>();
    const userIdToCharacterIdMap = new Map<string, number>();

    memorialComment.forEach((comment) => {
      // official-windeath44로 시작하는 userId에서 characterId 추출
      // 형식: official-windeath44-{characterId}-{chatbotName}
      if (comment.userId.startsWith('official-windeath44-')) {
        const parts = comment.userId.split('-');
        // parts[0] = 'official', parts[1] = 'windeath44', parts[2] = characterId
        if (parts.length >= 3) {
          const characterId = parseInt(parts[2]);
          if (!isNaN(characterId)) {
            officialCharacterIds.add(characterId);
            userIdToCharacterIdMap.set(comment.userId, characterId);
          }
        }
      } else {
        userIds.add(comment.userId);
      }

      comment.children?.forEach((child) => {
        if (child.userId.startsWith('official-windeath44-')) {
          const parts = child.userId.split('-');
          if (parts.length >= 3) {
            const characterId = parseInt(parts[2]);
            if (!isNaN(characterId)) {
              officialCharacterIds.add(characterId);
              userIdToCharacterIdMap.set(child.userId, characterId);
            }
          }
        } else {
          userIds.add(child.userId);
        }
      });
    });

    // official character 정보 가져오기
    if (officialCharacterIds.size > 0) {
      const characterIdsArray = Array.from(officialCharacterIds);
      setOfficialUserIdToCharacterId(userIdToCharacterIdMap);
      mutationGetCharactersByCharacterIds.mutate(characterIdsArray);
    }

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

  // official character 정보를 userDataMap에 추가
  useEffect(() => {
    if (officialCharactersData.length === 0) return;

    const characterMap = new Map<number, CharacterData>();
    officialCharactersData.forEach((character) => {
      if (character) {
        characterMap.set(character.characterId, character);
      }
    });

    // 각 official userId에 대해 character 정보 매핑
    setUserDataMap((prev) => {
      const newMap = { ...prev };
      officialUserIdToCharacterId.forEach((characterId, userId) => {
        const character = characterMap.get(characterId);
        if (character) {
          newMap[userId] = {
            name: character.name,
            profile: character.imageUrl,
          };
        }
      });
      return newMap;
    });
  }, [officialCharactersData, officialUserIdToCharacterId]);

  // 데이터 로딩 중일 때 로딩 컴포넌트 표시
  if (
    mutationMemorialGet.isPending ||
    mutationGetCharacter.isPending ||
    mutaionGetMemorialComments.isPending ||
    !characterData!.characterId ||
    !memorialData!.memorialId
  ) {
    return <Loading />;
  }

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
        name: characterData?.name,
        deathReason: characterData?.deathReason,
        date: characterData?.deathOfDay,
        lifeCycle: characterData?.lifeTime,
        anime: animation,
        animeId: characterData?.animeId,
        age: characterData?.age,
        profileImage: characterData?.imageUrl,
        phrase: characterData?.saying,
        causeOfDeathDetails: characterData?.causeOfDeathDetails || '',
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
                <_.Title>{characterData?.name}</_.Title>
                <_.Subtitle>최근 수정: {formatDate(memorialData!.updatedAt)}</_.Subtitle>
              </_.TextContainer>
              <_.History
                onClick={() => {
                  taskTransform?.('', '추모관 기록', {
                    memorialId: memorialId,
                    characterName: characterData?.name,
                    lastModified: memorialData?.updatedAt,
                  });
                }}
              >
                기록
              </_.History>
              <_.DocumentUpdate onClick={handleCommit}>문서 수정</_.DocumentUpdate>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>{characterData?.saying}</_.Quote>
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
                        onMouseEnter={() => {
                          setCursorImage(CURSOR_IMAGES.drag);
                        }}
                        onMouseLeave={() => {
                          setCursorImage(CURSOR_IMAGES.default);
                        }}
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
                          isOfficial={comment.userId.startsWith('official-windeath44-')}
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
                            isOfficial={child.userId.startsWith('official-windeath44-')}
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
