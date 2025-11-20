import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useGetMemorialIdByCommentsCount } from '@/api/notification/getMemorialIdByCommentsCount';

interface Today_Deceased{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const memorialWindow = ({window,setWindow}:Today_Deceased) => {

const { data: memorialData, isLoading, isError } = useGetMemorialIdByCommentsCount();

const customWindow={...window, top:114, left:885 }
    useEffect(()=>{setWindow(customWindow)},[])

    const getMemorialText = () => {
        if (isLoading) return "오늘의 인기 추모관을 조회중입니다.";
        if (isError) return "추모관 정보를 불러올 수 없습니다.";
        if (!memorialData) return "오늘의 인기 추모관이 없습니다.";

        const memorialName = memorialData.characterName || memorialData.name || "알 수 없음";
        return `오늘의 인기 추모관은 ${memorialName} 입니다.`;
    }

    return (
        <_.Main onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}><_.Main_Text>{getMemorialText()}</_.Main_Text></_.Main>
    );
}



export default memorialWindow