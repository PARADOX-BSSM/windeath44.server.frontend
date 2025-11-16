import * as _ from './style.ts';
import { ChatList } from './chat_list.ts';
import { useEffect, useRef, useState } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn/index.tsx';
import FilterBlock from '@/applications/components/filterBlock/index.tsx';
import JudgementChatObj from '@/applications/components/judgementChatObj/index.tsx';
import { useAtomValue } from 'jotai';
import { chat_num, select_chat } from '@/applications/components/judgementChatObj/state_manager.ts';
import { useGetJudgementChats } from '@/api/judgement/judgementChat.ts';

const sort = ['최신', '인기'];

interface judgementChatProps {
  judgement_id: number;
}

const JudgementChat = ({ judgement_id }: judgementChatProps) => {
  const [ChatList, setChatList] = useState([]);
  const { mutate: getChats, data } = useGetJudgementChats();

  useEffect(() => {
    getChats(
      { judgement_id },
      {
        onSuccess: (data) => {
          console.log(data.data);
          setChatList(data.data);
        },
      },
    );
  }, []);

  const chat_list = ChatList.sort((a, b) => {
    const aKey = a.parentCommentId ?? a.commentId; // parent_id가 null이면 id 사용
    const bKey = b.parentCommentId ?? b.commentId;

    // 1차 기준: parent_id 또는 id
    if (aKey !== bKey) return aKey - bKey;

    // 2차 기준: id (같은 그룹 내에서 id 오름차순)
    return a.commentId - b.commentId;
  });

  const scroll_ref = useRef(null);

  const select = useAtomValue(select_chat);
  const chat_count = useAtomValue(chat_num);

  useEffect(() => {
    if (select != -1) {
      console.log(chat_count);
      scroll_ref.current.scrollTo();
    }
  }, [select]);

  const [input_value, set_input_value] = useState('');

  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState('최신');
  const selected = useAtomValue(select_chat);

  return (
    <_.Container>
      <_.Input_Sep>
        <_.Chat_Back>
          <_.Title_Div>
            <_.Title_Text>배심원 토의</_.Title_Text>
            <_.Select_Div>
              <FilterBlock
                label=""
                option={choice}
                isOpen={open}
                list={sort}
                onChange={(e) => {
                  setChoice(e);
                  setOpen(false);
                }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </_.Select_Div>
          </_.Title_Div>

          <_.Discussion ref={scroll_ref}>
            {chat_list
              .filter(
                (item) =>
                  (judgement_id === item.judgmentId && item.parentCommentId == null) ||
                  selected === item.parentCommentId,
              )
              .map((item) => {
                return (
                  <JudgementChatObj
                    user_id={item.userId}
                    user_name={item.name}
                    id={item.commentId}
                    body={item.body}
                    profile={item.profile}
                    likes_count={item.likesCount}
                    parent_comment_id={item.parentCommentId}
                    child_chat={0}
                  />
                );
              })}
          </_.Discussion>
        </_.Chat_Back>

        <_.Input_Div>
          <_.Input
            placeholder="댓글을 입력하세요"
            onChange={(value) => {
              set_input_value(value.target.value);
            }}
          ></_.Input>
          <_.Submit_Btn>
            <MemorialBtn
              name="게시"
              type="menu"
              width="46px"
              height="22px"
              fontSize="11px"
            />
          </_.Submit_Btn>
        </_.Input_Div>
      </_.Input_Sep>
    </_.Container>
  );
};

export default JudgementChat;
