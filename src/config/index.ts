const protocol = 'https://';
const server = import.meta.env.VITE_SERVER;
export const auth = `${protocol}${server}/auth`; //회원가압
export const user = `${protocol}${server}/users`; //사용자 정보
export const memorial = `${protocol}${server}/memorials`; //추모관
export const memorial_application = `${protocol}${server}/applications`; //추모관 신청
export const anime = `${protocol}${server}/animes`; //에니메이션
export const chatbot = `${protocol}10.200.140.62:4449/chatbots`; //분신사바
