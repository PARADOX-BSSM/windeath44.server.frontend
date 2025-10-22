import { useEffect, useState } from 'react';
import * as _ from './style';
import balance from '@/assets/judgement/balance.png';
import balance_left from '@/assets/judgement/balance_left.png';
import balance_right from '@/assets/judgement/balance_right.png';
import { useAtomValue, useSetAtom } from 'jotai';
import { Event_Count, Event_Past, Open_Vote, Sep_window } from './state_manage';
import MemorialBtn from '@/applications/components/memorialBtn';

interface VoteProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;

  aName: string;
  cName: string;
  img: string;
  like: number;
  vote: number;
  hell_count: number;
  heaven_count: number;
}

const Judgement_Vote = ({
  stack,
  push,
  pop,
  top,
  like,
  aName,
  cName,
  vote,
  heaven_count,
  hell_count,
  img,
}: VoteProps) => {
  const [isHeaven, setIsHeaven] = useState(false);
  const [isHell, setIsHell] = useState(false);

  const count = useAtomValue(Event_Count);
  const count_p = useAtomValue(Event_Past);
  const set_count_p = useSetAtom(Event_Past);
  const Set_open_vote = useSetAtom(Open_Vote);

  useEffect(() => {
    if (count != count_p) {
      pop();
      set_count_p(count);
    }
  }, [count]);

  useEffect(() => {
    Set_open_vote(true);
  }, []);

  return (
    <_.Container>
      <_.Main_Display>
        <_.Balance
          src={
            heaven_count >= hell_count
              ? heaven_count == hell_count
                ? balance
                : balance_left
              : balance_right
          }
        />
        {heaven_count >= hell_count ? (
          heaven_count == hell_count ? (
            <_.Main_Vote_Live>
              <_.Live_Div_Left marginTop={0}>
                <_.Live_Back></_.Live_Back>
                <_.Live_Text>{heaven_count}</_.Live_Text>
              </_.Live_Div_Left>

              <_.Live_Div_Right marginTop={0}>
                <_.Live_Back></_.Live_Back>
                <_.Live_Text>{hell_count}</_.Live_Text>
              </_.Live_Div_Right>
            </_.Main_Vote_Live>
          ) : (
            <_.Main_Vote_Live>
              <_.Live_Div_Left marginTop={48}>
                <_.Live_Back></_.Live_Back>
                <_.Live_Text>{heaven_count}</_.Live_Text>
              </_.Live_Div_Left>

              <_.Live_Div_Right marginTop={-50}>
                <_.Live_Back></_.Live_Back>
                <_.Live_Text>{hell_count}</_.Live_Text>
              </_.Live_Div_Right>
            </_.Main_Vote_Live>
          )
        ) : (
          <_.Main_Vote_Live>
            <_.Live_Div_Left marginTop={-50}>
              <_.Live_Back></_.Live_Back>
              <_.Live_Text>{heaven_count}</_.Live_Text>
            </_.Live_Div_Left>

            <_.Live_Div_Right marginTop={48}>
              <_.Live_Back></_.Live_Back>
              <_.Live_Text>{hell_count}</_.Live_Text>
            </_.Live_Div_Right>
          </_.Main_Vote_Live>
        )}

        <_.Vote_Btn_Div>
          <MemorialBtn
            width="98px"
            height="48px"
            name="천국"
            type="menu"
            fontSize="26px"
            selected={isHeaven}
            onClick={() => {
              setIsHeaven(true);
              setIsHell(false);
            }}
          />

          <MemorialBtn
            width="98px"
            height="48px"
            name="지옥"
            type="menu"
            fontSize="26px"
            selected={isHell}
            onClick={() => {
              setIsHell(true);
              setIsHeaven(false);
            }}
          />
        </_.Vote_Btn_Div>

        <_.Info>
          <_.Profile_Div>
            <_.Profile src={img} />
          </_.Profile_Div>
          <_.Name_Div>
            <_.CName>{cName}</_.CName>
            <_.AName>{aName}</_.AName>
          </_.Name_Div>
        </_.Info>
      </_.Main_Display>
    </_.Container>
  );
};

export default Judgement_Vote;
