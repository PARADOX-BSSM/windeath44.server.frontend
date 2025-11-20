import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
// import { usegetUserNameByLikeCount } from '@/api/notification/getUserNameByLikeCount';

interface Today_Deceased{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const deadWindow = ({window,setWindow}:Today_Deceased) => {

// const { data: userData, isLoading, isError } = usegetUserNameByLikeCount();
// 목데이터 사용
const userData = { userName: "꿀고구마" };
const isLoading = false;
const isError = false;

const customWindow={...window, top:218, left:885 }
    useEffect(()=>{setWindow(customWindow)},[])


    const getUserText = () => {
        if (isLoading) return "오늘의 고인은 _ _ _ 입니다.";
        if (isError) return "고인 정보를 불러올 수 없습니다.";
        if (!userData) return "오늘의 인기 고인이 없습니다.";

        const userName = userData.name || userData.userName || "알 수 없음";
        return `오늘의 고인은 ${userName} 입니다.`;
    }

    return (
        <_.Main onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}><_.Main_Text>{getUserText()}</_.Main_Text></_.Main>
    );
}

export default deadWindow

