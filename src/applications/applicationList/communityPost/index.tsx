import React from 'react';
import * as _ from './style';
import Posts from '@/applications/components/posts';
import Comment from '@/applications/components/communityComment';
import CommentInput from '@/applications/components/commentInput';
import chevron from '@/assets/community/chevron-left.svg';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import HommerBackground from '@/assets/community/homer_background.png';
import Hommer from '@/assets/community/hommer.svg';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { alerterAtom } from '@/atoms/alerter';
import { usePostSingleSearch } from '@/api/community/postSingleSearch';
import { usePostCommentListSearch } from '@/api/community/postCommentListSearch';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const CommunityPost = ({ stack, push, pop, top }: dataStructureProps) => {
  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const setAlert = useAtomValue(alerterAtom);

  return (
    <_.Container>
      <_.Main>
        <_.Header>
          <_.BtnIcon onClick={() => push(taskSearch?.('communityMain', stackProps))}>
            <_.Icon src={chevron} />
          </_.BtnIcon>
          방태양님의 게시글
        </_.Header>
        <_.PostArea>
          <Posts
            user={{ name: '방태양', userId: 'noah_byte' }}
            post={{
              title: '아니 얘가 벌써 죽는다고?',
              body: '아니 이건 진짜 아니지. 살려내라.',
              createdAt: '2025년 09월 14일 AM 8:47',
              likesCount: 12,
              commentCount: 20,
            }}
          />
          <CommentInput
            name="방태양"
            userId="noah_byte"
            postId={1}
          />
          <Comment
            user={{ name: '방태양', id: 'noah_byte', profileImage: '' }}
            post={{ content: '아니 이건 진짜 아니지. 살려내라.', heart: 12, comment: 20 }}
            first={true}
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

export default CommunityPost;
