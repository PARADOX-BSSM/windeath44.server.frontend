import Inputs from '@/applications/components/inputs';
import * as _ from './style';
import { useEffect, useState } from 'react';
import FilterBlock from '@/applications/components/filterBlock';
import MemorialBtn from '@/applications/components/memorialBtn';
import Judgement_Object from '@/applications/components/judgementObject';
import hosino from '@/assets/character/hosino.svg';
import { useSetAtom } from 'jotai';
import { select_chat } from '@/applications/components/judgementChatObj/state_manager';
import { useGetJudgementList } from '@/api/judgement/judgementList';

interface JudgementProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const sort = ['최신순', '인기순'];

/* api 로 재판 목록 불러와야함 */

const Judgement = ({ stack, push, pop, top }: JudgementProps) => {
  const [Judgement_List, setJL] = useState([]);

  const { mutate: getList } = useGetJudgementList();

  const [text, setText] = useState('');

  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState('인기순');

  const set_selected = useSetAtom(select_chat);

  useEffect(() => {
    set_selected(-1);
  }, []);

  useEffect(() => {
    getList(undefined, {
      onSuccess: (data) => {
        const content = data.data.judgments ?? [];

        // 서버 데이터 구조를 미리보기 형태로 변환
        const mapped = content.map((item: any) => ({
          id: item.judgmentId,
          characterId: item.characterId,
          c_name: null,
          a_name: null,
          img: null,
          like: item.likesCount,
          vote: (item.heavenCount || 0) + (item.hellCount || 0),
          heaven_count: item.heavenCount,
          hell_count: item.hellCount,
          is_end: item.isEnd ?? false,
          isSearch: false,
        }));

        // 좋아요 + 투표 기준 내림차순 정렬
        const sorted = mapped.sort((a: any, b: any) => b.like + b.vote - (a.like + a.vote));

        // rank 부여
        const ranked = sorted.map((item: any, index: any) => ({
          ...item,
          rank: index + 1,
        }));

        // 상태 업데이트
        setJL(ranked);
      },
    });
  }, [stack]);

  return (
    <_.Container>
      <_.Top>
        <_.Top_Text>** 인기재판은 실시간으로 1시간 마다 갱신됩니다. **</_.Top_Text>
        <_.Search_div>
          <Inputs
            width="100%"
            type="text"
            value={text}
            setValue={(value) => {
              setText(value);

              setJL((prevList: any) =>
                prevList.map((item: any) => ({
                  ...item,
                  // c_name에 value가 포함되면 isSearch를 true, 아니면 false
                  isSearch: value ? item.c_name.includes(value) : false,
                })),
              );
            }}
            placeHold="캐릭터 이름으로 검색"
          />
          <MemorialBtn
            name="검색"
            width="70px"
            height="100%"
            fontSize="14px"
            type="menu"
            active={true}
            onClick={() => {}}
          />
        </_.Search_div>
        <_.Select>
          <FilterBlock
            label=""
            option={choice}
            isOpen={open}
            onClick={() => {
              setOpen(!open);
            }}
            list={sort}
            onChange={(value) => {
              setChoice(value);
              setOpen(false);
            }}
          />
        </_.Select>
      </_.Top>
      <_.Main_Display>
        <_.Judgement_List>
          <_.Sort>인기재판</_.Sort>
          <_.Obj_Div>
            {Judgement_List.filter((item) => {
              const anySearch = Judgement_List.some((i) => i.isSearch); // 하나라도 검색된 항목 있는지
              if (anySearch) return item.isSearch && item.rank <= 3 && item.is_end === false; // 있으면 isSearch true만
              return item.rank <= 3 && item.is_end === false; // 없으면 기존 필터
            }).map((item) => {
              return (
                <Judgement_Object
                  key={item.id}
                  judgement_id={item.id}
                  rank={item.rank}
                  c_id={item.characterId}
                  c_name=""
                  a_name=""
                  img={undefined}
                  like={item.like}
                  vote={item.vote}
                  heaven_count={item.heaven_count}
                  hell_count={item.hell_count}
                  stack={stack}
                  push={push}
                  pop={pop}
                  top={top}
                />
              );
            })}
          </_.Obj_Div>

          <_.Sort>재판</_.Sort>

          <_.Obj_Div>
            {Judgement_List.filter((item) => {
              const anySearch = Judgement_List.some((i) => i.isSearch); // 하나라도 검색된 항목 있는지
              if (anySearch) return item.isSearch && item.rank > 3 && item.is_end === false; // 있으면 isSearch true만
              return item.rank > 3 && item.is_end === false; // 없으면 기존 필터
            }).map((item) => {
              return (
                <Judgement_Object
                  key={item.id}
                  judgement_id={item.id}
                  rank={item.rank}
                  c_id={item.characterId}
                  c_name=""
                  a_name=""
                  img={undefined}
                  like={item.like}
                  vote={item.vote}
                  heaven_count={item.heaven_count}
                  hell_count={item.hell_count}
                  stack={stack}
                  push={push}
                  pop={pop}
                  top={top}
                />
              );
            })}
          </_.Obj_Div>

          <_.Sort>종료된 재판</_.Sort>

          <_.Obj_Div>
            {Judgement_List.filter((item) => {
              const anySearch = Judgement_List.some((i) => i.isSearch); // 하나라도 검색된 항목 있는지
              if (anySearch) return item.isSearch && item.is_end === true; // 있으면 isSearch true만
              return item.is_end === true; // 없으면 기존 필터
            }).map((item) => {
              return (
                <Judgement_Object
                  key={item.id}
                  judgement_id={item.id}
                  rank={item.rank}
                  c_id={item.characterId}
                  c_name=""
                  a_name=""
                  img={undefined}
                  like={item.like}
                  vote={item.vote}
                  heaven_count={item.heaven_count}
                  hell_count={item.hell_count}
                  stack={stack}
                  push={push}
                  pop={pop}
                  top={top}
                />
              );
            })}
          </_.Obj_Div>
        </_.Judgement_List>
      </_.Main_Display>
    </_.Container>
  );
};

export default Judgement;
