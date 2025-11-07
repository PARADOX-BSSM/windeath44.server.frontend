import React from 'react';
import * as _ from './style';
import { useState, useEffect } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import CommunityBtn from '@/applications/components/communityBtn';
import FilterBlock from '@/applications/components/filterBlock';
import Inputs from '@/applications/components/inputs';
import PostPreview from '@/applications/components/postPreview';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import HommerBackground from '@/assets/community/homer_background.png';
import Hommer from '@/assets/community/hommer.svg';
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
  const postData = usePostListSearch();

  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState(sortOption.Latest);
  const [active, setActive] = useState('humor');
  const [search, setSearch] = useState('');
  const token = getCookie('access_token');

  useEffect(() => {
    postData.mutate({ status: 'PUBLISHED' }); // 게시된 상태의 게시물 전체 조회
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
      taskTransform('', '게시글 작성');
    }
  };

  const searchHandle = () => {
    postData.mutate({ title: search, status: 'PUBLISHED' });
  };

  return (
    <_.Container>
      <_.Main>
        <_.Header>
          <_.ButtonArea>
            <CommunityBtn
              name="유머글"
              selected={active === 'humor'}
              onClick={() => setActive('humor')}
              type="menu"
            />
            <CommunityBtn
              name="인기글"
              selected={active == 'popular'}
              onClick={() => setActive('popular')}
              type="menu"
            />
            <CommunityBtn
              name="검색"
              selected={active == 'search'}
              onClick={() => setActive('search')}
              type="menu"
            />
            <CommunityBtn
              name="게시글 작성"
              selected={false}
              onClick={postCreateClick}
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
          {postData.data?.posts?.map((data) => (
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
                commentCount: data.commentCount || 0,
              }}
              onClick={() =>
                push(taskSearch?.('communityPost', { ...stackProps, postId: data.postId }))
              }
            />
          ))}
          <PostPreview
            user={{ name: '방태양', userId: 'noah_byte' }}
            post={{
              postId: 1,
              title: '아니 얘가 벌써 죽는다고?',
              body: '아니 이건 진짜 아니지. 살려내라.',
              postImage: '',
              createdAt: '2025년 09월 14일 AM 8:47',
              likesCount: 12,
              commentCount: 20,
            }}
            onClick={() => push(taskSearch?.('communityPost', stackProps))}
          />
        </_.PostArea>
      </_.Main>
      <_.Judgement>
        <_.NavJudgement>
          <_.JudgementImgDiv
            background={HommerBackground}
            onClick={() => {
              if (taskTransform) taskTransform('', '재판');
            }}
          >
            <_.JudgementImg src={Hommer} />
          </_.JudgementImgDiv>
          <_.JudgementText>재판으로</_.JudgementText>
        </_.NavJudgement>

        <_.JudgementLankArea>
          <_.JudgementText>진행중인 재판</_.JudgementText>
          <_.JudgementLankList>
            <_.JudgementLank>
              <_.JudgementLankNum>#1</_.JudgementLankNum>
              <_.JudgementName>호시노 아이</_.JudgementName>
            </_.JudgementLank>
            <_.JudgementLank>
              <_.JudgementLankNum>#2</_.JudgementLankNum>
              <_.JudgementName>포트거스 D. 에이스</_.JudgementName>
            </_.JudgementLank>
            <_.JudgementLank>
              <_.JudgementLankNum>#3</_.JudgementLankNum>
              <_.JudgementName>사토 카즈마</_.JudgementName>
            </_.JudgementLank>
          </_.JudgementLankList>
        </_.JudgementLankArea>
      </_.Judgement>
    </_.Container>
  );
};
export default Community;
