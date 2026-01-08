import { getAddMachines, getTables1List, getTables2List, getUpMachines } from '@/api/mbcs';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import Pubsub from 'pubsub-js';
import React, { useEffect, useState } from 'react';
import { EModelType } from './ProTable';

interface Props {
  createModalOpen: boolean;
  setCreateModalOpen: (b: boolean) => void;
  formData?: any;
  type?: EModelType;
}

const App: React.FC<Props> = ({ createModalOpen, setCreateModalOpen, formData, type }) => {
  const [sqlName, setSqlName] = useState(null);
  const [entityFieldType, setEntityFieldType] = useState<any>();
  const [tableOptions, setTableOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      if (sqlName) {
        const { data } = await getTables2List(sqlName);
        setTableOptions(
          data.map((item: any) => ({
            label: item.Field,
            value: item.Field,
          })),
        );
      } else {
        setTableOptions([]);
      }
    };

    fetchTables();
  }, [sqlName]);

  return (
    <>
      <ModalForm
        disabled={type === EModelType.CHECK}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        title={`${type}`}
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onFinish={async (value: any) => {
          console.log(value, !!formData?.id);
          if (!!formData?.id) {
            // 编辑
            const data = await getUpMachines(value, formData?.entity);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-METAFIELD');
            }
          } else {
            // 新增
            const data = await getAddMachines(value);
            if (data.code === 200) {
              message.success(data.message);
              setCreateModalOpen(false);
              Pubsub.publish('UPDATE-METAFIELD');
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="entity"
            label="自定义服务标识"
            initialValue={formData?.entity}
            rules={[
              {
                required: true,
                message: '请输入自定义服务标识！',
              },
            ]}
          />

          <ProFormSelect
            width="md"
            debounceTime={500}
            request={async () => {
              const { data } = await getTables1List();
              // 忽略key ProFormSelect始终显示value

              return data.map((item: any) => ({
                label: Object.values(item)?.[0],
                value: Object.values(item)?.[0],
              }));
            }}
            rules={[
              {
                required: true,
                message: '请选择SQL表',
              },
            ]}
            name="entityTableName"
            label="表名"
            initialValue={formData?.entityTableName}
            onChange={(value) => {
              setSqlName(value as any);
            }}
          />

          <ProFormSelect
            // disabled={sqlName}
            width="md"
            debounceTime={500}
            options={tableOptions}
            rules={[
              {
                required: true,
                message: '请选择字段名',
              },
            ]}
            name="entityFieldName"
            label="字段名"
            initialValue={formData?.entityFieldName}
          />
          <ProFormSelect
            // disabled={sqlName}
            width="md"
            debounceTime={500}
            options={tableOptions}
            rules={[
              {
                required: true,
                message: '请选择过滤字段',
              },
            ]}
            name="whereFieldName"
            label="过滤字段"
            initialValue={formData?.whereFieldName}
          />

          <ProFormSelect
            width="md"
            options={[
              {
                value: 'STRING',
                label: '字符串',
              },
              {
                value: 'NUMBER',
                label: '数字',
              },
              {
                value: 'DATE',
                label: '时间',
              },
            ]}
            name="entityFieldType"
            label="字段类型"
            initialValue={formData?.centerType}
            rules={[
              {
                required: true,
                message: '请选择字段类型!',
              },
            ]}
            onChange={(value) => setEntityFieldType(value)}
          />
          {/* <ProFormText
            width="md"
            name="whereFieldName"
            label="过滤字段"
            initialValue={formData?.whereFieldName}
          /> */}
          <ProFormText
            width="md"
            name="permission"
            label="权限"
            initialValue={formData?.numberRangeMin}
          />
          {entityFieldType === 'NUMBER' && (
            <ProFormDigit
              width="md"
              name="numberRangeMin"
              label="最小值"
              initialValue={formData?.numberRangeMin}
            />
          )}
          {entityFieldType === 'NUMBER' && (
            <ProFormDigit
              width="md"
              name="numberRangeMax"
              label="最大值"
              initialValue={formData?.numberRangeMax}
            />
          )}
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default App;
