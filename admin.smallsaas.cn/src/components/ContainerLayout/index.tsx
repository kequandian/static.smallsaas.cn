import React from 'react';
import ContainerLayoutWithCode from './ContainerLayoutWithCode';
import ContainerLayoutWithConfig from './ContainerLayoutWithConfig';

type ConfigProp = Parameters<typeof ContainerLayoutWithConfig>[0];
type CodeProp = Parameters<typeof ContainerLayoutWithCode>[0];

/**
 * 通过code码或者配置生成对应的布局
 * @param props
 * @returns
 */
const ContainerLayout: React.FC<ConfigProp | CodeProp> = (props) => {
  // 存在code，证明是通过配置
  if ('code' in props)
    return (
      <ContainerLayoutWithCode
        code={props.code}
        renderEach={props.renderEach}
        loadingTip={props.loadingTip}
      />
    );

  // 反之使用配置
  return <ContainerLayoutWithConfig layout={props.layout} renderEach={props.renderEach} />;
};
export default ContainerLayout;
