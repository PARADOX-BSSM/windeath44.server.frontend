import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { memorial_application } from '@/config/index';

// export const applyMemorial = async (): Promise<boolean> => {
//   try {
//     const response: AxiosResponse = await axios.post(
//       `${memorial_application}/email`,
//       { email },
//       {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       },
//     );
//     console.log(JSON.stringify(response.data));
//     return true;
//   } catch (error: any) {
//     if (error.response?.data) {
//       alert(`이메일 전송 실패: 다시 입력해 주세요!`);
//       console.log(`이메일 전송 실패: ${JSON.stringify(error.response.data)}`);
//     } else {
//       alert('이메일 전송 중 오류가 발생했습니다.');
//     }
//     throw error;
//   }
// };
