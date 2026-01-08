import { Popconfirm, PopconfirmProps } from 'antd';
import React from 'react';

interface Props {
  onConfirm: () => void;
}

const Confirmation: React.FC<React.PropsWithChildren<Props>> = ({ children, onConfirm }) => {
  const confirm: PopconfirmProps['onConfirm'] = () => {
    onConfirm();
  };
  return (
    <Popconfirm title="确认删除吗" onConfirm={confirm} okText="是" cancelText="否">
      {children}
    </Popconfirm>
  );
};

export default Confirmation;
