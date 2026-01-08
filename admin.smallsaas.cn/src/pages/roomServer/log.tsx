import { ProCard } from '@ant-design/pro-components';
import axios from 'axios';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect } from 'react';

interface IAppProps {
  socket: any;
}
const App: React.FC<IAppProps> = (props) => {
  const [logInfo, setLogInfo] = React.useState<any>([]);

  const logApi = (data: any) => {
    const baseUrl = REACT_APP_ENV === 'prod' ? 'http://202.63.172.178:18080' : '/logV1';

    const url = `${baseUrl}/api/collector/log.add`;
    const params = {
      module: 'meeting',
      meeting_id: data.roomId,
      user_id: data.partyNumber,
      timestamp: data.timestamp,
      info: data.info,
    };
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'application/json', // 请求头部信息
          Authorization: `ad8045ec-37a3-075b-1f83-53a6ebcae9c1`,
        },
      })
      .then((response) => {
        console.log(response);

        // 处理返回的数据
      });
  };

  const { socket } = props;
  useEffect(() => {
    socket.on('LEAVE_ROOM_INFO', async (data: any) => {
      setLogInfo((prevData: any) => [...prevData, data]);
    });

    socket.on('JOIN_ROOM_INFO', async (data: any) => {
      await logApi(data);
      setLogInfo((prevData: any) => [...prevData, data]);
    });
    console.log(logInfo);
  }, []);

  return (
    <ProCard>
      <pre>
        {logInfo.map((item: any, index: number) => {
          return (
            <div key={index}>
              <div>
                {dayjs().format('YYYY-MM-DD HH:mm:ss')}
                &nbsp;&nbsp;
                {item.info}
              </div>
              <code>{JSON.stringify(item, null, 2)}</code>
            </div>
          );
        })}
      </pre>
    </ProCard>
  );
};

export default App;
