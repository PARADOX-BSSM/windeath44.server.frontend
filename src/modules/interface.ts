// memorial chief
export type memorialChiefs = {
  message: string;
  data: string[];
};
export type memorialChiefVar = {
  memorialId: number;
};
// memorial bow by user id and memorial id
type memorialUserIdData = {
  bowId: number;
  memorialId: number;
  userId: string;
  bowCount: number;
  lastBowedAt: string;
};
export type memorialUserIdResponse = {
  message: string;
  data: memorialUserIdData;
};
export type memorialUserIdVar = {
  memorialId: number;
  userId: number;
};
//Get Users By List
type usersResponse = {
  userId: string;
  name: string;
  remainToken: number;
  profile: string;
  role: string;
};
export type usersData = {
  message: string;
  data: usersResponse[];
};
export type userList = {
  userList: string[];
};
//최종 반환 데이터
export type BowData = {
  name: string;
  bowCount: number;
};
