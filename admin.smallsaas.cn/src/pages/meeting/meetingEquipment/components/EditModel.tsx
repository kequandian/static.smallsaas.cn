import { getEquipmentListAdd, getEquipmentListEdit } from '@/api/equipment';
import { getOperatorsList } from '@/api/operation';
import { getSysOrgList } from '@/api/theServer';
import { useTheServer } from '@/hooks/useTheServer';
import pcaChian from '@/utils/pcaChian';
import {
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import { EModelType } from './ProTable';
import { policyPage } from '@/services/mdm/policy';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}
const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const { theServerLis, getTheServerListApi } = useTheServer();
  const [provinceData, setProvinceData] = useState({});
  const [form] = Form.useForm(); // 创建表单实例

  useEffect(() => {
    getTheServerListApi();
  }, []);

  // 过滤省市区选择 筛选数据 给下面六个参数赋值，正常省市区有三级，但要考虑只有一级二级情况。如香港行政区
  // 给地区名 provinceName/cityName/districtName
  // 给地区code provinceCode/cityCode/districtCode
  // 给地区经纬度（取最后一级) longitude/latitude

  const extractPcaData = (selectedOptions: any[]): any => {
    const result: any = {
      provinceName: '',
      cityName: '',
      districtName: '',
      provinceCode: '',
      cityCode: '',
      districtCode: '',
      // longitude: '',
      // latitude: '',
    };
    console.log(selectedOptions);

    selectedOptions?.forEach((option, index) => {
      if (option.level === '1') {
        result.provinceName = option.name;
        result.provinceCode = option.code;
      } else if (option.level === '2') {
        result.cityName = option.name;
        result.cityCode = option.code;
      } else if (option.level === '3') {
        result.districtName = option.name;
        result.districtCode = option.code;
      }

      // 取最后一级的经纬度
      if (index === selectedOptions.length - 1) {
        // result.longitude = option.longitude;
        // result.latitude = option.latitude;
        form.setFieldsValue({
          latitude: option.longitude,
          longitude: option.latitude,
        });
      }
    });
    setProvinceData(result);
    return result;
  };

  return (
    <>
      <ModalForm
        disabled={type === EModelType.CHECK}
        modalProps={{
          destroyOnClose: true,
          // onCancel: () => console.log('run'),
        }}
        form={form} // 传递表单实例
        title={`${type}设备`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          const newValue = {
            ...value,
            ...provinceData,
          };
          // delete newValue?.provinceName;
          if (type === EModelType.EDIT) {
            // 编辑
            const data = await getEquipmentListEdit(newValue, formData?.id);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-EQUIPMENTLIST');

              // getEquipmentListApi();
            }
          } else {
            // 新增
            const data = await getEquipmentListAdd(newValue);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-EQUIPMENTLIST');
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="sn"
            label="设备码"
            tooltip="设备序列号"
            initialValue={formData?.sn}
            disabled
          />

          <ProFormText
            width="md"
            name="name"
            label="名称"
            rules={[
              {
                required: true,
                message: '请输入名称！',
              },
            ]}
            initialValue={formData?.name}
          />
          <ProFormText width="md" name="hwSn" label="SN" initialValue={formData?.hwSn} />
          {/* <ProFormText width="md" name="mac" label="mac主机地址" initialValue={formData?.mac} /> */}
          <ProFormSelect
            width="md"
            debounceTime={500}
            request={async (params) => {
              const { data } = await getOperatorsList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 100, // 每页条数
              });
              return data.records.map((item: any) => ({
                controlName: item.name,
                channelNumber: item.channelNumber,
              }));
            }}
            fieldProps={{
              fieldNames: {
                label: 'controlName',
                value: 'channelNumber',
              },
            }}
            name="channelNumber"
            label="渠道"
            initialValue={formData?.channelNumber}
          />
          <ProFormText
            width="md"
            name="meetingNumber"
            label="会议号"
            initialValue={formData?.meetingNumber}
          />
          <ProFormSelect
            width="md"
            // options={theServerLis}
            request={async () =>
              theServerLis.map((item: any) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })
            }
            name="meetingServerId"
            label="服务器"
            initialValue={formData?.meetingServerId}
          />

          <ProFormText width="md" disabled name="model" label="型号" initialValue={formData?.model} hidden={true} />

          <ProFormText
            width="md"
            name="productKey"
            label="产品编码"
            disabled
            hidden={true}
            initialValue={formData?.productKey}
          />
          <ProFormText
            width="md"
            name="manufacturer"
            label="制造商"
            hidden={true}
            initialValue={formData?.manufacturer}
            disabled
          />

          <ProFormSelect.SearchSelect
            mode="single"
            request={async (params) => {
              // 使用 request 获取选项数据
              const { data } = await getSysOrgList({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
              });
              return data.records.map((item: any) => ({
                label: item.name,
                value: item.id,
              }));
            }}
            width="md"
            name="orgId"
            label="分配组织"
            initialValue={formData?.orgId}
            fieldProps={{
              showSearch: true,
              labelInValue: false,
              autoClearSearchValue: true,
            }}
          // disabled
          />

          <ProFormSelect.SearchSelect
            mode="single"
            request={async (params) => {
              // 使用 request 获取选项数据
              const { data } = await policyPage({
                pageNum: params.current || 1, // 当前页码
                pageSize: params.pageSize || 10, // 每页条数
              });
              return data.records.map((item: any) => ({
                label: item.name,
                value: item.id,
              }));
            }}
            width="md"
            name="strategyId"
            label="默认策略"
            hidden={true}
            initialValue={formData?.strategyId}
            fieldProps={{
              showSearch: true,
              labelInValue: false,
              autoClearSearchValue: true,
            }}
          // disabled
          />
          <ProFormCascader
            initialValue={
              formData?.provinceName
                ? [formData?.provinceName, formData?.cityName, formData?.districtName]
                : []
            }
            // initialValue={formData?.provinceName && JSON.parse(formData?.provinceName)}
            name="provinceName"
            label="区域"
            width={'md'}
            fieldProps={{
              options: pcaChian,
              fieldNames: {
                label: 'name',
                value: 'name',
              },

              onChange: (value: any, selectedOptions: any) => {
                const pcaData = extractPcaData(selectedOptions);
                console.log(pcaData); // 输出提取的省市区数据
              },
            }}

          />
          <ProForm.Group>
            <ProFormText
              width="md"
              name="longitude"
              label="经度"
              initialValue={formData?.longitude}
            />
            <ProFormText
              width="md"
              name="latitude"
              label="纬度"
              initialValue={formData?.latitude}
            />
          </ProForm.Group>
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default App;
