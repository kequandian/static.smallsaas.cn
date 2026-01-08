import { UserInfoProps } from '@/utils/cache/user';
import { Storage } from '@/utils/storage';

// 缓存
class Cache {
  getToken = (): string => {
    return Storage.getItem('TOKEN') || '';
  };

  setToken = (value: string) => {
    Storage.setItem('TOKEN', value);
  };

  removeToken = () => {
    Storage.removeItem('TOKEN');
  };

  getUser = (): UserInfoProps => {
    return Storage.getItem('USER') || '';
  };

  setUser = (value: any) => {
    Storage.setItem('USER', value);
  };
  removeUser = () => {
    Storage.removeItem('USER');
  };
}

export default new Cache();
