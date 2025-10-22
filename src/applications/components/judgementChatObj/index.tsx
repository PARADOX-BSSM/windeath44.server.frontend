import * as _ from './style.ts';
import ame from '@/assets/profile/ame.svg';

import heart from '@/assets/community/Community_Heart.svg';
import empty_heart from '@/assets/community/Empty_Heart.svg';
import chat_box from '@/assets/community/Chat.svg';
import { useEffect, useRef, useState } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { chat_num, select_chat } from './state_manager.ts';

interface JudgementChatProps {
  id: number;
  user_name: string;
  user_id: string;
  body: string;
  profile: string;

  likes_count: number;

  child_chat: number;
  parent_comment_id: number | null;

  created_at?: Date;
  updated_at?: Date;
}

/* text 30글짜 까지 허용 */

const JudgementChatObj = ({
  user_id,
  user_name,
  body,
  profile,
  likes_count,
  id,
  child_chat,
  parent_comment_id,
}: JudgementChatProps) => {
  const [like_img, setLikeImg] = useState(empty_heart);
  const [isEmpty, setIsEmpty] = useState(true);

  const set_selected = useSetAtom(select_chat);
  const select = useAtomValue(select_chat);
  const set_chat_num = useSetAtom(chat_num);
  const chat_count = useAtomValue(chat_num);

  // 스크롤 가능한 부모 객체 찾기
  const selfRef = useRef(null);
  const getNearestScrollableParent = (node: HTMLElement | null): HTMLElement | null => {
    if (!node) return null;

    const overflowY = window.getComputedStyle(node).overflowY;
    const isScrollable = overflowY === 'auto' || overflowY === 'scroll';

    if (isScrollable) {
      return node;
    }

    return getNearestScrollableParent(node.parentElement);
  };

  useEffect(() => {
    if (isEmpty === true) {
      setLikeImg(empty_heart);
    } else {
      setLikeImg(heart);
    }
  }, [isEmpty]);

  return (
    <_.Main_Div>
      {parent_comment_id !== null ? (
        <_.Child_User_Div>
          <_.Profile src={profile} />

          <_.Sep_Profile>
            <_.User_Info>
              <_.UserName>{user_name}</_.UserName>
              <_.UserId>@{user_id}</_.UserId>
            </_.User_Info>
            <_.Text>{body}</_.Text>
          </_.Sep_Profile>
        </_.Child_User_Div>
      ) : (
        <_.User_Div>
          <_.Profile src={profile} />

          <_.Sep_Profile>
            <_.User_Info>
              <_.UserName>{user_name}</_.UserName>
              <_.UserId>@{user_id}</_.UserId>
            </_.User_Info>
            <_.Text>{body}</_.Text>
          </_.Sep_Profile>
        </_.User_Div>
      )}

      <_.Int_Div>
        <_.Like_Div>
          <_.Like_Img
            src={like_img}
            onClick={() => {
              setIsEmpty(!isEmpty);
            }}
          ></_.Like_Img>
          <_.Like_Text_Div>
            <_.Like>{likes_count}</_.Like>
          </_.Like_Text_Div>
        </_.Like_Div>
        {parent_comment_id == null ? (
          <_.Child_Chat_Div ref={selfRef}>
            <_.Child_Chat_Img
              src={chat_box}
              onClick={() => {
                let parent: any = getNearestScrollableParent(selfRef.current);

                if (select === id) {
                  set_selected(-1);
                  set_chat_num(0);
                } else {
                  set_selected(id);
                  set_chat_num(child_chat);
                  parent.scrollBy({ top: -(chat_count * 70) });
                }
              }}
            />
            <_.Child_Chat_Text_Div>
              <_.Child_Chat>{child_chat}</_.Child_Chat>
            </_.Child_Chat_Text_Div>
          </_.Child_Chat_Div>
        ) : null}
      </_.Int_Div>
    </_.Main_Div>
  );
};

export default JudgementChatObj;
