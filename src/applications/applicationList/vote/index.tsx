import { useEffect, useState } from 'react';
import * as _ from './style';
import balance from '@/assets/judgement/balance.png';
import balance_left from '@/assets/judgement/balance_left.png';
import balance_right from '@/assets/judgement/balance_right.png';
import { useAtomValue, useSetAtom } from 'jotai';
import { Event_Count, Event_Past, Open_Vote, Sep_window } from './state_manage';
import MemorialBtn from '@/applications/components/memorialBtn';
import heart from '@/assets/community/heart_fill.svg';
import empty_heart from '@/assets/community/heart_line.svg';
import {
  usedeleteJudgementLike,
  usegetJudgementLike,
  usepostJudgementLike,
} from '@/api/judgement/judgementLike';

import { useDeleteVote, useGetVoteDirection, usePostVote } from '@/api/judgement/judgementVote';
import { useGetUserMutation } from '@/api/user/getUser';

interface VoteProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;

  judgement_id: number;
  a_name: string;
  c_name: string;
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
  judgement_id,
  a_name,
  c_name,
  vote,
  heaven_count,
  hell_count,
  img,
}: VoteProps) => {
  // 로그인한 유저 정보 가져오기
  const { mutate: getUser, data: userData } = useGetUserMutation();
  const currentUserId = userData?.data?.userId || '';

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      getLike({ judgement_id, user_id: currentUserId });
    }
  }, [currentUserId]);

  const [isHeaven, setIsHeaven] = useState(false);
  const [isHell, setIsHell] = useState(false);

  const [Like, setLike] = useState(like);

  const count = useAtomValue(Event_Count);
  const count_p = useAtomValue(Event_Past);
  const set_count_p = useSetAtom(Event_Past);
  const Set_open_vote = useSetAtom(Open_Vote);

  const { mutate: postLike } = usepostJudgementLike();
  const { mutate: deleteLike } = usedeleteJudgementLike();
  const { mutate: getLike } = usegetJudgementLike();

  const [currentHeart, setHeart] = useState(empty_heart);

  const { mutate: postVote } = usePostVote();
  const { mutate: getVoteDirection } = useGetVoteDirection();
  const { mutate: deleteVote } = useDeleteVote();

  useEffect(() => {
    if (count != count_p) {
      pop();
      set_count_p(count);
    }
  }, [count]);

  useEffect(() => {
    if (currentUserId) {
      Set_open_vote(true);
      getVoteDirection(
        { judgement_id, user_id: currentUserId },
        {
          onSuccess: (data) => {
            console.log(data.data);
            if (data.data == false) {
              setIsHell(true);
              setIsHeaven(false);
            } else if (data.data == true) {
              setIsHell(false);
              setIsHeaven(true);
            } else {
              setIsHell(false);
              setIsHeaven(false);
            }
          },
        },
      );
      getLike(
        { judgement_id, user_id: currentUserId },
        {
          onSuccess: (data) => {
            setHeart(data.data ? heart : empty_heart);
          },
        },
      );
    }
  }, [currentUserId]);

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
              if (isHell == true) {
                deleteVote(
                  { judgement_id, user_id: currentUserId },
                  {
                    onSuccess: () => {
                      postVote({ judgement_id: judgement_id, isHeaven: true, user_id: currentUserId });
                    },
                  },
                );
              } else {
                postVote({ judgement_id: judgement_id, isHeaven: true, user_id: currentUserId });
              }

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
              if (isHeaven == true) {
                deleteVote(
                  { judgement_id, user_id: currentUserId },
                  {
                    onSuccess: () => {
                      postVote({ judgement_id: judgement_id, isHeaven: false, user_id: currentUserId });
                    },
                  },
                );
              } else {
                postVote({ judgement_id: judgement_id, isHeaven: false, user_id: currentUserId });
              }

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
            <_.CName>{c_name}</_.CName>
            <_.AName>{a_name}</_.AName>
            <_.Interact>
              <_.LikeImg
                src={currentHeart}
                onClick={() => {
                  currentHeart == heart
                    ? (deleteLike({ judgement_id, user_id: currentUserId }), setLike(Like - 1))
                    : (postLike({ judgement_id, user_id: currentUserId }), setLike(Like + 1));
                  setHeart(currentHeart === heart ? empty_heart : heart);
                }}
              ></_.LikeImg>
              <_.LikeText>{Like}</_.LikeText>
            </_.Interact>
          </_.Name_Div>
        </_.Info>
      </_.Main_Display>
    </_.Container>
  );
};

export default Judgement_Vote;
