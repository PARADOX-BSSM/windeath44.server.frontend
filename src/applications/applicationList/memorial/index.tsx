import IndexMenu from '@/applications/components/indexMenu';
import Comment from '@/applications/components/comment';
import * as _ from './style';
import { index_data } from './data';
import { useAtom, useAtomValue } from 'jotai';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { useMemorialGet } from '@/api/memorial/memorialGet.ts';
import { useEffect, useState } from 'react';
import { useGetCharacter } from '@/api/anime/getCharacter.ts';
import type { CharacterData } from '@/api/anime/getCharacter';
import type { memorialData } from '@/api/memorial/memorialGet';
import {
  MemorialCommentsData,
  useGetMemorialComments,
} from '@/api/memorial/getMemorialComments.ts';
import { useCommentWrite } from '@/api/memorial/memorialCommentWrite.ts';
import { parseCustomContent } from '@/lib/customTag/parseCustomContent.tsx';
import { useGetAnimation } from '@/api/anime/getAnimation.ts';
import ribbon from '@/assets/memorial_ribbon.svg';

interface dataStructureProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
  memorialId: number;
  characterId: number;
}
const Memorial = ({ stack, push, pop, top, memorialId, characterId }: dataStructureProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const [content, setContent] = useState<string>('');
  const [characterData, setCharacterData] = useState<CharacterData>({
    characterId: 0,
    animeId: 0,
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
  const [animation, setAnimation] = useState<string>('');
  const mutationAnimation = useGetAnimation(setAnimation);
  const [memorialComment, setMemorialComment] = useState<MemorialCommentsData[]>([]);
  const mutaionGetMemorialComments = useGetMemorialComments(setMemorialComment);
  const mutationCommentWrite = useCommentWrite();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    mutationCommentWrite.mutate(
      { memorialId, content },
      {
        onSuccess: () => {
          setContent('');
          mutaionGetMemorialComments.mutate({ memorialId });
        },
      },
    );
  };
  useEffect(() => {
    mutationMemorialGet.mutate(memorialId);
    mutaionGetMemorialComments.mutate({ memorialId });
    mutationGetCharacter.mutate(characterId);
  }, []);

  if (!characterData) {
    return <p>무언가 잘못되었습니다.</p>;
  }
  if (!memorialData) {
    return <p>무언가 잘못되었습니다.</p>;
  }

  useEffect(() => {
    if (characterData.animeId) {
      mutationAnimation.mutate(characterData.animeId);
    }
  }, [characterData.animeId]);

  const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
  };

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
                  push(taskSearch?.('memorailHistory', stackProps));
                }}
              >
                기록
              </_.History>
              <_.DocumentUpdate
                onClick={() => {
                  taskTransform?.('', '미리보기');
                  push(taskSearch?.('MemorialCommit', stackProps));
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
                      <_.Attribute>생존 기간</_.Attribute>
                      <_.Value>{characterData.lifeTime}화</_.Value>
                    </_.Row>
                    <_.Row>
                      <_.Attribute>사인(死因)</_.Attribute>
                      <_.Value>{characterData?.deathReason}</_.Value>
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
              taskTransform?.('', 'Bow', { memorialId: memorialId });
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
                      ></_.InputCommentText>
                    </form>
                  </_.InputComment>
                  {memorialComment.map((comment, idx) => {
                    return (
                      <Comment
                        key={idx}
                        userid={comment.userId}
                        content={comment.content ? comment.content : ''}
                        idx={idx}
                      />
                    );
                  })}
                </_.CommentMainInner>
              </_.CommentMain>
            </_.CommentContainer>
            <_.ArticleContainer>
              <_.ArticleContent>
                {parseCustomContent(index_data, memorialData.content)}
              </_.ArticleContent>
            </_.ArticleContainer>
          </_.Section2>
        </_.InnerContainer>
      </_.Container>
    </_.Main>
  );
};

export default Memorial;
