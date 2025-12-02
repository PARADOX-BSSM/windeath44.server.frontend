import { useAtomValue } from 'jotai';
import MainInfo from '../judgementMainInfo';
import SubInfo from '../judgementSubInfo';
import * as _ from './style';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { Sep_window } from '@/applications/applicationList/vote/state_manage';
import { useEffect } from 'react';
import type { CharacterData } from '@/api/anime/getCharacter';

interface JudgementObjProps {
  judgement_id: number;
  rank: number;
  c_id: number;
  c_name: string;
  a_name: string;
  img: string | undefined;
  characterData?: CharacterData; // ✅ 부모에서 받아온 캐릭터 데이터
  animeData?: any; // ✅ 부모에서 받아온 애니메이션 데이터
  like: number;
  vote: number;
  heaven_count: number;
  hell_count: number;
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const Judgement_Object = ({
  judgement_id,
  rank,
  c_id,
  c_name,
  a_name,
  img,
  characterData,
  animeData,
  like,
  vote,
  heaven_count,
  hell_count,
  stack,
  push,
  pop,
  top,
}: JudgementObjProps) => {
  // ✅ 더 이상 API 호출하지 않음 - 부모에서 받은 데이터 사용
  const taskSearch = useAtomValue(taskSearchAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);
  const sep_window = useAtomValue(Sep_window);

  const chatProps = { judgement_id: judgement_id };

  useEffect(() => {
    if (sep_window == false) {
      taskTransform('재판 댓글', '');
    }
  }, [sep_window]);

  const VoteProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
    judgement_id: judgement_id,
    a_name: animeData?.name || a_name,
    c_name: characterData?.name || c_name,
    img: characterData?.imageUrl || img,
    like: like,
    vote: vote,
    hell_count: hell_count,
    heaven_count: heaven_count,
  };

  return (
    <_.Main_Box>
      <_.Left>
        <MainInfo
          id={judgement_id}
          rank={rank}
          cName={characterData?.name || c_name}
          aName={animeData?.name || a_name}
          img={characterData?.imageUrl || img}
          like={like}
          voteNum={vote}
        />
      </_.Left>

      <_.Right>
        <SubInfo
          heaven_count={
            heaven_count != 0
              ? ((heaven_count / (heaven_count + hell_count)) * 100).toFixed(1)
              : '0.0'
          }
          hell_count={
            hell_count != 0 ? ((hell_count / (heaven_count + hell_count)) * 100).toFixed(1) : '0.0'
          }
        />
        <_.Link
          onClick={() => {
            taskTransform('', '재판 댓글', chatProps);
            push(taskSearch?.('투표', VoteProps));
          }}
        >
          «« 재판장으로 가기
        </_.Link>
      </_.Right>
    </_.Main_Box>
  );
};

export default Judgement_Object;
