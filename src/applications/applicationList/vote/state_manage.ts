import { atom } from 'jotai';

export const Event_Count = atom(0);
export const Event_Past = atom(0); /* count가 바뀌었는지 확인 */

export const Open_Vote = atom(false); /* vote 링크를 눌르면 true */

export const Sep_window = atom(false); /* vote, judgement_list 구분 */
