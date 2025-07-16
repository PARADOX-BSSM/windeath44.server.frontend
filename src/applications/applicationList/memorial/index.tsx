import IndexMenu from '@/applications/components/indexMenu';
import Comment from '@/applications/components/comment';
import * as _ from './style';
import { index_data, comment_data } from './data';
// import characterUrl from '@/assets/character/hosino.svg';
import { useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { useMemorialGet } from '@/api/memorial/memorialGet.ts';
import { useEffect, useState } from 'react';
import { useGetCharacter } from '@/api/anime/getCharacter.ts';
import type { CharacterData } from '@/api/anime/getCharacter';
import type { memorialData } from '@/api/memorial/memorialGet';
// import { useGetMemorialComments } from '@/api/memorial/getMemorialComments.ts';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}
const Memorial = ({ stack, push, pop, top }: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const [characterData, setCharacterData] = useState<CharacterData>({
    characterId: 0,
    name: '',
    lifeTime: 0,
    deathReason: '',
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
  useEffect(() => {
    const id = 1;
    const characterId = 1;
    mutationMemorialGet.mutate(id);
    mutationGetCharacter.mutate(characterId);
  }, []);
  return (
    <_.Main>
      <_.Container>
        <_.InnerContainer>
          <_.Section1>
            <_.Header>
              <_.TextContainer>
                <_.Title>{characterData.name}</_.Title>
                <_.Subtitle>최근 수정: {memorialData.updatedAt}</_.Subtitle>
              </_.TextContainer>
              <_.History
                onClick={() => {
                  push(taskSearch?.('memorailHistory', stack, push, pop, top));
                }}
              >
                기록
              </_.History>
              <_.DocumentUpdate
                onClick={() => {
                  taskTransform?.('', 'MemorialPreview');
                  push(taskSearch?.('MemorialCommit', stack, push, pop, top));
                }}
              >
                문서 수정
              </_.DocumentUpdate>
            </_.Header>
            <_.ContentContainer>
              <_.IndexWrapper>
                <_.Quote>{characterData.saying}</_.Quote>
                <_.Index>
                  <_.IndexTitle>목차</_.IndexTitle>
                  {index_data.map((item, idx) => {
                    // console.log(idx);
                    return (
                      <IndexMenu
                        text={item}
                        idx={idx}
                      ></IndexMenu>
                    );
                  })}
                </_.Index>
              </_.IndexWrapper>
              <_.ProfileContainer>
                <_.ProfileInnerContainer>
                  <_.PictureContainer>
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
                      <_.Attribute>생존 기간</_.Attribute>
                      <_.Value>{characterData.lifeTime}화</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>애니메이션</_.Attribute>
                      <_.Value>최애의 아이</_.Value>
                      {/*api에 값이 없음*/}
                    </_.Row>
                  </_.Information>
                </_.ProfileInnerContainer>
              </_.ProfileContainer>
            </_.ContentContainer>
          </_.Section1>

          <_.GotoBow
            onClick={() => {
              taskTransform?.('', 'Bow');
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
                    <_.InputCommentText
                      type="text"
                      placeholder="추모글을 입력하세요."
                    ></_.InputCommentText>
                  </_.InputComment>
                  {comment_data.map((comment, idx) => {
                    return (
                      <Comment
                        key={idx}
                        nickname={comment.nickname}
                        userid={comment.userid}
                        content={comment.content}
                        idx={idx}
                      />
                    );
                  })}
                </_.CommentMainInner>
              </_.CommentMain>
            </_.CommentContainer>

            <_.ArticleContainer>
              {/*<_.ArticleTitle>1. 마지막 순간</_.ArticleTitle>*/}
              <_.ArticleContent>{memorialData.content}</_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
};

export default Memorial;
