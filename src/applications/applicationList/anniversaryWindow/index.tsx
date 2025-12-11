import { useEffect, useState } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useGetCharacterIdsByAnniversary } from '@/api/notification/getCharacterIdsByAnniversary';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { alerterAtom } from '@/atoms/alerter';
import { useGetMemorialsCharacterFilteredQuery } from '@/api/memorial/getMemorialsCharacterFiltered';

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
const setAlert = useAtomValue(alerterAtom);

// 현재 선택된 캐릭터의 ID 가져오기
const currentCharacter = anniversaryData?.[currentIndex];
const currentCharacterId = currentCharacter?.id || currentCharacter?.characterId;

// 캐릭터 ID로 추모관 조회
const { data: memorialsData } = useGetMemorialsCharacterFilteredQuery({
    orderBy: 'recently-updated',
    page: 1,
    characters: currentCharacterId ? [currentCharacterId] : [],
    enabled: !!currentCharacterId && !isLoading && !isError,
});

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

        // 고인의 ID와 이름 추출
        const characterId = currentCharacter?.id || currentCharacter?.characterId;
        const characterName = currentCharacter?.name || currentCharacter?.characterName;

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
            <_.Main_Text>
                {renderAnniversaryText()}
            </_.Main_Text>
        </_.Main>
    );
}

export default anniversaryWindow
