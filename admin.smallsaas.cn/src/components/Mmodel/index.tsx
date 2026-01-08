import { Modal } from 'antd';
import React, { useEffect } from 'react';

const App: React.FC<{
  open: boolean;
  setIsModalOpen: (p: boolean) => void;
}> = ({ open, setIsModalOpen }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (p: boolean) => {
    setIsModalOpen(p);
  };

  useEffect(() => {
    showModal(open);
  }, [open]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="会议预约" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>测试</p>
      </Modal>
    </>
  );
};

export default App;
