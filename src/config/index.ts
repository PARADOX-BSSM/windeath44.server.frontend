// const protocol = 'https://';
// const server = import.meta.env.VITE_SERVER;
// export const auth = `${protocol}${server}/auth`; //회원가압
// export const user = `${protocol}${server}/users`; //사용자 정보
// export const memorial = `${protocol}${server}/memorials`; //추모관
// export const memorial_application = `${protocol}${server}/memorial_application`; //추모관 신청
// export const anime = `${protocol}${server}/animes`; //에니메이션

const protocol = 'http://';
const server = import.meta.env.VITE_SERVER;
export const auth = `${protocol}${server}:4444/auth`; //회원가압
export const user = `${protocol}${server}:4333/users`; //사용자 정보
export const memorial = `${protocol}${server}:4446/memorials`; //추모관
export const memorial_application = `${protocol}${server}/memorial_application`; //추모관 신청
export const anime = `${protocol}${server}:4448/animes`; //에니메이션
