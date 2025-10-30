import { TaskType } from '@/modules/typeModule.tsx';
import { useAtom } from 'jotai';
import { taskManagerAtom, lastTaskListAtom, windowPositionsAtom, SavedTaskType } from '@/atoms/processManager.ts';
import { useEffect, useRef } from 'react';

const useProcessManager: () => [
  TaskType[],
  (component: TaskType) => void,
  (component: TaskType) => void,
] = () => {
  const [taskList, setTaskList] = useAtom(taskManagerAtom);
  const [, setLastTaskList] = useAtom(lastTaskListAtom);
  const [windowPositions] = useAtom(windowPositionsAtom);
  const isInitialMount = useRef(true);

  // taskList가 변경될 때마다 localStorage에 저장 (단, 초기 마운트는 제외)
  useEffect(() => {
    // 초기 마운트 시에는 저장하지 않음 (기존 데이터 보존)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log('[ProcessManager] Initial mount - skipping save');
      return;
    }

    // 복원하지 않을 페이지 목록
    const excludedPages = [
      'MemorialApply',
      '추모관 수정',
      '미리보기',
      '로그인',
      '회원가입',
      '이메일 인증',
      '인증코드 입력',
      '비밀번호 재설정',
      '공지사항',
      '공지사항 뷰어',
    ];

    const savedTasks: SavedTaskType[] = taskList
      .filter((task) =>
        task.type === 'App' &&
        !task.instanceId &&
        !excludedPages.includes(task.name) // 제외 목록에 없는 것만 저장
      )
      .map((task) => ({
        type: task.type,
        id: task.id,
        name: task.name,
        position: windowPositions[task.name], // 위치 정보도 함께 저장
      }));
    console.log('[ProcessManager] Saving tasks to localStorage:', savedTasks);
    setLastTaskList(savedTasks);
  }, [taskList, windowPositions, setLastTaskList]);

  const addTask = (component: TaskType) => {
    setTaskList((Task) =>
      !Task.some((item) => item.name === component.name && item.name !== '추모관 뷰어')
        ? [...Task, component]
        : [...Task],
    );
  };
  const removeTask = (component: TaskType) => {
    setTaskList((Task) =>
      Task.filter((item) =>
        item.instanceId ? item.instanceId !== component.instanceId : item.name !== component.name,
      ),
    );
  };
  return [taskList, addTask, removeTask];
};

export { useProcessManager };
