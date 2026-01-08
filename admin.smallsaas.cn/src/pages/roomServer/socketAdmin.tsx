import * as React from 'react';

interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return (
    <iframe
      src="http://gitlab2.cdnline.cn:8999/rooms-ui/#/rooms"
      style={{ width: '100%', height: '100vh', border: 'none' }}
    ></iframe>
  );
};

export default App;
