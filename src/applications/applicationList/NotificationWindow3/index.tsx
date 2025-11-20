import { useEffect } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'

interface Today_Anniversary2{
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
    stack?: any[],
    push?: any
    pop?: any,
    top?: any,
}

const NotificationWindow3 = ({window,setWindow}:Today_Anniversary2) => {

const customWindow={...window, top:10, left:885 }
    useEffect(()=>{setWindow(customWindow)},[])


    return (
        <_.Main onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}><_.Main_Text>오늘의 고인은 _ _ _ 입니다.</_.Main_Text></_.Main>
    );
}

export default NotificationWindow3

