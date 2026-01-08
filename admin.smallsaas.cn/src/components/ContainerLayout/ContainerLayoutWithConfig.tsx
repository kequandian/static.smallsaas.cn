import { CellConfig, touchGridLayout } from '@/utils/touchGridLayout';
import { useCallback, useEffect, useRef } from 'react';
import GridLayout from './GridLayout';

type LayoutRender = {
  renderEach?: (item: string) => React.ReactNode;
};

type ContainerLayoutByConfigProps = {
  layout: {
    cellConfig: CellConfig[]; // 单元每行配置
    colWeights: Array<number>; // 多少列
    rowWeights: Array<number>; // 多少行
    spacing: number; // 单元格空白间距
    margin: number; // 单元格外间距
    screenHeight: number; // 布局高度
    screenWidth: number; // 布局宽度
  };
} & LayoutRender;

/**
 * 传入配置的生成容器布局
 */
const ContainerLayoutWithConfig: React.FC<ContainerLayoutByConfigProps> = (
  props: ContainerLayoutByConfigProps,
) => {
  const { layout, renderEach } = props;
  const { screenWidth, screenHeight } = layout;
  const cols = touchGridLayout(layout);
  const container = useRef<HTMLDivElement>(null);

  // 更新间距计算
  const upSpacing = useCallback(() => {
    if (!container.current) return void 0;
    const current = container.current;
    const spacing = `${current.offsetWidth / screenWidth}px`;
    current.style.setProperty('--spacing', spacing);
  }, [container]);

  // 计算布局宽高对应节点的实际高度, 用于填充内外边距
  useEffect(() => {
    requestAnimationFrame(upSpacing);
    window.addEventListener('resize', upSpacing);
    return () => {
      window.removeEventListener('resize', upSpacing);
    };
  }, []);

  return (
    <div
      style={{
        paddingTop: `${(screenHeight / screenWidth) * 100}%`,
      }}
      className="relative w-full"
      ref={container}
    >
      <GridLayout cols={cols} renderEach={renderEach} />
    </div>
  );
};

export default ContainerLayoutWithConfig;
