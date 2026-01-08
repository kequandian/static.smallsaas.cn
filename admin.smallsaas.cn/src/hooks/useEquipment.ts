import {
  getBindingUserEdit,
  getDevicesCancelDisable,
  getDevicesDisable,
  getEnableNoPWLogin,
  getEquipmentList,
  getEquipmentListDel,
  getEquipmentListSq,
  getUnauthorized,
} from '@/api/equipment';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import { useRef, useState } from 'react';

// 定义useEquipment钩子函数，用于处理设备相关的操作
export const useEquipment = () => {
  // 管理设备表单弹窗的显示状态
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  // 设备列表数据
  // const [equipmentData, setEquipmentData] = useState<any>();

  // 模块数据集合
  const state = useRef<any>();

  // 获取设备列表的函数
  const getEquipmentListApi = async (p: any, orgId?: number) => {
    // 请求参数
    const params = {
      pageSize: 10,
      pageNum: 1,
      orgId: orgId || '',
      ...p,
    };

    // 发起请求并处理响应数据
    const { data } = await getEquipmentList(params);
    if (data) {
      console.log(data.records, '123');
      state.current = data;
      // setEquipmentData(data);
      // setEquipmentLis((prevState: any) => [...prevState, ...data.records]);
    }
    return data;
  };

  // 处理设备授权/取消授权的操作
  const onAuthorization = async (id: number, sq?: boolean) => {
    // 根据sq的值决定调用授权还是取消授权的接口
    const { code } = sq ? await getEquipmentListSq(id) : await getUnauthorized(id);
    if (code === 200) {
      message.success('设置成功！');
      Pubsub.publish('UPDATE-EQUIPMENTLIST');
    }
  };

  // 配置设备的免密码登录设置
  const onEnableNoPWLogin = async (enablePw: number, id: number) => {
    // 调用接口设置免密码登录状态
    const { code } = await getEnableNoPWLogin(enablePw, id);
    if (code === 200) {
      message.success('设置成功！');
      // Pubsub.publish('UPDATE-EQUIPMENTLIST');
    }
  };

  // 绑定用户到设备的操作
  const onBindingUser = async (id: number) => {
    // 调用接口绑定用户
    const { code } = await getBindingUserEdit(id);
    if (code === 200) {
      message.success('绑定用户');
    }
  };

  // 删除设备的操作
  const onDel = async (id: number) => {
    // 调用接口删除设备
    const { code } = await getEquipmentListDel(id);
    getEquipmentListApi({});
    if (code === 200) {
      message.success('删除成功');
      Pubsub.publish('UPDATE-EQUIPMENTLIST');
    }
  };

  //是否禁用
  const onDevicesDisable = async (id: number, sq?: boolean) => {
    const { code } = sq ? await getDevicesDisable(id) : await getDevicesCancelDisable(id);
    if (code === 200) {
      message.success('设置成功！');
      Pubsub.publish('UPDATE-EQUIPMENTLIST');
    }
  };

  // 返回各种操作函数和状态
  return {
    // 设置创建模态窗口的打开状态的方法
    setCreateModalOpen,
    // 创建模态窗口的打开状态
    createModalOpen,
    // 授权操作的回调函数
    onAuthorization,
    // 开启无密码登录的回调函数
    onEnableNoPWLogin,
    // 删除操作的回调函数
    onDel,
    // 获取设备列表的API调用方法
    getEquipmentListApi,
    // 绑定用户的回调函数
    onBindingUser,
    // 模块数据源
    state,
    onDevicesDisable,
  };
};
