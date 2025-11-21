import React from 'react';
import * as _ from './style';
import { useState, useEffect } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import CommunityBtn from '@/applications/components/communityBtn';
import FilterBlock from '@/applications/components/filterBlock';
import Inputs from '@/applications/components/inputs';
import PostPreview from '@/applications/components/postPreview';
import JudgementPreview from '@/applications/components/judgementPreview';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { usePostListSearch } from '@/api/community/postListSearch';
import { getCookie } from '@/api/auth/cookie.ts';
import { alerterAtom } from '@/atoms/alerter';
import axios from 'axios';
import { user as userEndpoint } from '@/config';

enum sortOption {
  normal = '기본순',
  latest = '최신순',
  popular = '인기순',
}
interface User {
  name: string;
  userId: string;
  profile?: string;
}
interface Post {
  postId: number;
  title: string;
  body: string;
  postImage: string;
  commentCount: number;
  likesCount: number;
  createdAt: string;
}
interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const Community = ({ stack, push, pop, top }: dataStructureProps) => {
  const postListSearchMutation = usePostListSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState(sortOption.normal);
  const [active, setActive] = useState('humor');
  const [search, setSearch] = useState('');
  const [postData, setPostData] = useState<any[]>([]);
  const [userDataMap, setUserDataMap] = useState<Record<string, { name: string; profile: string }>>(
    {},
  );
  const token = getCookie('access_token');

  useEffect(() => {
    if (postListSearchMutation.isSuccess && postListSearchMutation.data?.data?.posts) {
      setPostData(postListSearchMutation.data.data.posts);
    }
  }, [postListSearchMutation.isSuccess, postListSearchMutation.data]);

  // 사용자 정보 가져오기
  useEffect(() => {
    if (postData.length === 0) return;
    const userIds = new Set<string>();
    postData.forEach((post) => {
      userIds.add(post.userId);
    });

    const userIdArray = Array.from(userIds);
    if (userIdArray.length === 0) return;
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
  }, [postData]);

  // 컴포넌트 마운트 시 초기 게시글 로딩
  useEffect(() => {
    postListSearchMutation.mutate(
      { status: 'PUBLISHED' },
      {
        onError: () => {
          setAlert?.(<>게시글이 제대로 불러와지지 않았습니다.</>, () =>
            taskTransform?.('경고', ''),
          );
        },
      },
    );
  }, []);

  useEffect(() => {
    if (active) {
      postListSearchMutation.mutate(
        { status: 'PUBLISHED' },
        {
          onError: () => {
            setAlert?.(<>게시글이 제대로 불러와지지 않았습니다.</>, () =>
              taskTransform?.('경고', ''),
            );
          },
        },
      );
    }
  }, [active]);

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const setAlert = useAtomValue(alerterAtom);

  const mod: string[] = [sortOption.normal, sortOption.latest, sortOption.popular];
  const modTogle = (value: any) => {
    setSort(value);
    setIsOpen(false);
    postListSearchMutation.mutate(
      { status: 'PUBLISHED', mod: sort },
      {
        onError: () => {
          setAlert?.(<>게시글이 제대로 불러와지지 않았습니다.</>, () =>
            taskTransform?.('경고', ''),
          );
        },
      },
    );
  };

  const refetchPosts = () => {
    postListSearchMutation.mutate(
      { status: 'PUBLISHED' },
      {
        onError: () => {
          setAlert?.(<>게시글이 제대로 불러와지지 않았습니다.</>, () =>
            taskTransform?.('경고', ''),
          );
        },
      },
    );
  };

  const postCreateClick = () => {
    if (!token && setAlert) {
      setAlert(
        <>
          게스트는 게시글 작성이 불가능 합니다.
          <br />
          로그인 후 사용 가능 합니다.
        </>,
        () => {
          taskTransform?.('경고', '');
        },
      );
      return;
    } else if (taskTransform) {
      return taskTransform('', '게시글 작성', { refetchPosts });
    }
  };

  const searchHandle = () => {
    if (!search.trim()) {
      setAlert?.(<>검색어를 입력해주세요.</>, () => {
        taskTransform?.('경고', '');
      });
      return;
    }

    postListSearchMutation.mutate(
      { status: 'PUBLISHED', title: search },
      {
        onSuccess: () => {
          console.log('검색 완료');
        },
        onError: () => {
          setAlert?.(<>게시글 검색에 실패했습니다.</>, () => {
            taskTransform?.('경고', '');
          });
        },
      },
    );
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandle();
    }
  };

  return (
    <_.Container>
      <_.Main>
        <_.Header>
          <_.ButtonArea>
            <CommunityBtn
              name="게시글"
              selected={active === 'humor'}
              onClick={() => setActive('humor')}
              type="menu"
            />
            <CommunityBtn
              name="게시글 작성"
              selected={false}
              onClick={postCreateClick}
              type="menu"
            />
            <CommunityBtn
              name="검색"
              selected={active == 'search'}
              onClick={() => setActive('search')}
              type="menu"
            />
          </_.ButtonArea>
          <_.sortInput>
            <FilterBlock
              label=""
              option={sort}
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              list={mod}
              onChange={modTogle}
            />
          </_.sortInput>
        </_.Header>
        {active == 'search' && (
          <_.InputArea>
            <Inputs
              width="100%"
              fontSize="14px"
              flex
              value={search}
              type="text"
              setValue={setSearch}
              placeHold="무엇이든 입력해보세요!"
              onKeyDown={handleSearchKeyDown}
            />
            <MemorialBtn
              name="검색"
              type="menu"
              width="74px"
              height="100%"
              fontSize="14px"
              onClick={searchHandle}
            />
            {/*<CommunityBtn name="검색" onClick={()=>setActive("search")} type='menu' />*/}
          </_.InputArea>
        )}
        <_.PostArea>
          {postData.map((data) => (
            <PostPreview
              key={data.postId}
              user={{
                name: userDataMap[data.userId]?.name || '사용자',
                userId: data.userId,
                profile: userDataMap[data.userId]?.profile,
              }}
              post={{
                postId: data.postId,
                title: data.title,
                body: data.body,
                postImage: '',
                createdAt: data.createdAt,
                likesCount: data.likesCount || 0,
                commentCount: data.postCommentCount || 0,
              }}
              onClick={() =>
                push(taskSearch?.('communityPost', { ...stackProps, postId: data.postId }))
              }
            />
          ))}
        </_.PostArea>
      </_.Main>
      <JudgementPreview />
    </_.Container>
  );
};
export default Community;
