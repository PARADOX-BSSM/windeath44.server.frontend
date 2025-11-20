import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useGetMemorialIdByCommentsCount } from '@/api/notification/getMemorialIdByCommentsCount';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

interface Today_Deceased{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const memorialWindow = ({window,setWindow}:Today_Deceased) => {

// API 호출: 오늘의 인기 추모관 데이터 조회
const { data: memorialData, isLoading, isError } = useGetMemorialIdByCommentsCount();
// taskTransform: 추모관으로 이동하기 위한 함수
const taskTransform = useAtomValue(taskTransformerAtom);

const customWindow={...window, top:114, left:885 }
    useEffect(()=>{setWindow(customWindow)},[])

    const getMemorialText = () => {
        if (isLoading) return "오늘의 인기 추모관을 조회중입니다.";
        if (isError) return "추모관 정보를 불러올 수 없습니다.";
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
        const memorialId = memorialData?.memorialId || memorialData?.id;
        const characterId = memorialData?.characterId;
        const characterName = memorialData?.characterName || memorialData?.name;

        // memorialId 또는 characterId가 있을 때만 추모관으로 이동
        if ((memorialId || characterId) && taskTransform) {
            taskTransform('', '추모관 뷰어', {
                memorialId: memorialId,
                characterId: characterId,
                characterName: characterName,
            });
        }
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