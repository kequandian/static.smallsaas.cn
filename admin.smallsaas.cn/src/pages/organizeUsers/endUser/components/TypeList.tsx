import { Select, SelectProps, Tag } from 'antd';
import React, { useMemo } from 'react';
import { userTypeEnum } from './ProTable';
type TagRender = SelectProps['tagRender'];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={userTypeEnum[value]?.color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const TypeList: React.FC<{
  list: any;
  userTypeList: any;
  setUserArr: (v: any) => void;
}> = ({ list, userTypeList, setUserArr }) => {
  // 过滤数据
  const newList = useMemo(
    () =>
      userTypeList?.filter((area: any) =>
        list?.some((selfValue: number) => area.value === selfValue),
      ),
    [],
  );

  return (
    <>
      <Select
        mode="multiple"
        tagRender={tagRender}
        style={{ width: '100%' }}
        options={userTypeList}
        onChange={setUserArr}
        showSearch={false}
        defaultValue={newList}
        labelInValue={true}
      />
    </>
  );
};

export default TypeList;
