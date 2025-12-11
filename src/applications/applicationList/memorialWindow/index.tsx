import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useGetMemorialIdByCommentsCount } from '@/api/notification/getMemorialIdByCommentsCount';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { useGetMemorialsCharacterFilteredQuery } from '@/api/memorial/getMemorialsCharacterFiltered';

interface Today_Deceased{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const memorialWindow = ({window,setWindow}:Today_Deceased) => {

// API 호출: 오늘의 인기 추모관 데이터 조회
const { data: memorialDataResponse, isLoading, isError } = useGetMemorialIdByCommentsCount();
// taskTransform: 추모관으로 이동하기 위한 함수
const taskTransform = useAtomValue(taskTransformerAtom);
const setAlert = useAtomValue(alerterAtom);

// API가 배열로 반환할 경우 첫 번째(댓글이 가장 많은) 추모관 선택
const memorialDataArray = memorialDataResponse?.data || memorialDataResponse;
const memorialData = Array.isArray(memorialDataArray) ? memorialDataArray[0] : memorialDataArray;

// 현재 추모관의 캐릭터 ID 가져오기
const currentCharacterId = memorialData?.characterId;

// 캐릭터 ID로 추모관 조회
const { data: memorialsData } = useGetMemorialsCharacterFilteredQuery({
    orderBy: 'recently-updated',
    page: 1,
    characters: currentCharacterId ? [currentCharacterId] : [],
    enabled: !!currentCharacterId && !isLoading && !isError,
});

const customWindow={...window, top:114, left:885 }
    useEffect(()=>{setWindow(customWindow)},[])

    const getMemorialText = () => {
        if (isLoading) return "오늘의 인기 추모관을 조회중입니다.";
        if (isError) return "추모관 정보를 불러올 수 없습니다.";

        // 배열이 비어있거나 데이터가 없는 경우
        if (!memorialData) return "오늘은 인기 추모관이 없습니다.";

        const memorialName = memorialData.characterName || memorialData.name || "알 수 없음";
        return `오늘의 인기 추모관은 ${memorialName} 입니다.`;
    }

    // 알림창 클릭 시 해당 추모관으로 이동하는 함수
    const handleNavigateToMemorial = () => {
        // 데이터가 없거나 로딩 중이거나 에러인 경우 클릭 이벤트 무시
        if (!memorialData || isLoading || isError) {
            return;
        }

        // 추모관 ID와 고인 정보 추출
        const characterId = memorialData?.characterId;

        // API 응답 구조 확인: memorialsData?.data?.values 또는 memorialsData?.data
        const memorials = memorialsData?.data?.values || memorialsData?.data || [];

        if (!Array.isArray(memorials) || memorials.length === 0) {
            setAlert?.(
                <>
                    해당 캐릭터의 추모관을 찾을 수 없습니다.
                    <br />
                    추모관이 존재하는지 확인해주세요.
                </>,
                () => {
                    taskTransform?.('경고', '');
                },
            );
            return;
        }

        // 첫 번째 추모관 사용 (캐릭터 ID로 필터링된 추모관)
        const firstMemorial = memorials[0];

        if (!firstMemorial || !firstMemorial.memorialId) {
            setAlert?.(
                <>
                    추모관 데이터를 찾을 수 없습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </>,
                () => {
                    taskTransform?.('경고', '');
                },
            );
            return;
        }

        const memorialId = firstMemorial.memorialId;

        // taskTransform 사용 (chatBot과 동일한 방식)
        taskTransform?.('', '추모관 뷰어', {
            memorialId: memorialId,
            characterId: characterId,
        });
    }

    return (
        <_.Main
            onClick={handleNavigateToMemorial}
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            style={{ cursor: 'pointer' }}
        >
            <_.Main_Text>{getMemorialText()}</_.Main_Text>
        </_.Main>
    );
}



export default memorialWindow