import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useAtomValue } from 'jotai';
import { isNotificationWindow3OpenAtom } from '@/atoms/notificationPosition';
import { usegetUserNameByLikeCount } from '@/api/notification/getUserNameByLikeCount';

interface Today_Deceased{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const deadWindow = ({window,setWindow}:Today_Deceased) => {

const isNotificationWindow3Open = useAtomValue(isNotificationWindow3OpenAtom);
const { data: userData, isLoading, isError } = usegetUserNameByLikeCount();

    useEffect(() => {
        setWindow({
            ...window,
            top: isNotificationWindow3Open ? 414 : 218,
            left: 885
        });
    }, [isNotificationWindow3Open])

    const getUserText = () => {
        if (isLoading) return "오늘의 조문객을 조회중입니다.";
        if (isError) return "조문객 정보를 불러올 수 없습니다.";
        if (!userData) return "오늘은 조문객이 없습니다.";

        const userName = userData.username || userData.name || "알 수 없음";
        return `오늘의 조문객은 ${userName} 입니다.`;
    }

    return (
        <_.Main onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}><_.Main_Text>{getUserText()}</_.Main_Text></_.Main>
    );
}

export default deadWindow

