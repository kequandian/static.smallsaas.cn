import { getAppsList } from '@/api/appManage';
import { deviceAttribute, deviceCommand } from '@/services/mdm/device';
import { ModalForm, ProCard, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Row, Col } from 'antd';
import { t } from '@excalidraw/excalidraw/types/i18n';
import { Button, Descriptions, Image, message, Modal, Spin, Switch, Form } from 'antd';
import _ from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface IAppProps {
  deviceId: string;
}

// 抽取控制卡片组件
interface ControlCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const ControlCard: React.FC<ControlCardProps> = ({ title, description, icon, children }) => {
  return (
    <ProCard 
      bordered 
      style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} 
      bodyStyle={{ minHeight: 120 }}
    >
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{title}</div>
      <div style={{ color: '#999', marginBottom: 16 }}>{description}</div>
      {children}
    </ProCard>
  );
};

const App: React.FC<IAppProps> = ({ deviceId }) => {
  const [switchValue, setSwitchValue] = useState<boolean>();
  // const [deviceData, setDeviceData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);

  //  设备基本信息
  const onAppsDetails = async () => {
    const res = await deviceAttribute({ deviceId: deviceId });
    if (res.code === 200) {
      setSwitchValue(res?.data?.attributes?.screen?.lock);
    }
  };

  useEffect(() => {
    onAppsDetails();
  }, []);

  // 解锁
  const onChangeScreen = async (type: string) => {
    setLoading(true);

    const params = {
      deviceId: deviceId,
      command: type,
      payload: {},
    };

    const data = await deviceCommand(params);

    if (data?.code === 200) {
      message.success(data?.message);
      setSwitchValue(!switchValue); // 仅在接口调用成功时更新状态
      setLoading(false);
    } else {
      setLoading(false);
      message.error(data?.message);
    }
  };

  const screenshotPopUp = (url: any) => {
    Modal.confirm({
      title: '实时截图',
      destroyOnClose: true,
      icon: <></>,
      width: '60%',
      content: <Image src={url} />,
      footer: null,
      maskClosable: true,
      closable: true,
    });
  };

  // 截屏
  const onChangeShot = _.debounce(async (type: string) => {
    setLoading(true);
    const params = {
      deviceId: deviceId,
      command: type,
      payload: {},
      timeout: 30,
    };

    const data = await deviceCommand(params);
    if (data?.code === 200) {
      message.success(data?.message);
      screenshotPopUp(data?.data?.url);
    }
    setLoading(false);
  }, 1000);

  // launcher设置
  const onLauncher = async (type: string, v: any) => {
    const params = {
      deviceId: deviceId,
      command: type,
      payload: {
        appPackage: v.appPackage, //应用包名
        activityName: v.activityName, // 应用名称
      },
    };

    const data = await deviceCommand(params);
    if (data?.code === 200) {
      message.success(data?.message);
      setOpen(false);
    }
  };

  // 检查更新
  const onUpdate = async (type: string, v: any) => {
    const params = {
      deviceId: deviceId,
      command: type,
      payload: {
        appPackage: v.appPackage, //应用包名
      },
      timeout: 300,
    };

    const data = await deviceCommand(params);
    if (data?.code === 200) {
      message.success(data?.message);
      setOpenUpdate(false);
    }
  };

  // 设置锁屏密码
  const onSetLockPassword = async (type: string, v: any) => {
    if (v.password !== v.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    
    const params = {
      deviceId: deviceId,
      command: type,
      payload: {
        password: v.password,
      },
    };

    const data = await deviceCommand(params);
    if (data?.code === 200) {
      message.success(data?.message);
      setOpenPassword(false);
    }
  };

  // 设置更新时间地址
  const onSetUpdateAddress = async (type: string, v: any) => {
    // 简单的URL验证
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    if (!urlPattern.test(v.address)) {
      message.error('请输入有效的地址');
      return;
    }
    
    const params = {
      deviceId: deviceId,
      command: type,
      payload: {
        address: v.address,
      },
    };

    const data = await deviceCommand(params);
    if (data?.code === 200) {
      message.success(data?.message);
      setOpenUpdateAddress(false);
    }
  };

  useEffect(() => {
    // onReleasesList();
  }, []);
  return (
    <ProCard title="设备控制" bodyStyle={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <ControlCard 
            title="锁屏" 
            description="远程锁定设备屏幕"
          >
            <Switch
              value={switchValue}
              onChange={(e) => onChangeScreen(e ? 'COMMAND_LOCK_SCREEN' : 'COMMAND_UNLOCK_SCREEN')}
            />
          </ControlCard>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <ControlCard 
            title="实时截屏" 
            description="获取设备当前屏幕截图"
          >
            <Button 
              icon={<span className="anticon anticon-desktop" />} 
              onClick={() => onChangeShot('COMMAND_CLIENT_SCREEN_SHOT')}
            >
              截屏
            </Button>
          </ControlCard>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <ControlCard 
            title="Launcher设置" 
            description="配置设备启动器和桌面"
          >
            <Button 
              icon={<span className="anticon anticon-setting" />} 
              onClick={() => setOpen(true)}
            >
              设置
            </Button>
          </ControlCard>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <ControlCard 
            title="检查更新" 
            description="检查设备系统和应用更新"
          >
            <Button 
              icon={<span className="anticon anticon-appstore" />} 
              onClick={() => setOpenUpdate(true)}
            >
              选择应用
            </Button>
          </ControlCard>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <ControlCard 
            title="设置锁屏密码" 
            description="设置设备的锁屏密码"
          >
            <Button 
              icon={<span className="anticon anticon-lock" />} 
              onClick={() => setOpenPassword(true)}
            >
              设置
            </Button>
          </ControlCard>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <ControlCard 
            title="设置时间更新地址" 
            description="设置设备更新时间的ntp服务器地址"
          >
            <Button 
              icon={<span className="anticon anticon-global" />} 
              onClick={() => setOpenUpdateAddress(true)}
            >
              设置
            </Button>
          </ControlCard>
        </Col>
      </Row>
      <Spin spinning={loading} fullscreen />

      {/* launcher设置弹出 */}
      <ModalForm
        width={'40%'}
        title="launcher设置"
        className="pt-4"
        open={open}
        onFinish={async (values) => onLauncher('COMMAND_SET_LAUNCHER', values)}
        onOpenChange={setOpen}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
      >
        <ProFormText
          placeholder={'请输入应用包名'}
          name="appPackage"
          rules={[
            {
              required: true,
              message: '请输入应用包名',
            },
          ]}
        />
        <ProFormText placeholder={'请输入应用名称'} name="activityName" />
      </ModalForm>
      {/* 检查更新弹出 */}
      <ModalForm
        width={'40%'}
        title="检查更新"
        className="pt-4"
        open={openUpdate}
        onFinish={async (values) => onUpdate('COMMAND_APP_OTA', values)}
        onOpenChange={setOpenUpdate}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
      >
        <ProFormSelect
          debounceTime={500}
          fieldProps={{
            showSearch: true,
          }}
          request={async (params) => {
            const { data } = await getAppsList({
              pageNum: params.current || 1, // 当前页码
              pageSize: params.pageSize || 20, // 每页条数
              name: params.keyWords,
            });
            return data.records.map((item: any) => ({
              label: item.name,
              value: item.appPackage,
            }));
          }}
          name="appPackage"
          label="应用"
          placeholder="请选择应用"
          rules={[
            {
              required: true,
              message: '请选择应用',
            },
          ]}
        />
      </ModalForm>
      
      {/* 设置锁屏密码弹出 */}
      <ModalForm
        width={'40%'}
        title="设置锁屏密码"
        className="pt-4"
        open={openPassword}
        onFinish={async (values) => onSetLockPassword('COMMAND_SET_LOCK_PASSWORD', values)}
        onOpenChange={setOpenPassword}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
      >
        <ProFormText.Password
          label="密码"
          placeholder={'请输入密码'}
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        />
        <ProFormText.Password
          label="确认密码"
          placeholder={'请确认密码'}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '请确认密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        />
      </ModalForm>
      
      {/* 设置更新地址弹出 */}
      <ModalForm
        width={'40%'}
        title="设置地址"
        className="pt-4"
        open={openUpdateAddress}
        onFinish={async (values) => onSetUpdateAddress('COMMAND_SET_UPDATE_ADDRESS', values)}
        onOpenChange={setOpenUpdateAddress}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
      >
        <ProFormText
          label="ntp服务器地址"
          placeholder={'请输入地址'}
          name="address"
          rules={[
            {
              required: true,
              message: '请输入地址',
            },
            {
              pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
              message: '请输入有效的地址',
            },
          ]}
        />
      </ModalForm>
    </ProCard>
  );
};

export default App;
