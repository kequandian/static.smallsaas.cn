import { getUserInfo } from '@/api/login';
import { Storage } from '@/utils/storage';
import { useCallback, useState } from 'react';

export default () => {
  const defaultUser = {
    name: '智慧大屏运营平台',
    avatar: '',
  };

  const [user, setUser] = useState(Storage.getItem('USER') || defaultUser);

  // 写入用户数据
  const setUserData = useCallback((data: any) => {
    setUser(data);
    Storage.setItem('USER', data); // 写入缓存 防止刷新丢失
  }, []);

  // 获取用户数据
  const getUserData = useCallback(async () => {
    const { data, code } = await getUserInfo();
    if (code) {
      setUser(data);
      Storage.setItem('USER', data);
    }
  }, []);

  return { user, setUserData, getUserData };
};
