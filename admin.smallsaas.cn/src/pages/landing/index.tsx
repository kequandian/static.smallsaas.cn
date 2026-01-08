import * as React from 'react';
import { useState } from 'react';
import './index.scss';
import Login_1 from './login_1';

const Landing: React.FC = () => {
  const [loginType, setLoginType] = useState<string>('Login_1');
  console.log(loginType);

  return (
    <>
      <Login_1 />
      {/* <Segmented<string>
        className="segmented"
        options={['Login_1', 'Login_2', 'Login_3']}
        onChange={(value) => setLoginType(value)}
      />
      {loginType === 'Login_1' && <Login_1 />}
      {loginType === 'Login_2' && <Login_2 />} */}
    </>
  );
};

export default Landing;
