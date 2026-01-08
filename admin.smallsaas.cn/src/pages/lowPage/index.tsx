import { getMenuItem } from '@/api/menu';
import amisEnv from '@/utils/amisEnv';
import { useLocation, useModel, useParams } from '@umijs/max';
import { render as renderAmis } from 'amis';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
const APP: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const [schema, setSchema] = useState();
  const [menuId, setMenuId] = useState<any>(null);
  const { pathname } = useLocation();
  const { name } = useParams();

  // 请求JSON
  const onMenuItem = async (id: any) => {
    console.log(id);

    if (!id) return;
    const { data } = await getMenuItem(id);
    let json;

    if (data.menuConfig) {
      json = JSON.parse(data.menuConfig);
    }
    console.log(json);

    setSchema(json);
  };

  // 递归函数查找名称对应的 id
  const findIdByName = (menu: any[], pathname: string): number | undefined => {
    for (const item of menu) {
      // if (item.path === pathname) {

      if (item.path.includes('lowPage')) {
        if (item.path.includes(name)) {
          // console.log(item.path, '=>', item);

          return item.id;
        }
      }
      if (item.routes && item.routes.length > 0 && Array.isArray(item.routes)) {
        const id = findIdByName(item.routes, pathname);
        if (id !== undefined) {
          return id;
        }
      }
    }
    return undefined;
  };

  useEffect(() => {
    const menuId = findIdByName(initialState?.menu || [], pathname);
    setMenuId(menuId);
    onMenuItem(menuId);
  }, [pathname]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      const menuId = findIdByName(initialState?.menu || [], pathname);
      onMenuItem(menuId);
      console.log(event, 'UPDATE-LOWPAGE event received in index.tsx');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [pathname, initialState]);

  const AMISComponent = () => {
    return renderAmis(
      // 这里是 amis 的 Json 配置。
      schema!,
      {},
      amisEnv as any,
    );
  };

  const EDIT = () => {
    // 当前页面名称
    const onEdit = () => {
      window.open(`/lowPage/edit/${menuId}`, '_blank');
    };

    return (
      // <div className=" h-screen flex justify-center items-center">
      <div className=" ">
        <Button type="primary" onClick={onEdit}>
          去编辑
        </Button>
      </div>
    );
  };

  return (
    <div>
      {schema ? (
        <div className="AMISComponent p-5">
          {AMISComponent()} <br /> {EDIT()}
        </div>
      ) : (
        EDIT()
      )}
    </div>
  );
};

export default APP;
