import { Avatar, List } from 'antd';
import React from 'react';

interface Props {
  list: any;
}

const ChatList: React.FC<Props> = (props) => {
  const { list } = props;

  return (
    <div>
      <List
        className="chatList overflow-auto"
        bordered
        split={false}
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item?.userAvatar} />}
              title={
                <>
                  <span>{item.userName}</span>
                  {/* <span className=" pl-4 f12999">{item.chatTime}</span> */}
                  <span className=" pl-4 f10999">会议开始{item.time}后</span>
                </>
              }
              description={item.content}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatList;
