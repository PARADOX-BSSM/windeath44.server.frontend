import { useEffect, useState } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useGetCharacterIdsByAnniversary } from '@/api/notification/getCharacterIdsByAnniversary';

interface Today_Anniversary {
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}



const anniversaryWindow = ({window,setWindow}:Today_Anniversary) => {

const { data: anniversaryData, isLoading, isError } = useGetCharacterIdsByAnniversary();
const [currentIndex, setCurrentIndex] = useState(0);

const customWindow={...window, top:10, left:885 }
    useEffect(()=>{setWindow(customWindow)},[])

    // 캐러셀 자동 회전
    useEffect(() => {
        if (!anniversaryData || !Array.isArray(anniversaryData) || anniversaryData.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % anniversaryData.length);
        }, 3500); 

        return () => clearInterval(interval);
    }, [anniversaryData]);

    const getCharacterName = () => {
        if (!anniversaryData || !Array.isArray(anniversaryData) || anniversaryData.length === 0) return null;

        const currentCharacter = anniversaryData[currentIndex];
        return currentCharacter?.name || currentCharacter?.characterName || "알 수 없음";
    }

    const renderAnniversaryText = () => {
        if (isLoading) return "오늘은 _ _ _의 기일입니다.";
        if (isError) return "기일 정보를 불러올 수 없습니다.";
        if (!anniversaryData || !Array.isArray(anniversaryData) || anniversaryData.length === 0) return "오늘은 기일이 없습니다.";

        const characterName = getCharacterName();
        return `오늘은 ${characterName}의 기일입니다.`;
    }

    return (
        <_.Main
            onMouseEnter={() => setCursorImage(CURSOR_IMAGES.default)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
        >
            <_.Main_Text>
                {renderAnniversaryText()}
            </_.Main_Text>
        </_.Main>
    );
}

export default anniversaryWindow
