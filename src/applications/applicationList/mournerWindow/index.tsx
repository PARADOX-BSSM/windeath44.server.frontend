import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { usegetUserNameByLikeCount } from '@/api/notification/getUserNameByLikeCount';

interface Today_Deceased{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const mournerWindow = ({window,setWindow}:Today_Deceased) => {

// API 호출: 오늘의 조문객 데이터 조회 (오늘 하루 좋아요를 가장 많이 받은 유저)
const { data: userData, isLoading, isError } = usegetUserNameByLikeCount();

    useEffect(() => {
        setWindow({
            ...window,
            top: 126,
            left: 885
        });
    }, [])

    // 오늘의 조문객 텍스트 생성 (유저 이름만 표시)
    const getUserText = () => {
        if (isLoading) return "오늘의 조문객을 조회중입니다.";
        if (isError) return "조문객 정보를 불러올 수 없습니다.";
        if (!userData) return "오늘은 조문객이 없습니다.";

        const userName = userData.username || userData.name || "알 수 없음";
        return `오늘의 조문객은 ${userName} 입니다.`;
    }

    return (
        <_.Main
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.default)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
            <_.Main_Text>{getUserText()}</_.Main_Text>
        </_.Main>
    );
}

export default mournerWindow

