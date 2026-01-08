// src/components/DistPage.js
// import React from '../amis-editor';
// console.log('hello', React);
import { getMenuEdit } from '@/api/menu';
import { useParams } from '@umijs/max';
import { useEffect } from 'react';

const DistPage = () => {
  const { id } = useParams();

  // 更新数据
  const updateJson = async (data: any) => {
    await getMenuEdit({ menuConfig: data }, id as any);
    localStorage.setItem('UPDATE-LOWPAGE', JSON.stringify(data));
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'action') {
        if (event.data.message) {
          console.log(event.data.message);
          updateJson(event.data.message);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      title="dist-page"
      // src={`http://localhost:1024/index.html/?id=${id}`}
      src={`http://202.63.172.178:8000/amis-editor/?id=${id}`}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  );
};

export default DistPage;
