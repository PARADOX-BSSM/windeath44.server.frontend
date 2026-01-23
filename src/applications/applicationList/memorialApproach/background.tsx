import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { alarmManagerAtom } from '@/atoms/alarmManager';
import { useGetCharacterIdsByAnniversary } from '@/api/notification/getCharacterIdsByAnniversary';
import { useGetMemorialIdByCommentsCount } from '@/api/notification/getMemorialIdByCommentsCount';
import { usegetUserNameByLikeCount } from '@/api/notification/getUserNameByLikeCount';


const MemorialBackground = () => {


  const setAlarmManager = useSetAtom(alarmManagerAtom);
  const server = import.meta.env.VITE_SERVER;
  const enabled = Boolean(server);
  // 기존 쿼리 훅을 enabled 옵션과 함께 항상 같은 순서로 호출
  const anniversaryQuery = useGetCharacterIdsByAnniversary(enabled);
  const memorialQuery = useGetMemorialIdByCommentsCount(enabled);
  const mournerQuery = usegetUserNameByLikeCount(enabled);

  // Custom useInterval to handle polling safely without affecting dependency arrays
  const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef(callback);
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      if (delay !== null) {
        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  const sentAlarms = useRef<Set<string>>(new Set());
  const pendingAlarms = useRef<{ id: string; message: string; appName: string }[]>([]);

  // Dispatch Loop (500ms) - Staggered Appearance
  useInterval(() => {
    if (pendingAlarms.current.length > 0) {
      const nextAlarm = pendingAlarms.current.shift();
      if (nextAlarm) {
        setAlarmManager((prev) => [
          ...prev,
          {
            ...nextAlarm,
            createdAt: Date.now(),
          },
        ]);
      }
    }
  }, 500);

  // Detection Loop (1000ms)
  useInterval(() => {
    const queueAlarm = (id: string, message: string, isError: boolean) => {
      if (isError) {
        if (!sentAlarms.current.has(id)) {
          pendingAlarms.current.push({
            id,
            appName: '추모관',
            message,
          });
          sentAlarms.current.add(id);
        }
      } else {
        if (sentAlarms.current.has(id)) {
          sentAlarms.current.delete(id);
        }
      }
    };

    if (!server) {
      queueAlarm('server-config-error', '서버 주소가 잘못 설정되어 있습니다. 관리자에게 문의하세요.', true);
    } else {
      // 기일자
      queueAlarm('anniversary-error', '오늘의 기일자 정보를 불러올 수 없습니다.', anniversaryQuery.isError);
      if (!anniversaryQuery.isError && !anniversaryQuery.isLoading) {
        const data = anniversaryQuery.data;
        const noData = !Array.isArray(data) || data.length === 0;
        queueAlarm('anniversary-empty', '오늘은 기일이 없습니다.', noData);
        if (!noData) {
          const name = data[0]?.name ?? data[0]?.characterName ?? '알 수 없음';
          queueAlarm('anniversary-info', `오늘은 ${name}의 기일입니다.`, true);
        }
      }

      // 인기 추모관
      queueAlarm('memorial-error', '오늘의 인기 추모관 정보를 불러올 수 없습니다.', memorialQuery.isError);
      if (!memorialQuery.isError && !memorialQuery.isLoading) {
        const raw = memorialQuery.data?.data ?? memorialQuery.data;
        const noData = !raw;
        queueAlarm('memorial-empty', '오늘은 인기 추모관이 없습니다.', noData);
        if (!noData) {
          const name = raw.characterName ?? raw.name ?? '알 수 없음';
          queueAlarm('memorial-info', `오늘의 인기 추모관은 ${name}입니다.`, true);
        }
      }

      // 조문객
      queueAlarm('mourner-error', '조문객 정보를 불러올 수 없습니다.', mournerQuery.isError);
      if (!mournerQuery.isError && !mournerQuery.isLoading) {
        const raw = mournerQuery.data?.data ?? mournerQuery.data;
        const noData = !raw;
        queueAlarm('mourner-empty', '오늘은 조문객이 없습니다.', noData);
        if (!noData) {
          const name = raw.username ?? raw.name ?? '알 수 없음';
          queueAlarm('mourner-info', `오늘의 조문객은 ${name} 입니다.`, true);
        }
      }
    }
  }, 1000);

  return null;
};

export default MemorialBackground;