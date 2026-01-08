import { login } from '@/api/login';
import login2Bg from '@/assets/login/login-bg-bfb04d02.svg';
import cache from '@/utils/cache';
import { LockOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Col, message, Row } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';

import './index.scss';

const Login_2: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({
        ...values,
        // type,
      });

      if (msg.code === 200) {
        // setDuserInfo(msg.data);
        // cache.setUser(msg.data); //储存用户数据
        cache.setToken(msg.data.accessToken); //储存Token
        message.success('登录成功！');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Row className="login_2">
        <Col
          xs={{ flex: '100%' }}
          sm={{ flex: '40%' }}
          md={{ flex: '40%' }}
          lg={{ flex: '40%' }}
          xl={{ flex: '40%' }}
        >
          <div className="cover">
            <div>
              <div className="logo__BhF2t">LOGO占位</div>
            </div>

            <img className="login2Bg" width={'100%'} src={login2Bg} alt="logobg" />
          </div>
        </Col>
        <Col
          className="cover-right"
          xs={{ flex: '100%' }}
          sm={{ flex: '60%' }}
          md={{ flex: '60%' }}
          lg={{ flex: '60%' }}
          xl={{ flex: '60%' }}
        >
          <LoginForm
            className="content-body"
            // logo={<img alt="logo" src="/logo.svg" />}
            title="登陆"
            // subTitle={'xxxxxxxxxxxxxx'}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <ProFormText
              name="account"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
            <ProFormText
              name="orgCode"
              fieldProps={{
                size: 'large',
                prefix: <TeamOutlined />,
              }}
              placeholder={'请输入组织代码'}
            />
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码 ?
              </a>
            </div>
          </LoginForm>
        </Col>
      </Row>
    </div>
  );
};

export default Login_2;
