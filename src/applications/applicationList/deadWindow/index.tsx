import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useAtomValue } from 'jotai';
import { isNotificationWindow3OpenAtom } from '@/atoms/notificationPosition';

interface Today_Deceased{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const deadWindow = ({window,setWindow}:Today_Deceased) => {

const isNotificationWindow3Open = useAtomValue(isNotificationWindow3OpenAtom);

    useEffect(() => {
        setWindow({
            ...window,
            top: isNotificationWindow3Open ? 414 : 218,
            left: 885
        });
    }, [isNotificationWindow3Open])


    return (
        <_.Main onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}><_.Main_Text>오늘의 조문객은 _ _ _ 입니다.</_.Main_Text></_.Main>
    );
}

export default deadWindow

