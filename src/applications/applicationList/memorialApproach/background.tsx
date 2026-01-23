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

  useInterval(() => {
    const messages: string[] = [];
    if (!server) {
      messages.push('서버 주소가 잘못 설정되어 있습니다. 관리자에게 문의하세요.');
    } else {
      // 기일자
      if (anniversaryQuery.isError) {
        messages.push('오늘의 기일자 정보를 불러올 수 없습니다.');
      } else if (!anniversaryQuery.isLoading) {
        const data = anniversaryQuery.data;
        if (!Array.isArray(data) || data.length === 0) {
          messages.push('오늘은 기일이 없습니다.');
        } else {
          const name = data[0]?.name ?? data[0]?.characterName ?? '알 수 없음';
          messages.push(`오늘은 ${name}의 기일입니다.`);
        }
      }
      // 인기 추모관
      if (memorialQuery.isError) {
        messages.push('오늘의 인기 추모관 정보를 불러올 수 없습니다.');
      } else if (!memorialQuery.isLoading) {
        const raw = memorialQuery.data?.data ?? memorialQuery.data;
        if (!raw) {
          messages.push('오늘은 인기 추모관이 없습니다.');
        } else {
          const name = raw.characterName ?? raw.name ?? '알 수 없음';
          messages.push(`오늘의 인기 추모관은 ${name}입니다.`);
        }
      }
      // 조문객
      if (mournerQuery.isError) {
        messages.push('조문객 정보를 불러올 수 없습니다.');
      } else if (!mournerQuery.isLoading) {
        const raw = mournerQuery.data?.data ?? mournerQuery.data;
        if (!raw) {
          messages.push('오늘은 조문객이 없습니다.');
        } else {
          const name = raw.username ?? raw.name ?? '알 수 없음';
          messages.push(`오늘의 조문객은 ${name} 입니다.`);
        }
      }
    }
    setAlarmManager(messages);
  }, 1000);

  return null;
};

export default MemorialBackground;