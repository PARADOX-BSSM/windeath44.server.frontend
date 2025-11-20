import { useEffect, useState } from "react";
import * as _ from "./style.ts"
import {setCursorImage,CURSOR_IMAGES} from '@/lib/setCursorImg'
import { useAtomValue, useSetAtom } from "jotai";
import { taskSearchAtom } from "@/atoms/taskTransformer.ts";
import { useGetCharacterIdsByAnniversary } from '@/api/notification/getCharacterIdsByAnniversary';
import { useProcessManager } from '@/hooks/processManager';
import { isNotificationWindow3OpenAtom } from '@/atoms/notificationPosition';

interface Today_Anniversary {
    window: React.CSSProperties;
    setWindow: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
    stack : any[];
    push:any;
    top:any;
    pop:any;
}



const anniversaryWindow = ({window,setWindow,stack,push,pop,top}:Today_Anniversary) => {

const stackProps = {
    stack: stack,
    push: push,
    pop: pop,
    top: top,
}

const taskSearch = useAtomValue(taskSearchAtom);
const { data: anniversaryData, isLoading, isError } = useGetCharacterIdsByAnniversary();
const [taskList, addTask, removeTask] = useProcessManager();
const [currentIndex, setCurrentIndex] = useState(0);
const setIsNotificationWindow3Open = useSetAtom(isNotificationWindow3OpenAtom);

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

    const handleClick = () => {
        if (!anniversaryData || !Array.isArray(anniversaryData) || anniversaryData.length === 0 || isLoading || isError) {
            return;
        }

        // 현재 태스크(오늘의 기일) 찾기
        const currentTask = taskList.find(task => task.name === '오늘의 기일');

        // 새 태스크(기일 상세) 찾기
        const newTask = taskSearch?.('기일 상세', stackProps);

        // 교체: 새 태스크 추가하고 현재 태스크 제거
        if (newTask) {
            addTask(newTask);
            setIsNotificationWindow3Open(true);
        }
        if (currentTask) {
            removeTask(currentTask);
        }
    }

    const hasAnniversary = anniversaryData && Array.isArray(anniversaryData) && anniversaryData.length > 0 && !isLoading && !isError;

    return (
        <_.Main
            onMouseEnter={() => setCursorImage(hasAnniversary ? CURSOR_IMAGES.hand : CURSOR_IMAGES.default)}
            onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
            style={{ cursor: hasAnniversary ? 'pointer' : 'default' }}
        >
            <_.Main_Text onClick={handleClick}>
                {renderAnniversaryText()}
            </_.Main_Text>
        </_.Main>
    );
}

export default anniversaryWindow
