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
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { usePostListSearch } from '@/api/community/postListSearch';
import { getCookie } from '@/api/auth/cookie.ts';
import { alerterAtom } from '@/atoms/alerter';

enum sortOption {
  Latest = '최신순',
  Popular = '인기순',
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
  const [sort, setSort] = useState(sortOption.Latest);
  const [active, setActive] = useState('humor');
  const [search, setSearch] = useState('');
  const [postData, setPostData] = useState<any[]>([]);
  const token = getCookie('access_token');

  useEffect(() => {
    if (postListSearchMutation.isSuccess && postListSearchMutation.data?.data?.content) {
      setPostData(postListSearchMutation.data.data.content);
    }
  }, [postListSearchMutation.isSuccess, postListSearchMutation.data]);

  // 컴포넌트 마운트 시 초기 게시글 로딩
  useEffect(() => {
    postListSearchMutation.mutate(
      { status: 'PUBLISHED' },
      {
        onError: () => {
          if (setAlert) {
            setAlert(Seori, <>게시글이 제대로 불러와지지 않았습니다.</>, () =>
              taskTransform?.('경고', ''),
            );
          }
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
            if (setAlert) {
              setAlert(Seori, <>게시글이 제대로 불러와지지 않았습니다.</>, () =>
                taskTransform?.('경고', ''),
              );
            }
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

  const sortOp: string[] = [sortOption.Latest, sortOption.Popular];
  const sortChange = (value: any) => {
    setSort(value);
    setIsOpen(false);
  };

  const postCreateClick = () => {
    if (!token && setAlert) {
      setAlert(
        Seori,
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
      return taskTransform('', '게시글 작성');
    }
  };

  const searchHandle = () => {};

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
              list={sortOp}
              onChange={sortChange}
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
              user={{ name: data.name, userId: data.userId, profile: data.profile }}
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
