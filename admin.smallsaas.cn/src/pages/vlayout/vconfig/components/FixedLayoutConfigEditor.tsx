import { layoutConfigAdd, layoutConfigConvert, layoutConfigUpdate } from '@/services/layout/layoutService';
import { ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Col, Divider, Input, Row, Space, Modal, message } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { EModalType } from './LayoutConfigTable';
import styles from './LayoutEditor.less';
import { convertApiLayoutToUi, convertUiLayoutToApi } from '../services/mapper';
import LayoutEditor, { generateId } from './LayoutEditor';
import { createDefaultLayout, deepCloneLayout } from '../services/layoutUtils';

interface LayoutConfigEditorProps {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  layout?: API.LayoutConfigDTO;
  type: EModalType;
  onSuccess: () => void;
}

// 扩展类型定义，添加children属性
interface CellPositionWithChildren extends API.WeightCellPosition {
  children?: CellPositionWithChildren[];
}

const FixedLayoutConfigEditor: React.FC<LayoutConfigEditorProps> = ({
  open,
  onOpenChange,
  layout,
  type,
  onSuccess,
}) => {
  // 当前编辑的布局配置
  const [currentLayout, setCurrentLayout] = useState<API.WeightLayout>(createDefaultLayout());

  // 表单数据
  const [formData, setFormData] = useState<{
    code: string;
    name: string;
  }>({
    code: '',
    name: '',
  });

  // 布局预览数据
  const [cellPositions, setCellPositions] = useState<CellPositionWithChildren[]>([]);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // 全屏预览状态
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  // 初始化表单数据
  useEffect(() => {
    if (open && layout && layout.layout) {
      // 转换API数据到UI格式
      const uiLayout = convertApiLayoutToUi(layout.layout);
      
      setCurrentLayout(uiLayout);
      setFormData({
        code: layout.code || '',
        name: layout.name || '',
      });
      
      // 初始化时计算预览
      calculatePositions(uiLayout);
    } else if (open && !layout) {
      // 创建新布局时重置数据
      setCurrentLayout(createDefaultLayout());
      setFormData({
        code: '',
        name: '',
      });
      setCellPositions([]);
    }
  }, [open, layout]);

  // 计算布局位置
  const calculatePositions = async (layoutData: API.WeightLayout) => {
    try {
      setCalculationError(null);
      
      // 检查行列权重是否已设置
      if (!layoutData.colWeights?.length || !layoutData.rowWeights?.length) {
        setCalculationError('请先设置行列权重');
        return;
      }
      
      // 转换为API格式后发送请求
      const apiLayout = convertUiLayoutToApi(layoutData);
      const res = await layoutConfigConvert(apiLayout);
      
      if (res.data) {
        setCellPositions(res.data as CellPositionWithChildren[]);
      } else {
        setCalculationError(res.message || '计算布局位置失败');
      }
    } catch (error) {
      setCalculationError('布局计算错误');
    }
  };

  // 预览容器样式
  const getPreviewContainerStyle = (fullscreen: boolean = false): React.CSSProperties => {
    if (!currentLayout) return {};
    
    const { screenWidth, screenHeight } = currentLayout;
    // 调整全屏模式下的最大尺寸
    const maxWidth = fullscreen ? window.innerWidth * 0.85 : 800;
    const maxHeight = fullscreen ? window.innerHeight * 0.8 : 500;
    const scale = Math.min(maxWidth / (screenWidth || 1920), maxHeight / (screenHeight || 1080));
    
    return {
      width: `${(screenWidth || 1920) * scale}px`,
      height: `${(screenHeight || 1080) * scale}px`,
      backgroundColor: '#f0f2f5',
      position: 'relative' as const,
      margin: '0 auto',
      border: '1px solid #d9d9d9',
      // 确保内容不会超出边界
      overflow: 'hidden',
      boxSizing: 'border-box',
    };
  };

  // 获取单元格样式
  const getCellStyle = (
    cellPosition: CellPositionWithChildren, 
    nestLevel: number = 0,
    parentX: number = 0,
    parentY: number = 0
  ): React.CSSProperties => {
    if (!currentLayout) return {};
    
    const { screenWidth, screenHeight } = currentLayout;
    const maxWidth = isFullscreenPreview ? window.innerWidth * 0.85 : 800;
    const maxHeight = isFullscreenPreview ? window.innerHeight * 0.8 : 500;
    const scale = Math.min(maxWidth / (screenWidth || 1920), maxHeight / (screenHeight || 1080));
    
    // 计算绝对位置 = 父节点位置 + 子节点相对位置
    const absoluteX = parentX + (cellPosition.x || 0);
    const absoluteY = parentY + (cellPosition.y || 0);
    
    const hasChildren = cellPosition.children && cellPosition.children.length > 0;
    
    return {
      position: 'absolute' as const,
      left: `${absoluteX * scale}px`,
      top: `${absoluteY * scale}px`,
      width: `${(cellPosition.w || 0) * scale}px`,
      height: `${(cellPosition.h || 0) * scale}px`,
      backgroundColor: hasChildren ? undefined : '#fff',  // 嵌套容器的背景色由CSS类定义
      border: hasChildren ? undefined : '1px solid #1890ff',  // 嵌套容器的边框由CSS类定义
      boxSizing: 'border-box' as const,
      padding: hasChildren ? 0 : '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: hasChildren ? 'flex-start' : 'center',
      alignItems: hasChildren ? 'flex-start' : 'center',
    };
  };

  // 递归渲染单元格，添加父节点位置参数
  const renderCellPositions = (
    positions: CellPositionWithChildren[], 
    nestLevel: number = 0,
    parentX: number = 0,
    parentY: number = 0
  ) => {
    return positions.map((cellPosition, index) => {
      // 在响应中查找对应单元格以检查是否有嵌套布局
      const cellConfig = currentLayout.cellConfig?.find(cell => cell.id === cellPosition.id);
      const hasNestedLayout = cellConfig && !!cellConfig.layout;
      
      const hasChildren = cellPosition.children && cellPosition.children.length > 0;
      const actualNestLevel = nestLevel % 5; // 使用模5来循环使用5种颜色
      
      // 当前单元格的绝对位置
      const absoluteX = parentX + (cellPosition.x || 0);
      const absoluteY = parentY + (cellPosition.y || 0);
      
      // 如果有子节点，只渲染子节点，不渲染父节点，避免重叠
      if (hasChildren) {
        return (
          <React.Fragment key={index}>
            {renderCellPositions(
              cellPosition.children || [], 
              nestLevel + 1, 
              absoluteX, // 将当前节点的绝对位置传给子节点作为父位置
              absoluteY
            )}
          </React.Fragment>
        );
      }
      
      // 只渲染叶子节点（没有子节点的节点）
      return (
        <div 
          key={index} 
          style={getCellStyle(cellPosition, nestLevel, parentX, parentY)}
        >
          <div style={{ fontSize: '12px', textAlign: 'center' }}>
            ID: {cellPosition.id}
          </div>
          <div style={{ fontSize: '10px', color: '#999', textAlign: 'center' }}>
            ({(cellPosition.x || 0).toFixed(0)}, {(cellPosition.y || 0).toFixed(0)})
          </div>
          <div style={{ fontSize: '10px', color: '#999', textAlign: 'center' }}>
            {(cellPosition.w || 0).toFixed(0)}x{(cellPosition.h || 0).toFixed(0)}
          </div>
          {hasNestedLayout && (
            <div style={{ 
              color: getColorForLevel(actualNestLevel), 
              fontSize: '10px', 
              marginTop: '4px',
              padding: '2px 6px',
              backgroundColor: getLightColorForLevel(actualNestLevel),
              borderRadius: '2px',
            }}>
              [嵌套布局]
            </div>
          )}
        </div>
      );
    });
  };
  
  // 获取嵌套级别对应的颜色
  const getColorForLevel = (level: number): string => {
    const colors = [
      '#1890ff', // 蓝色
      '#52c41a', // 绿色
      '#722ed1', // 紫色
      '#fa8c16', // 橙色
      '#f5222d', // 红色
    ];
    return colors[level % colors.length];
  };
  
  // 获取嵌套级别对应的浅色背景
  const getLightColorForLevel = (level: number): string => {
    const colors = [
      'rgba(24, 144, 255, 0.1)',  // 浅蓝色
      'rgba(82, 196, 26, 0.1)',   // 浅绿色
      'rgba(114, 46, 209, 0.1)',  // 浅紫色
      'rgba(250, 140, 22, 0.1)',  // 浅橙色
      'rgba(245, 34, 45, 0.1)',   // 浅红色
    ];
    return colors[level % colors.length];
  };

  // 切换预览全屏模式
  const toggleFullscreenPreview = () => {
    setIsFullscreenPreview(prev => !prev);
  };

  // 保存布局
  const handleSave = async () => {
    if (!formData.code || !formData.name) {
      message.error('请填写布局编码和名称');
      return;
    }
    
      // 准备提交的数据
      const submitData: API.LayoutConfigDTO = {
      code: formData.code,
      name: formData.name,
      layout: convertUiLayoutToApi(currentLayout),
        };
        
        if (type === EModalType.EDIT && layout) {
          submitData.id = layout.id;
        }
        
        try {
          if (type === EModalType.ADD) {
            const res = await layoutConfigAdd(submitData);
            if (res.code === 200) {
              message.success('创建成功');
              onSuccess();
          onOpenChange(false);
            } else {
              message.error(res.message || '创建失败');
            }
          } else {
            const res = await layoutConfigUpdate(submitData);
            if (res.code === 200) {
              message.success('更新成功');
              onSuccess();
          onOpenChange(false);
            } else {
              message.error(res.message || '更新失败');
            }
          }
        } catch (error) {
          message.error(`${type === EModalType.ADD ? '创建' : '更新'}失败`);
    }
  };

  // 布局变更处理
  const handleLayoutChange = (updatedLayout: API.WeightLayout) => {
    setCurrentLayout(updatedLayout);
  };

  if (!open) return null;

  return (
    <>
      <Modal
        title={`${type}布局配置`}
        open={open}
        onCancel={() => onOpenChange(false)}
        width="100%"
        style={{ top: 0, padding: 0 }}
        bodyStyle={{ height: 'calc(100vh - 108px)', padding: '0', overflow: 'hidden' }}
        footer={[
          <Button key="back" onClick={() => onOpenChange(false)}>
            取消
          </Button>,
          <Button key="preview" type="primary" onClick={() => calculatePositions(currentLayout)}>
            生成预览
          </Button>,
          <Button key="submit" type="primary" onClick={handleSave}>
            保存
          </Button>,
        ]}
        maskClosable={false}
        destroyOnClose
        className={styles.layoutEditorFullscreen}
      >
        <div className={styles.splitView}>
          {/* 左侧配置区域 */}
          <div className={styles.configPanel}>
            <div className={styles.configScrollContainer}>
              <Card title="基本信息" style={{ marginBottom: '16px' }}>
          <Row gutter={16}>
            <Col span={12}>
                    <ProForm.Item label="布局编码">
                      <Input
                        value={formData.code} 
                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                        placeholder="请输入布局编码"
                      />
                    </ProForm.Item>
            </Col>
            <Col span={12}>
                    <ProForm.Item label="布局名称">
                      <Input
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="请输入布局名称"
                      />
                    </ProForm.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
                    <ProForm.Item label="屏幕宽度">
                        <Input
                          type="number"
                        value={currentLayout.screenWidth} 
                        onChange={e => setCurrentLayout({ 
                          ...currentLayout, 
                          screenWidth: Number(e.target.value) || 1920 
                        })}
                        placeholder="请输入屏幕宽度"
                        />
                      </ProForm.Item>
                    </Col>
                    <Col span={12}>
                    <ProForm.Item label="屏幕高度">
                        <Input
                          type="number"
                        value={currentLayout.screenHeight} 
                        onChange={e => setCurrentLayout({ 
                          ...currentLayout, 
                          screenHeight: Number(e.target.value) || 1080 
                        })}
                        placeholder="请输入屏幕高度"
                        />
                      </ProForm.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                    <ProForm.Item label="间距">
                      <Input 
                        type="number" 
                        min={0}
                        value={currentLayout.spacing !== undefined ? currentLayout.spacing : 0} 
                        onChange={e => {
                          const value = e.target.value === '' ? 0 : Number(e.target.value);
                          // 确保值大于等于0
                          const finalValue = value < 0 ? 0 : value;
                          setCurrentLayout({ 
                            ...currentLayout, 
                            spacing: finalValue
                          });
                        }}
                        placeholder="请输入间距"
                      />
                    </ProForm.Item>
                  </Col>
                  <Col span={12}>
                    <ProForm.Item label="边距">
                      <Input 
                        type="number" 
                        min={0}
                        value={currentLayout.margin !== undefined ? currentLayout.margin : 0} 
                        onChange={e => {
                          const value = e.target.value === '' ? 0 : Number(e.target.value);
                          // 确保值大于等于0
                          const finalValue = value < 0 ? 0 : value;
                          setCurrentLayout({ 
                            ...currentLayout, 
                            margin: finalValue 
                          });
                        }}
                        placeholder="请输入边距"
                      />
                    </ProForm.Item>
                  </Col>
                </Row>
                </Card>
              
              {/* 布局编辑器 */}
              <Card title="布局编辑器" style={{ marginBottom: '16px' }}>
                <LayoutEditor
                  layout={currentLayout}
                  onLayoutChange={handleLayoutChange}
                />
              </Card>
            </div>
          </div>
          
          {/* 右侧预览区域 */}
          <div className={styles.previewPanel}>
            <Card 
              title="布局预览" 
              className={styles.previewCard}
              extra={
                <Button
                  type="text"
                  icon={<FullscreenOutlined />}
                  onClick={toggleFullscreenPreview}
                  title="全屏预览"
                />
              }
              bodyStyle={{ 
                overflowY: 'auto',
                overflowX: 'auto', // Enable horizontal scrolling
                height: 'calc(100% - 57px)', 
                padding: '16px',
                display: 'flex', // Change to flex to enable vertical centering
                justifyContent: 'center',
                alignItems: 'center', // Add vertical centering
              }}
            >
              {calculationError ? (
                <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
                  {calculationError}
                </div>
              ) : (
                <div style={{ 
                  minWidth: 'fit-content', // Ensure content doesn't shrink below its natural size
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', // Add vertical centering
                  width: '100%',
                  height: '100%' // Make it full height to enable vertical centering
                }}>
                  <div style={getPreviewContainerStyle()}>
                    {renderCellPositions(cellPositions)}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </Modal>
      
      {/* 全屏预览模态框 */}
      {isFullscreenPreview && (
        <div className={styles.previewFullscreen}>
          <div className={styles.previewFullscreenContent}>
            <div className={styles.previewFullscreenControls}>
              <Space>
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<FullscreenExitOutlined />} 
                  onClick={toggleFullscreenPreview}
                  title="退出全屏"
                />
              </Space>
            </div>
            {calculationError ? (
              <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
                {calculationError}
              </div>
            ) : (
              <div 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px'
                }}
              >
                <div style={getPreviewContainerStyle(true)}>
                  {renderCellPositions(cellPositions)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FixedLayoutConfigEditor; 