import { layoutConfigList } from '@/services/layout/layoutService';
import { Result, Spin } from 'antd';
import { useEffect, useState } from 'react';
import ContainerLayoutWithConfig from './ContainerLayoutWithConfig';

type ContainerLayout = Parameters<typeof ContainerLayoutWithConfig>[0];
type ContainerLayoutByCodeProps = Omit<ContainerLayout, 'layout'> & {
  code: string;
  loadingTip?: string;
};

/**
 * 传入code码生成对应布局配置
 */
export const ContainerLayoutWithCode: React.FC<ContainerLayoutByCodeProps> = ({
  code,
  loadingTip,
  renderEach,
}) => {
  const [layout, setLayout] = useState<unknown | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    layoutConfigList({ code })
      .then(({ data }) => {
        const out = data instanceof Array ? data[0] : data;
        if (!out) throw new Error(`code: ${code} 布局信息不存在`);
        setLayout(out.layout);
      })
      .catch((err) => {
        if (err instanceof Error) setErrMsg(err.message);
        else setErrMsg(`生成 code: ${code} 布局失败`);
      });
  }, []);

  // 如果存在错误信息
  if (errMsg) {
    return (
      <div>
        <Result status="warning" title={errMsg} />
      </div>
    );
  }

  // 如果布局不存在
  if (!layout) {
    return (
      <Spin tip={loadingTip ?? '正在加载'}>
        <div className="w-full pt-[50%]"></div>
      </Spin>
    );
  }

  return (
    <ContainerLayoutWithConfig
      layout={layout as ContainerLayout['layout']}
      renderEach={renderEach}
    />
  );
};

export default ContainerLayoutWithCode;
