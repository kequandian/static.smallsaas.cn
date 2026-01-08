import { policyAdd, policyGet, policyUpdate } from '@/services/mdm/policy';
import { policyContentPage } from '@/services/mdm/policyContent';
import { syncPeripheral, getPeripheral, getDeviceList } from '@/services/mdm/device';
import {
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
  ProFormCheckbox,
  EditableProTable,
  ProColumns,
  ProCard,
  ProForm,
  PageContainer,
  ModalForm,
} from '@ant-design/pro-components';
import { Form, message, Typography, Button, Space, Card, Row, Col, Table, Checkbox, Select, Modal, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import Pubsub from 'pubsub-js';
import React, { useState, useEffect } from 'react';
import { history, useParams } from '@umijs/max';
import { EModelType } from './PolicyControl';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface AppWhitelistItem {
  id: React.Key;
  appName: string;
  packageName: string;
}

interface DeviceWhitelistItem {
  deviceName: string;
  deviceId: string;
  manufacturerName?: string;
  serialNumber?: string;
  productName?: string;
}

interface DeviceItem {
  id: string;
  name: string;
}

interface ParamsInfo {
  disabledModules?: string[];
  setPowerTime?: {
    powerOffTime?: string;
    powerOnTime?: string;
  };
  appWhitelist?: {
    appName: string;
    packageName: string;
  }[];
  deviceWhitelist?: DeviceWhitelistItem[];
}

interface PolicyFormData {
  id?: string;
  name: string;
  num?: string;
  params?: string; // JSON string of ParamsInfo
}

const PolicyControlEditModel: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const isEdit = !!params.id;
  const [form] = Form.useForm();
  const [appWhitelistData, setAppWhitelistData] = useState<AppWhitelistItem[]>([]);
  const [deviceWhitelistData, setDeviceWhitelistData] = useState<DeviceWhitelistItem[]>([]);
  const [editableAppKeys, setEditableAppKeys] = useState<React.Key[]>([]);
  const [disabledModules, setDisabledModules] = useState<any[]>([]);
  const [selectedDisabledModules, setSelectedDisabledModules] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPeripheral, setLoadingPeripheral] = useState<boolean>(false);
  const [deviceList, setDeviceList] = useState<DeviceItem[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [loadingDeviceList, setLoadingDeviceList] = useState<boolean>(false);
  
  // Fetch policy data for editing
  useEffect(() => {
    const fetchDisabledModules = async () => {
      try {
        const { data } = await policyContentPage({
          pageNum: 1,
          pageSize: 100,
        });
        setDisabledModules(data.records || []);
      } catch (error) {
        console.error('Failed to fetch disabled modules:', error);
      }
    };

    // Fetch device list
    const fetchDeviceList = async () => {
      setLoadingDeviceList(true);
      try {
        const res = await getDeviceList({});
        if (res.code === 200 && res.data) {
          setDeviceList(res.data.map((device: any) => ({
            id: device.id,
            name: device.name || device.id,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch device list:', error);
      } finally {
        setLoadingDeviceList(false);
      }
    };

    fetchDisabledModules();
    fetchDeviceList();

    // If editing, fetch policy data
    if (isEdit && params.id) {
      setLoading(true);
      policyGet({ id: params.id as any }).then(res => {
        if (res.code === 200 && res.data) {
          const formData = res.data as PolicyFormData;
          // Set basic form values
          form.setFieldsValue({
            name: formData.name,
            num: formData.num,
          });

          // Parse params JSON string if it exists
          if (formData.params) {
            try {
              const paramsData = JSON.parse(formData.params) as ParamsInfo;
              
              // Set disabled modules
              if (paramsData.disabledModules && paramsData.disabledModules.length > 0) {
                setSelectedDisabledModules(paramsData.disabledModules);
              }
              
              // Set power time values
              if (paramsData.setPowerTime) {
                if (paramsData.setPowerTime.powerOffTime) {
                  form.setFieldValue('powerOffTime', paramsData.setPowerTime.powerOffTime);
                }
                if (paramsData.setPowerTime.powerOnTime) {
                  form.setFieldValue('powerOnTime', paramsData.setPowerTime.powerOnTime);
                }
              }
              
              // Initialize app whitelist if exists
              if (paramsData.appWhitelist && Array.isArray(paramsData.appWhitelist)) {
                const formattedAppData = paramsData.appWhitelist.map((item, index) => ({
                  id: `app-${index}`,
                  appName: item.appName || '',
                  packageName: item.packageName || '',
                }));
                setAppWhitelistData(formattedAppData);
                setEditableAppKeys(formattedAppData.map((item) => item.id));
              }
              
              // Initialize device whitelist if exists
              if (paramsData.deviceWhitelist && Array.isArray(paramsData.deviceWhitelist)) {
                setDeviceWhitelistData(paramsData.deviceWhitelist);
              }
            } catch (error) {
              console.error('Failed to parse params JSON:', error);
            }
          }
        }
        setLoading(false);
      }).catch(() => {
        message.error('获取策略数据失败');
        setLoading(false);
      });
    }
  }, [isEdit, params.id, form]);

  // Fetch peripheral data based on device selection
  const handleFetchPeripherals = async () => {
    setLoadingPeripheral(true);
    try {
      let res;
      
      if (selectedDevice) {
        // If device is selected, use syncPeripheral
        res = await syncPeripheral({ deviceId: selectedDevice });
      } else {
        res = await getPeripheral({});
      }
      
      if (res.code === 200 && res.data) {
        const deviceList = res.data as DeviceWhitelistItem[];
        setDeviceWhitelistData(deviceList);
        message.success('外设数据获取成功');
      }
    } catch (error) {
      console.error('Failed to fetch peripherals:', error);
      message.error('获取外设失败');
    } finally {
      setLoadingPeripheral(false);
    }
  };

  // App whitelist table
  const appColumns = [
    {
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName',
      width: '40%',
      render: (text: string, record: AppWhitelistItem, index: number) => (
        <Input
          placeholder="请输入应用名称"
          value={text}
          onChange={(e) => {
            const newData = [...appWhitelistData];
            newData[index].appName = e.target.value;
            setAppWhitelistData(newData);
          }}
        />
      ),
    },
    {
      title: '应用包名',
      dataIndex: 'packageName',
      key: 'packageName',
      width: '40%',
      render: (text: string, record: AppWhitelistItem, index: number) => (
        <Input
          placeholder="请输入应用包名"
          value={text}
          onChange={(e) => {
            const newData = [...appWhitelistData];
            newData[index].packageName = e.target.value;
            setAppWhitelistData(newData);
          }}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '20%',
      render: (_: any, record: AppWhitelistItem, index: number) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            const newData = [...appWhitelistData];
            newData.splice(index, 1);
            setAppWhitelistData(newData);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  // Device whitelist columns
  const deviceColumns = [
    {
      title: '外设名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      ellipsis: true,
    },
    {
      title: '外设ID',
      dataIndex: 'deviceId',
      key: 'deviceId',
      ellipsis: true,
    },
    {
      title: '厂商',
      dataIndex: 'manufacturerName',
      key: 'manufacturerName',
      ellipsis: true,
    },
    {
      title: '序列号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      ellipsis: true,
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'operation',
      width: 80,
      render: (_: any, record: DeviceWhitelistItem, index: number) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            const newData = [...deviceWhitelistData];
            newData.splice(index, 1);
            setDeviceWhitelistData(newData);
          }}
        >
          删除
        </Button>
      ),
    },
  ];

  // Add app whitelist item
  const handleAddAppItem = () => {
    console.log("Adding new item");
    const newItem = {
      id: `app-${Date.now()}`,
      appName: '',
      packageName: '',
    };
    setAppWhitelistData([...appWhitelistData, newItem]);
  };

  // Handle checkbox change for disabled modules
  const handleDisabledModulesChange = (moduleId: string, checked: boolean) => {
    if (checked) {
      setSelectedDisabledModules([...selectedDisabledModules, moduleId]);
    } else {
      setSelectedDisabledModules(selectedDisabledModules.filter(id => id !== moduleId));
    }
  };

  // Handle device selection change
  const handleDeviceChange = (value: string) => {
    setSelectedDevice(value);
  };

  const handleSubmit = async (values: any) => {
    // Validate app whitelist data
    for (let i = 0; i < appWhitelistData.length; i++) {
      const item = appWhitelistData[i];
      if (!item.appName) {
        message.error(`第 ${i+1} 行应用名称不能为空`);
        return;
      }
      if (!item.packageName) {
        message.error(`第 ${i+1} 行应用包名不能为空`);
        return;
      }
    }

    // Prepare app whitelist data
    const appWhitelistSubmit = appWhitelistData
      .map(item => ({
        appName: item.appName,
        packageName: item.packageName,
      }));

    // Safely format time values if they exist
    const formatTimeValue = (timeValue: any) => {
      // Check if timeValue exists and has a format function
      if (timeValue && typeof timeValue.format === 'function') {
        return timeValue.format('HH:mm');
      } else if (timeValue && typeof timeValue === 'string') {
        // If it's already a string, return it as is
        return timeValue;
      }
      // Otherwise return undefined
      return undefined;
    };

    // Prepare params object
    const paramsObject: ParamsInfo = {
      disabledModules: selectedDisabledModules,
      setPowerTime: {
        powerOffTime: formatTimeValue(values.powerOffTime),
        powerOnTime: formatTimeValue(values.powerOnTime),
      },
      appWhitelist: appWhitelistSubmit,
      deviceWhitelist: deviceWhitelistData,
    };
    
    // Convert params to JSON string
    const paramsJson = JSON.stringify(paramsObject);
    
    // Combine all data
    const submitData = {
      name: values.name,
      num: values.num,
      params: paramsJson,
      appType: 1, // Using 1 for MDM type
    };

    setLoading(true);
    try {
      if (isEdit && params.id) {
        // Edit
        const res = await policyUpdate({ ...submitData, id: params.id as any });
        if (res.code === 200) {
          message.success('更新策略成功');
          Pubsub.publish('UPDATE-POLICY');
          // Navigate back to the list
          history.push('/MDMmanage/policyManage');
        } else {
          message.error(res.message || '更新策略失败');
        }
      } else {
        // Add
        const res = await policyAdd(submitData);
        if (res.code === 200) {
          message.success('添加策略成功');
          Pubsub.publish('UPDATE-POLICY');
          // Navigate back to the list
          history.push('/MDMmanage/policyManage');
        } else {
          message.error(res.message || '添加策略失败');
        }
      }
    } catch (error) {
      console.error('提交失败:', error);
      message.error('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title={isEdit ? '编辑策略' : '添加策略'}
      onBack={() => history.push('/MDMmanage/policyManage')}
      loading={loading}
    >
      <ProForm
        form={form}
        onFinish={handleSubmit}
        submitter={{
          searchConfig: {
            submitText: isEdit ? '更新' : '添加',
          },
          render: (_, dom) => (
            <div style={{ textAlign: 'center', marginTop: 32, marginBottom: 32 }}>
              <Button type="primary" size="large" htmlType="submit">
                {isEdit ? '更新' : '添加'}
              </Button>
            </div>
          ),
        }}
      >
        <ProCard title="基本信息" bordered headerBordered style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 20 }}> {/* 添加间距 */}
            <ProFormText
              name="name"
              label="策略名称"
              rules={[{ required: true, message: '请输入策略名称' }]}
              style={{ flex: 1 }} // 输入框占满剩余空间
            />
            <ProFormText
              name="num"
              label="策略编号"
              style={{ flex: 1 }}
            />
          </div>
        </ProCard>
        
        <ProCard title="禁用模块" bordered headerBordered style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {disabledModules.map(module => (
              <Checkbox
                key={module.id}
                checked={selectedDisabledModules.includes(module.id)}
                onChange={(e) => handleDisabledModulesChange(module.id, e.target.checked)}
              >
                {module.name}
              </Checkbox>
            ))}
          </div>
        </ProCard>
        
        <ProCard title="开关机时间" bordered headerBordered style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 20 }}> {/* 添加间距 */}
            <ProFormTimePicker
              name="powerOnTime"
              label="自动开机时间"
              fieldProps={{
                format: 'HH:mm',
              }}
              style={{ flex: 1 }}
            />
             <ProFormTimePicker
              name="powerOffTime"
              label="自动关机时间"
              fieldProps={{
                format: 'HH:mm',
              }}
              style={{ flex: 1 }}
            />
          </div>
        </ProCard>
        
        <ProCard 
          title="应用白名单" 
          bordered 
          headerBordered 
          style={{ marginBottom: 24 }}
          extra={
            <Button 
              type="primary" 
              size="middle"
              onClick={() => handleAddAppItem()} 
              icon={<PlusOutlined />}
            >
              添加应用
            </Button>
          }
        >
          <Table
            columns={appColumns}
            dataSource={appWhitelistData}
            rowKey="id"
            pagination={false}
            scroll={{ y: 240 }}
            size="middle"
            style={{ width: '100%' }}
            locale={{ emptyText: '暂无应用白名单数据，请点击添加应用按钮' }}
          />
        </ProCard>
        
        <ProCard 
          title="外设白名单" 
          bordered 
          headerBordered
          extra={
            <Space>
              <Select
                placeholder="选择设备"
                style={{ width: 200 }}
                onChange={handleDeviceChange}
                loading={loadingDeviceList}
                allowClear
              >
                {deviceList.map(device => (
                  <Option key={device.id} value={device.id}>{device.name}</Option>
                ))}
              </Select>
              <Button
                type="primary"
                icon={<SyncOutlined />}
                onClick={handleFetchPeripherals}
                loading={loadingPeripheral}
              >
                {selectedDevice ? '同步外设' : '获取外设'}
              </Button>
            </Space>
          }
        >
          <Table
            columns={deviceColumns}
            dataSource={deviceWhitelistData}
            rowKey="deviceId"
            pagination={false}
            locale={{ emptyText: '暂无外设数据，请选择设备或直接获取外设' }}
          />
        </ProCard>
      </ProForm>
    </PageContainer>
  );
};

export default PolicyControlEditModel;
