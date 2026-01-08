import ContainerLayout from '@/components/ContainerLayout';
import useFullscreen from '@/hooks/useFullscreen';
import { layoutConfigList } from '@/services/layout/layoutService';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Empty, Radio, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

// 调试用的组件，替换成自己的业务
const CardView: React.FC<{ componentId: string }> = ({ componentId }) => {
  return (
    <div className="w-full h-full bg-gray-200 rounded-md px-4 flex justify-center items-center">
      <span className="text-sm">id: {componentId}</span>
    </div>
  );
};

// 调试用的组件渲染方法
const renderEach = (componentId: string) => <CardView componentId={componentId} />;

// 前端布局预览演示窗口
const LayoutConfig: React.FC = () => {
  const winEl = useRef(null);
  const [records, setRecords] = useState<API.LayoutConfigDTO[]>([]);
  const [value, setValue] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);
  const [isFullscreen, toggleFullscreen] = useFullscreen();
  const options = records.map((item, index) => ({
    value: index,
    label: item.name,
  }));

  useEffect(() => {
    layoutConfigList({}).then((res) => setRecords(res.data!));
  }, []);

  // 配置列表为空时
  if (records.length === 0) {
    return (
      <PageContainer title="前端布局预览">
        <Empty />
      </PageContainer>
    );
  }

  // 当配置列表返回时
  return (
    <PageContainer title="前端布局预览">
      <div className="mb-4 flex flex-wrap">
        <div className="flex-1">
          <div className="flex items-center mr-8 mb-4">
            <div className="pr-2">选择布局:</div>
            <Select
              className="w-40"
              defaultValue={value}
              options={options}
              onChange={(index) => setOptionIndex(index)}
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="pr-2">使用方式: </div>
            <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
              <Radio value={0}>使用配置</Radio>
              <Radio value={1}>使用code码</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="">
          <Button
            type="primary"
            icon={<FullscreenOutlined />}
            onClick={() => toggleFullscreen(winEl.current)}
          >
            进入全屏
          </Button>
        </div>
      </div>

      {/* 生成的布局预览 */}
      <div className="border border-solid border-gray-200] bg-white" ref={winEl}>
        {/* 如果处于全屏状态则显示退出按钮 */}
        {isFullscreen && (
          <div className="absolute right-4 top-4 z-50">
            <Button
              icon={<FullscreenExitOutlined />}
              onClick={() => toggleFullscreen(winEl.current)}
            >
              退出全屏
            </Button>
          </div>
        )}

        {/* 使用code码生成布局 */}
        {value === 1 && (
          <ContainerLayout
            key={records[optionIndex].code}
            code={records[optionIndex].code}
            renderEach={renderEach}
          />
        )}

        {/* 使用配置生成布局 */}
        {value === 0 && (
          <ContainerLayout
            key={records[optionIndex].code}
            layout={records[optionIndex].layout as any}
            renderEach={renderEach}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default LayoutConfig;
