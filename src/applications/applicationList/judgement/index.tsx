import Inputs from '@/applications/components/inputs';
import * as _ from './style';
import { useEffect, useState } from 'react';
import FilterBlock from '@/applications/components/filterBlock';
import MemorialBtn from '@/applications/components/memorialBtn';
import Judgement_Object from '@/applications/components/judgementObject';
import hosino from '@/assets/character/hosino.svg';
import { useAtomValue, useSetAtom } from 'jotai';
import { select_chat } from '@/applications/components/judgementChatObj/state_manager';
import { useGetJudgementList } from '@/api/judgement/judgementList';
import { judgementLoadingCount } from '@/applications/components/judgementObject/load_state';
import Loading from '@/applications/components/loading';

interface JudgementProps {
  stack: any[];
  push: any;
  pop: any;
  top: any;
}

const sort = ['최신순', '인기순'];

const Judgement = ({ stack, push, pop, top }: JudgementProps) => {
  const [Judgement_List, setJL] = useState([]);
  const [rawData, setRawData] = useState([]); // 원본 데이터 보관

  const { mutate: getList } = useGetJudgementList();

  const [text, setText] = useState('');

  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState('인기순');

  const set_selected = useSetAtom(select_chat);

  const judgementLoadCount = useAtomValue(judgementLoadingCount);

  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [size, setSize] = useState(5);

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
          is_search: false,
          created_at: item.createdAt, // 생성일 추가
        }));

        setRawData(mapped); // 원본 데이터 저장
      },
    });
  }, [stack]);

  // choice가 변경될 때마다 정렬 수행
  useEffect(() => {
    if (rawData.length === 0) return;

    let sorted;
    if (choice === '인기순') {
      // 좋아요 + 투표 기준 내림차순 정렬
      sorted = [...rawData].sort((a: any, b: any) => b.like + b.vote - (a.like + a.vote));
    } else if (choice === '최신순') {
      // 생성일 기준 내림차순 정렬 (최신이 먼저)
      sorted = [...rawData].sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    // rank 부여
    const ranked = sorted.map((item: any, index: any) => ({
      ...item,
      rank: index + 1,
    }));

    setJL(ranked);
  }, [rawData, choice]);

  // maxPage 계산 - Judgement_List와 text가 변경될 때마다 재계산
  useEffect(() => {
    if (Judgement_List.length === 0) {
      setMaxPage(1);
      return;
    }

    const filtered = Judgement_List.filter((item: any) => {
      if (text) {
        return item.c_name && item.c_name.includes(text);
      }
      return true;
    });

    // 각 섹션별 아이템 개수 계산
    const popularCount = filtered.filter(
      (item: any) => item.rank <= 3 && item.is_end === false,
    ).length;
    const normalCount = filtered.filter(
      (item: any) => item.rank > 3 && item.is_end === false,
    ).length;
    const endedCount = filtered.filter((item: any) => item.is_end === true).length;

    // 전체 아이템 개수
    const totalCount = popularCount + normalCount + endedCount;

    setMaxPage(Math.max(1, Math.ceil(totalCount / size)));
  }, [Judgement_List, text, size]);

  // 검색어나 정렬 방식이 바뀌면 1페이지로 리셋
  useEffect(() => {
    setPageNumber(1);
  }, [text, choice]);

  // 검색 필터 적용
  useEffect(() => {
    setJL((prevList: any) =>
      prevList.map((item: any) => ({
        ...item,
        is_search: text ? (item.c_name ? item.c_name.includes(text) : false) : false,
      })),
    );
  }, [text]);

  // 필터링된 전체 리스트 가져오기 (섹션 구분 없이 전체)
  const getAllFilteredItems = () => {
    const filtered = Judgement_List.filter((item) => {
      const anySearch = Judgement_List.some((i) => i.is_search);
      if (anySearch) return item.is_search;
      return true;
    });

    // 인기재판 + 재판 + 종료된 재판을 순서대로 합침
    const popular = filtered.filter((item) => item.rank <= 3 && item.is_end === false);
    const normal = filtered.filter((item) => item.rank > 3 && item.is_end === false);
    const ended = filtered.filter((item) => item.is_end === true);

    return [...popular, ...normal, ...ended];
  };

  // 전체 아이템 리스트
  const allItems = getAllFilteredItems();

  // 현재 페이지에 표시할 아이템들
  const startIndex = (pageNumber - 1) * size;
  const endIndex = startIndex + size;
  const currentPageItems = allItems.slice(startIndex, endIndex);

  // 각 섹션별로 현재 페이지의 아이템 분리
  const popularList = currentPageItems.filter((item) => item.rank <= 3 && item.is_end === false);
  const normalList = currentPageItems.filter((item) => item.rank > 3 && item.is_end === false);
  const endedList = currentPageItems.filter((item) => item.is_end === true);

  return (
    <_.Container>
      {judgementLoadCount !== 0 && (
        <_.loadingBack>
          <Loading
            overlay={true}
            text="데이터를 불러오는 중..."
          />
        </_.loadingBack>
      )}
      <_.Top>
        <_.Top_Text>** 인기재판은 실시간으로 1시간 마다 갱신됩니다. **</_.Top_Text>
        <_.Search_div>
          <Inputs
            width="100%"
            type="text"
            value={text}
            setValue={(value) => {
              setText(value);
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
            {popularList.map((item) => {
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
            {normalList.map((item) => {
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
            {endedList.map((item) => {
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
      <_.Paging>
        <MemorialBtn
          name="1"
          selected={false}
          type="menu"
          onClick={() => setPageNumber(1)}
          active={true}
          width="32px"
          height="32px"
          fontSize="16px"
        />
        <_.PagingGap>...</_.PagingGap>
        <MemorialBtn
          name={`${pageNumber - 1}`}
          selected={false}
          type={pageNumber === 1 ? 'hidden' : 'menu'}
          onClick={() => setPageNumber(pageNumber - 1)}
          active={true}
          width="32px"
          height="32px"
          fontSize="16px"
        />
        <MemorialBtn
          name={`${pageNumber}`}
          selected={true}
          type="menu"
          onClick={() => setPageNumber(pageNumber)}
          active={true}
          width="32px"
          height="32px"
          fontSize="16px"
        />
        <MemorialBtn
          name={`${pageNumber + 1}`}
          selected={false}
          type={pageNumber === maxPage ? 'hidden' : 'menu'}
          onClick={() => setPageNumber(pageNumber + 1)}
          active={true}
          width="32px"
          height="32px"
          fontSize="16px"
        />
        <_.PagingGap>...</_.PagingGap>
        <MemorialBtn
          name={`${maxPage}`}
          selected={false}
          type="menu"
          onClick={() => setPageNumber(maxPage)}
          active={true}
          width="32px"
          height="32px"
          fontSize="16px"
        />
      </_.Paging>
    </_.Container>
  );
};

export default Judgement;
