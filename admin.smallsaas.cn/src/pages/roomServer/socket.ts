import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = socketIOClient(url, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  socket.on('connect', () => {
    console.log('连接成功', socket.id);
  });
  return socket;
};

export default useSocket;
