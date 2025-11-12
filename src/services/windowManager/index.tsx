import * as _ from './style.ts';
import { useEffect, useState, Suspense, lazy, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  isLogInedAtom,
  focusAtom,
  backUpFocusAtom,
  startOptionAtom,
} from '@/atoms/windowManager.ts';
import Discover from '@/applications/discover/index.tsx';
import Observer from '@/applications/utility/observer/index.tsx';
import { useProcessManager, useVirtualProcessManager } from '@/hooks/processManager.tsx';
import { TaskType } from '@/modules/typeModule.tsx';
import { getTaskCreators } from './tasks';
import { useTaskTransformFunction } from '@/hooks/taskTransformer.tsx';
import { useTaskSearchFunction } from '@/hooks/taskSearch.tsx';
import { useAlerter } from '@/hooks/alerter.tsx';
import { useNotification } from '@/hooks/notification.tsx';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg.tsx';
import { useDrag } from 'react-use-gesture';
import useApps from '@/applications/data/importManager.tsx';
import { lastTaskListAtom, windowPositionsAtom } from '@/atoms/processManager.ts';
import { useGetPublicNotificationsQuery } from '@/api/notification/getPublicNotifications';
import { notificationAtom, notificationListAtom } from '@/atoms/notification';
import { settingsAtom } from '@/atoms/settings.ts';
import { DEFAULT_NOTIFICATIONS } from '@/data/notifications.ts';

const Application = lazy(() => import('@/applications/layout/index.tsx'));

