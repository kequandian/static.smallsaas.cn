export interface UserInfoProps {
  id: number;
  user_id: number;
  nickname: string;
  mobile: string;
  avatar: string;
  level: number;
  gender: number;
  score: number;
  joinip: string;
  createtime: number;
  status: string;
  t_voice?: string;
  t_image?: string;
  t_chat?: string;
  member_count?: number;
  bill_count?: number;
  bill_sum?: number;
  identity?: string;
}

export function setUserInfo(data: UserInfoProps) {
  localStorage.setItem('userInfo', JSON.stringify(data));
}

export function getUserInfo() {
  return JSON.parse(String(localStorage.getItem('userInfo')));
}
