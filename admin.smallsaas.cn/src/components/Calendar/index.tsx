import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Mmodel from '../Mmodel';

const App: React.FC = () => {
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    console.log(value);
    setIsModalOpen(true);
  };

  return (
    <>
      <Calendar value={value} onSelect={onSelect} />
      <Mmodel open={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default App;
