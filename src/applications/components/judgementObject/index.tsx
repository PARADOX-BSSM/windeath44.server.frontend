import { useAtomValue } from 'jotai';
import MainInfo from '../judgementMainInfo';
import SubInfo from '../judgementSubInfo';
import * as _ from './style';
import { taskSearchAtom, taskTransformerAtom } from '@/atoms/taskTransformer';
import { Sep_window } from '@/applications/applicationList/vote/state_manage';
import { useEffect } from 'react';

interface JudgementObjProps {
  judgement_id: number;
  rank: number;
  c_name: string;
  a_name: string;
  img: string | undefined;
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
  c_name,
  a_name,
  img,
  like,
  vote,
  heaven_count,
  hell_count,
  stack,
  push,
  pop,
  top,
}: JudgementObjProps) => {
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
    a_name: a_name,
    c_name: c_name,
    img: img,
    like: like,
    vote: vote,
    hell_count: hell_count,
    heaven_count: heaven_count,
  };

  return (
    <_.Main_Box>
      <_.Left>
        <MainInfo
          rank={rank}
          cName={c_name}
          aName={a_name}
          img={img}
          like={like}
          voteNum={vote}
        ></MainInfo>
      </_.Left>

      <_.Right>
        <SubInfo
          heaven_count={((heaven_count / (heaven_count + hell_count)) * 100).toFixed(1)}
          hell_count={((hell_count / (heaven_count + hell_count)) * 100).toFixed(1)}
        ></SubInfo>
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
