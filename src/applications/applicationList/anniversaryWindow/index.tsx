import { useEffect, useState } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useGetCharacterIdsByAnniversary } from '@/api/notification/getCharacterIdsByAnniversary';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

interface Today_Anniversary {
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}



const anniversaryWindow = ({window,setWindow}:Today_Anniversary) => {

// API 호출: 오늘의 기일 데이터 조회
const { data: anniversaryData, isLoading, isError } = useGetCharacterIdsByAnniversary();

// 현재 캐러셀에서 보여줄 인덱스 관리
const [currentIndex, setCurrentIndex] = useState(0);

// taskTransform: 추모관으로 이동하기 위한 함수
const taskTransform = useAtomValue(taskTransformerAtom);

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
        if (isLoading) return "오늘의 기일자를 조회중입니다.";
        if (isError) return "오늘의 기일자 정보를 불러올 수 없습니다.";
        
        if (!anniversaryData || !Array.isArray(anniversaryData) || anniversaryData.length === 0) return "오늘은 기일이 없습니다.";

        const characterName = getCharacterName();
        return `오늘은 ${characterName}의 기일입니다.`;
    }

    // 알림창 클릭 시 해당 고인의 추모관으로 이동하는 함수
    const handleNavigateToMemorial = () => {
        // 데이터가 없거나 로딩 중이거나 에러인 경우 클릭 이벤트 무시
        if (!anniversaryData || !Array.isArray(anniversaryData) || anniversaryData.length === 0 || isLoading || isError) {
            return;
        }

        // 현재 보여지고 있는 고인 데이터 가져오기
        const currentCharacter = anniversaryData[currentIndex];

        // 고인의 ID와 이름 추출
        const characterId = currentCharacter?.id || currentCharacter?.characterId;
        const characterName = currentCharacter?.name || currentCharacter?.characterName;

        // characterId가 있을 때만 추모관으로 이동
        if (characterId && taskTransform) {
            taskTransform('', '추모관 뷰어', {
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
            <_.Main_Text>
                {renderAnniversaryText()}
            </_.Main_Text>
        </_.Main>
    );
}

export default anniversaryWindow