const WindowManager = () => {
  const [cursorVec, setCursorVec] = useState<number[]>([0, 0, 0, 0]);
  const [sideWidth, setSideWidth] = useState<number>(0);

  // jotai 전역 상태
  const [focus, setFocus] = useAtom(focusAtom);
  const [startOption, setStartOption] = useAtom(startOptionAtom);
  const [backUpFocus, setBackUpFocus] = useAtom(backUpFocusAtom);
  const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
  const [hydrated, setHydrated] = useState(false);
  const [lastTaskList] = useAtom(lastTaskListAtom);
  const setNotification = useAtomValue(notificationAtom);
  const setNotificationList = useSetAtom(notificationListAtom);
  const [settings] = useAtom(settingsAtom);

  const [taskList, addTask, removeTask, setVirtualWindowPosition] = useProcessManager();
  const [, , , addTaskToDesktop] = useVirtualProcessManager();
  const { logIn, signUp, emailChack, auth } = getTaskCreators(setIsLogIned, addTask, removeTask);
  const availableApps = useApps();
  const isDragging = useRef(false);
  const dragOffset = useRef([0, 0]);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const hasRestoredTasks = useRef(false);
  const hasCheckedNotification = useRef(false);

  // 공지사항 조회
  const { data: notificationsData } = useGetPublicNotificationsQuery();

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Drag 감지해서 Cursor 변경
  const bindDrag = useDrag(
    ({ dragging, movement: [mx, my] }) => {
      dragOffset.current = [mx, my];
      isDragging.current = dragging;

      const clickInProgress = clickTimeout.current !== null;
      if (dragging && !clickInProgress && isTextSelecting()) {
        setCursorImage(CURSOR_IMAGES.drag);
      } else if (!dragging && !clickInProgress) {
        setCursorImage(CURSOR_IMAGES.default);
      }
    },
    { pointer: { buttons: [1] } },
  );

  const isTextSelecting = () => {
    const selection = window.getSelection();
    return selection && selection.type === 'Range' && selection.toString().trim().length > 0;
  };
  // 포커스가 바뀔 때마다
  useEffect(() => {
    if (focus !== 'Observer') {
      setStartOption(false);
    }
  }, [focus]);
  // 태스크 리스트 복원 로직
  useEffect(() => {
    console.log('[WindowManager] Restore check:', {
      hydrated,
      hasRestoredTasks: hasRestoredTasks.current,
      isLogIned,
      lastTaskListLength: lastTaskList?.length,
      availableAppsLength: availableApps?.length,
    });

    if (!hydrated || hasRestoredTasks.current || isLogIned !== 'true') return;

    // availableApps가 준비되지 않았으면 대기
    if (!availableApps || availableApps.length === 0) {
      console.log('[WindowManager] Waiting for availableApps...');
      return;
    }

    hasRestoredTasks.current = true;

    // localStorage에서 마지막 태스크 리스트 복원
    if (lastTaskList && lastTaskList.length > 0) {
      console.log('[WindowManager] Restoring tasks:', lastTaskList);

      // 위치 정보를 windowPositionsAtom에 먼저 복원
      lastTaskList.map((tasks, index) => {
        const positions: Record<
          string,
          { top: number; left: number; width: number; height: number }
        > = {};
        tasks.forEach((savedTask) => {
          if (savedTask.position) {
            positions[savedTask.name] = savedTask.position;
            console.log(
              '[WindowManager] Will restore position for',
              savedTask.name,
              ':',
              savedTask.position,
            );
          }
        });
        setVirtualWindowPosition(positions, index);
        console.log('[WindowManager] Set windowPositions to:', positions);
      });

      // setTimeout 전에 positions 설정하고 확인

      // 위치 설정 후 조금 기다렸다가 앱 추가
      setTimeout(() => {
        console.log('[WindowManager] Now adding tasks...');
        lastTaskList.map((tasks) =>
          tasks.forEach((savedTask) => {
            const app = availableApps.find(
              (availableApp) =>
                availableApp.id === savedTask.id && availableApp.name === savedTask.name,
            );
            console.log(
              '[WindowManager] Looking for app:',
              savedTask.name,
              'Found:',
              app ? 'YES' : 'NO',
            );
            if (app) {
              console.log('[WindowManager] Adding task:', savedTask.name);
              addTaskToDesktop(app, savedTask.desktopIndex || 0);
            }
          }),
        );
      }, 500); // 위치 설정 후 여유있게 대기
    } else {
      console.log('[WindowManager] No tasks to restore');
    }
  }, [hydrated, isLogIned, lastTaskList, availableApps, addTask, setVirtualWindowPosition]);

  useEffect(() => {
    if (!hydrated) return; // hydration 전엔 아무것도 하지 않음

    //초기 기본 설정
    if (isLogIned === 'true') {
      removeTask(logIn);
      const discover: TaskType = {
        component: (
          <Discover
            backUpFocus={backUpFocus}
            setBackUpFocus={setBackUpFocus}
          />
        ),
        type: 'Shell',
        id: 0,
        layer: -3,
        name: 'Discover',
        appSetup: undefined,
        visible: false,
      };
      const virtualDesktopService: TaskType = {
        component: <></>,
        type: 'Shell',
        id: 1,
        layer: -999,
        name: 'Extender',
        appSetup: undefined,
        visible: false,
      };
      setTimeout(() => {
        addTask(discover);
        addTask(virtualDesktopService);
      }, 200);
    } else {
      setTimeout(() => {
        addTask(logIn);
      }, 200);
    }
  }, [isLogIned, hydrated]);

  // 공지사항 데이터를 atom에 저장 (항상 실행)
  useEffect(() => {
    if (!hydrated || isLogIned !== 'true') return;

    // API 데이터가 있으면 API 데이터 사용, 없으면 DEFAULT_NOTIFICATIONS 사용
    let notificationsToStore;

    if (notificationsData?.data && notificationsData.data.length > 0) {
      notificationsToStore = notificationsData.data;
    } else {
      // NotificationData 형식으로 변환
      notificationsToStore = DEFAULT_NOTIFICATIONS.map((item, index) => ({
        notification_id: Date.now() + index,
        writer_id: 'system',
        title: item.title,
        content: item.content,
        is_open: true,
        is_image: item.is_image,
        end_date: item.created_at,
        created_at: item.created_at,
        updated_at: item.created_at,
      }));
    }

    // atom에 데이터 저장
    setNotificationList(notificationsToStore);
  }, [hydrated, isLogIned, notificationsData, setNotificationList]);

  // 공지사항 자동 표시 (settings.showBootNotification이 true일 때만)
  useEffect(() => {
    if (
      !hydrated ||
      hasCheckedNotification.current ||
      !settings.showBootNotification ||
      isLogIned !== 'true'
    )
      return;

    hasCheckedNotification.current = true;

    // API 데이터가 있으면 API 데이터 사용, 없으면 DEFAULT_NOTIFICATIONS 사용
    let notificationsToShow;

    if (notificationsData?.data) {
      const openNotifications = notificationsData.data.filter((n) => n.is_open);
      if (openNotifications.length > 0) {
        notificationsToShow = openNotifications;
      }
    }

    // API 데이터가 없으면 기본 공지사항 사용
    if (!notificationsToShow) {
      notificationsToShow = DEFAULT_NOTIFICATIONS;
    }

    // setNotification 사용하여 공지사항 창 자동으로 열기
    if (setNotification && notificationsToShow) {
      setTimeout(() => {
        setNotification(notificationsToShow);
      }, 500); // 부팅 후 0.5초 뒤에 표시
    }
  }, [hydrated, settings, isLogIned, notificationsData, setNotification]);

  useEffect(() => {
    const container = document.getElementById('cursorContainer') as HTMLElement;
    const cursor = document.getElementById('cursor');
    if (!container || !cursor) return;

    cursor.style.zIndex = '9990';

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      let x = event.clientX - bounds.x + bounds.left;
      let y = event.clientY - bounds.y;
      x = Math.max(bounds.left, Math.min(bounds.width - 1 + bounds.left, x));
      y = Math.max(0, Math.min(bounds.height - 1, y));
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      setCursorVec([x, y]);
    };

    const resizeObserver = new ResizeObserver((_entries) => {
      requestAnimationFrame(() => {
        // bounds를 다시 계산하도록 트리거
        const bounds = container.getBoundingClientRect();
      });
    });

    const display = document.getElementById('display');
    if (display) resizeObserver.observe(display);

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [settings, sideWidth]);

  useEffect(() => {
    if (settings.screenRatio === '4:3') {
      const updateSideWidth = () => {
        const fullWidth = window.innerWidth;
        const fullHeight = window.innerHeight;
        const containerWidth = (fullHeight * 4) / 3;
        const calculatedSide = (fullWidth - containerWidth) / 2;
        setSideWidth(Math.max(0, calculatedSide));
      };
      updateSideWidth();
      window.addEventListener('resize', updateSideWidth);
      return () => window.removeEventListener('resize', updateSideWidth);
    } else if (settings.screenRatio === '16:9') {
      const updateSideWidth = () => {
        setSideWidth(0);
      };
      updateSideWidth();
      console.log('asdf');
      window.addEventListener('resize', updateSideWidth);
      return () => window.removeEventListener('resize', updateSideWidth);
    }
  }, [settings]);

  // 클릭 시 cursor 변경
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const handleClick = () => {
      const [dx, dy] = dragOffset.current;
      const dragged = Math.abs(dx) > 10 || Math.abs(dy) > 10;
      if (dragged) return;
      setCursorImage(CURSOR_IMAGES.click);
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
      clickTimeout.current = setTimeout(() => {
        setCursorImage(CURSOR_IMAGES.default);
        clickTimeout.current = null;
      }, 300);
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Custom Hook 초기화 역할
  useTaskTransformFunction();
  useTaskSearchFunction();
  useAlerter();
  useNotification();

  return (
    <_.Desktop>
      <Suspense fallback={null}>
        <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
        <_.Display
          id="cursorContainer"
          is43={settings.screenRatio === '4:3'}
          {...bindDrag()}
        >
          <div id="cursor"></div>
          {taskList.map((task: TaskType) => {
            // type 체크
            if (task.type !== 'App' && task.type !== 'Shell') {
              return null;
            }

            // App 타입은 appSetup이 필수
            if (
              task.type === 'App' &&
              (!task.appSetup ||
                task.appSetup.minWidth === undefined ||
                task.appSetup.minHeight === undefined ||
                task.appSetup.setUpWidth === undefined ||
                task.appSetup.setUpHeight === undefined)
            ) {
              return null;
            }

            return (
              <Application
                key={task.instanceId || task.name}
                name={task.name}
                uid={task.id}
                instanceId={task.instanceId}
                type={task.type as 'App' | 'Shell'}
                appSetup={
                  task.appSetup
                    ? {
                        ...task.appSetup,
                        minWidth: task.appSetup.minWidth!,
                        minHeight: task.appSetup.minHeight!,
                        setUpWidth: task.appSetup.setUpWidth!,
                        setUpHeight: task.appSetup.setUpHeight!,
                      }
                    : ({} as any)
                }
                setUpHeight={task.appSetup?.setUpHeight || 0}
                setUpWidth={task.appSetup?.setUpWidth || 0}
                cursorVec={cursorVec}
                removeTask={removeTask}
                removeCompnent={task}
              >
                {task.component}
              </Application>
            );
          })}
          {startOption ? <Observer /> : <></>}
        </_.Display>
        <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
      </Suspense>
    </_.Desktop>
  );
};
export default WindowManager;
