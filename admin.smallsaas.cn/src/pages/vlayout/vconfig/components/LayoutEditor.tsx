import React, { useState } from 'react';
import { Button, Card, Col, Divider, Input, Row, Space, Modal, message } from 'antd';
import styles from './LayoutEditor.less';
import CellCard from './CellCard';
import JsonEditor from './JsonEditor';

// 生成唯一ID
export const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// 布局编辑器组件
export interface LayoutEditorProps {
  layout: API.WeightLayout;
  onLayoutChange: (layout: API.WeightLayout) => void;
  isNested?: boolean;
  level?: number; // 添加级别跟踪，用于限制嵌套深度或调整样式
}

const LayoutEditor: React.FC<LayoutEditorProps> = ({
  layout,
  onLayoutChange,
  isNested = false,
  level = 0,
}) => {
  // 当前选中的单元格索引
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | undefined>(undefined);
  // 参数编辑模态框状态
  const [paramsModalVisible, setParamsModalVisible] = useState(false);
  const [currentCellIndex, setCurrentCellIndex] = useState<number>(-1);
  const [paramsJson, setParamsJson] = useState<string>('{}');
  const [isJsonValid, setIsJsonValid] = useState(true);

  // 添加列权重
  const addColWeight = () => {
    const updatedLayout = { ...layout };
    if (!updatedLayout.colWeights) {
      updatedLayout.colWeights = [];
    }
    updatedLayout.colWeights.push(1);
    onLayoutChange(updatedLayout);
  };

  // 移除列权重
  const removeColWeight = (index: number) => {
    const updatedLayout = { ...layout };
    if (updatedLayout.colWeights && updatedLayout.colWeights.length > 1) {
      updatedLayout.colWeights.splice(index, 1);
      onLayoutChange(updatedLayout);
    }
  };

  // 添加行权重
  const addRowWeight = () => {
    const updatedLayout = { ...layout };
    if (!updatedLayout.rowWeights) {
      updatedLayout.rowWeights = [];
    }
    updatedLayout.rowWeights.push(1);
    onLayoutChange(updatedLayout);
  };

  // 移除行权重
  const removeRowWeight = (index: number) => {
    const updatedLayout = { ...layout };
    if (updatedLayout.rowWeights && updatedLayout.rowWeights.length > 1) {
      updatedLayout.rowWeights.splice(index, 1);
      onLayoutChange(updatedLayout);
    }
  };

  // 更新列权重
  const updateColWeight = (index: number, value: number) => {
    const updatedLayout = { ...layout };
    if (updatedLayout.colWeights) {
      updatedLayout.colWeights[index] = value;
      onLayoutChange(updatedLayout);
    }
  };

  // 更新行权重
  const updateRowWeight = (index: number, value: number) => {
    const updatedLayout = { ...layout };
    if (updatedLayout.rowWeights) {
      updatedLayout.rowWeights[index] = value;
      onLayoutChange(updatedLayout);
    }
  };

  // 添加单元格
  const addCell = () => {
    // 使用generateId确保ID唯一
    const prefix = isNested ? `nested-cell-lvl${level}-` : 'cell-';
    const nextCellId = `${prefix}${generateId().substring(0, 8)}`;
    
    const newCell: API.WeightCellConfig = {
      id: nextCellId,
      col: 1,
      row: 1,
      colSpan: 1,
      rowSpan: 1,
    };
    
    const updatedLayout = { ...layout };
    if (!updatedLayout.cellConfig) {
      updatedLayout.cellConfig = [];
    }
    
    updatedLayout.cellConfig.push(newCell);
    onLayoutChange(updatedLayout);
    
    // 选中新添加的单元格
    if (updatedLayout.cellConfig.length > 0) {
      setSelectedCellIndex(updatedLayout.cellConfig.length - 1);
    }
  };

  // 更新布局中的单元格
  const updateCell = (cellIndex: number, key: string, value: any) => {
    const updatedLayout = { ...layout };
    if (!updatedLayout.cellConfig) {
      updatedLayout.cellConfig = [];
    }
    
    updatedLayout.cellConfig[cellIndex] = {
      ...updatedLayout.cellConfig[cellIndex],
      [key]: value,
    };
    
    onLayoutChange(updatedLayout);
  };

  // 移除单元格
  const removeCell = (index: number) => {
    const updatedLayout = { ...layout };
    if (updatedLayout.cellConfig) {
      updatedLayout.cellConfig.splice(index, 1);
      onLayoutChange(updatedLayout);
      
      // 如果删除的是当前选中的单元格，取消选中
      if (selectedCellIndex === index) {
        setSelectedCellIndex(undefined);
      } else if (selectedCellIndex !== undefined && selectedCellIndex > index) {
        // 如果删除的单元格在选中的单元格之前，调整选中索引
        setSelectedCellIndex(selectedCellIndex - 1);
      }
    }
  };

  // 添加嵌套布局到单元格
  const addNestedLayout = (cellIndex: number) => {
    const updatedLayout = { ...layout };
    if (!updatedLayout.cellConfig || !updatedLayout.cellConfig[cellIndex]) {
      return;
    }
    
    // 创建默认嵌套布局
    const nestedLayout: API.WeightLayout = {
      x: 0,
      y: 0,
      spacing: 5,
      margin: 10,
      cellConfig: [],
      colWeights: [1, 1],
      rowWeights: [1, 1],
      screenWidth: 0,
      screenHeight: 0,
    };
    
    // 直接将嵌套布局添加到单元格的layout属性
    updatedLayout.cellConfig[cellIndex] = {
      ...updatedLayout.cellConfig[cellIndex],
      layout: nestedLayout,
    };
    
    onLayoutChange(updatedLayout);
  };

  // 移除单元格的嵌套布局
  const removeNestedLayout = (cellIndex: number) => {
    const updatedLayout = { ...layout };
    if (!updatedLayout.cellConfig || !updatedLayout.cellConfig[cellIndex]) {
      return;
    }
    
    // 从单元格中移除layout属性
    const updatedCell = { ...updatedLayout.cellConfig[cellIndex] };
    delete updatedCell.layout;
    
    updatedLayout.cellConfig[cellIndex] = updatedCell;
    onLayoutChange(updatedLayout);
  };

  // 更新单元格的嵌套布局
  const updateNestedLayout = (cellIndex: number, nestedLayout: API.WeightLayout) => {
    const updatedLayout = { ...layout };
    if (!updatedLayout.cellConfig || !updatedLayout.cellConfig[cellIndex]) {
      return;
    }
    
    updatedLayout.cellConfig[cellIndex] = {
      ...updatedLayout.cellConfig[cellIndex],
      layout: nestedLayout,
    };
    
    onLayoutChange(updatedLayout);
  };

  // 打开参数编辑模态框
  const openParamsModal = (index: number) => {
    const cell = layout.cellConfig?.[index];
    if (cell) {
      // 处理params，可能是字符串，也可能是undefined
      let paramsString = cell.params || '{}';
      
      // 如果是字符串，检查格式化
      if (typeof paramsString === 'string') {
        try {
          // 尝试解析并格式化
          const parsed = JSON.parse(paramsString);
          paramsString = JSON.stringify(parsed, null, 2);
        } catch (e) {
          // 如果解析失败，保持原样
          console.warn('Failed to parse params JSON:', e);
        }
      }
      
      setParamsJson(paramsString);
      setCurrentCellIndex(index);
      setIsJsonValid(true);
      setParamsModalVisible(true);
    }
  };

  // 处理JSON变更
  const handleJsonChange = (value: string, valid: boolean) => {
    setParamsJson(value);
    setIsJsonValid(valid);
  };

  // 保存参数
  const saveParams = () => {
    if (!isJsonValid) {
      message.error('请先修复JSON格式错误');
      return;
    }
    
    const updatedLayout = { ...layout };
    if (!updatedLayout.cellConfig) {
      updatedLayout.cellConfig = [];
    }
    
    updatedLayout.cellConfig[currentCellIndex] = {
      ...updatedLayout.cellConfig[currentCellIndex],
      params: paramsJson, // 直接保存JSON字符串
    };
    
    onLayoutChange(updatedLayout);
    setParamsModalVisible(false);
    message.success('参数配置已保存');
  };

  return (
    <div>
      {/* 列权重 */}
      <div className={styles.weightInputGroup}>
        <span className={styles.weightLabel}>列权重：</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
          {(layout.colWeights || []).map((weight, index) => (
            <div key={`col-${index}`} className={styles.weightInputWrapper}>
              <Input
                type="number"
                value={weight}
                onChange={(e) => updateColWeight(index, Number(e.target.value))}
                size="small"
                className={styles.weightInput}
                min={1}
                max={99}
                maxLength={2}
              />
              <Button
                type="text"
                danger
                size="small"
                className={styles.weightRemoveButton}
                icon={<span>×</span>}
                onClick={() => removeColWeight(index)}
                disabled={layout.colWeights?.length === 1}
              />
            </div>
          ))}
        </div>
        <Button type="primary" size="small" onClick={addColWeight} style={{ marginLeft: '8px' }}>
          添加列
        </Button>
      </div>
      
      {/* 行权重 */}
      <div className={styles.weightInputGroup}>
        <span className={styles.weightLabel}>行权重：</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
          {(layout.rowWeights || []).map((weight, index) => (
            <div key={`row-${index}`} className={styles.weightInputWrapper}>
              <Input
                type="number"
                value={weight}
                onChange={(e) => updateRowWeight(index, Number(e.target.value))}
                size="small"
                className={styles.weightInput}
                min={1}
                max={99}
                maxLength={2}
              />
              <Button
                type="text"
                danger
                size="small"
                className={styles.weightRemoveButton}
                icon={<span>×</span>}
                onClick={() => removeRowWeight(index)}
                disabled={layout.rowWeights?.length === 1}
              />
            </div>
          ))}
        </div>
        <Button type="primary" size="small" onClick={addRowWeight} style={{ marginLeft: '8px' }}>
          添加行
        </Button>
      </div>

      {/* 分隔线 */}
      <Divider style={{ margin: '16px 0' }} />

      {/* 单元格设置 */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h4 style={{ margin: 0 }}>单元格设置</h4>
          <Button type="primary" size="small" onClick={addCell}>
            添加单元格
          </Button>
        </div>

        {/* 单元格列表 */}
        <div>
          {layout.cellConfig && layout.cellConfig.map((cell, index) => (
            <div key={cell.id || index}>
              <CellCard
                cell={cell}
                index={index}
                isSelected={selectedCellIndex === index}
                hasNestedLayout={Boolean(cell.layout)} 
                onCellSelect={setSelectedCellIndex}
                onCellUpdate={updateCell}
                onCellRemove={removeCell}
                onNestedLayoutAdd={() => addNestedLayout(index)}
                onNestedLayoutRemove={() => removeNestedLayout(index)}
                onParamsEdit={() => openParamsModal(index)}
              />
              
              {/* 如果单元格有嵌套布局且是当前选中的单元格，显示嵌套布局编辑器 */}
              {selectedCellIndex === index && cell.layout && (
                <div className={`${styles.nestedLayoutContainer} ${styles[`nestedLevel${level}`]}`}>
                  <h4 style={{ margin: '8px 0' }}>嵌套布局 (级别 {level + 1})</h4>
                  
                  {/* 嵌套布局的间距和边距设置 */}
                  <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={12}>
                      <div>
                        <span style={{ marginRight: '8px' }}>间距：</span>
                        <Input
                          type="number"
                          min={0}
                          value={cell.layout.spacing !== undefined ? cell.layout.spacing : 5}
                          onChange={(e) => {
                            const value = e.target.value === '' ? 0 : Number(e.target.value);
                            // 确保值大于等于0
                            const finalValue = value < 0 ? 0 : value;
                            const updatedNestedLayout = { 
                              ...cell.layout, 
                              spacing: finalValue
                            };
                            updateNestedLayout(index, updatedNestedLayout);
                          }}
                          size="small"
                          style={{ width: '80px' }}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div>
                        <span style={{ marginRight: '8px' }}>边距：</span>
                        <Input
                          type="number"
                          min={0}
                          value={cell.layout.margin !== undefined ? cell.layout.margin : 10}
                          onChange={(e) => {
                            const value = e.target.value === '' ? 0 : Number(e.target.value);
                            // 确保值大于等于0
                            const finalValue = value < 0 ? 0 : value;
                            const updatedNestedLayout = { 
                              ...cell.layout, 
                              margin: finalValue 
                            };
                            updateNestedLayout(index, updatedNestedLayout);
                          }}
                          size="small"
                          style={{ width: '80px' }}
                        />
                      </div>
                    </Col>
                  </Row>
                  
                  <LayoutEditor
                    layout={cell.layout}
                    onLayoutChange={(updatedNestedLayout) => updateNestedLayout(index, updatedNestedLayout)}
                    isNested={true}
                    level={level + 1}
                  />
                </div>
              )}
            </div>
          ))}
          
          {(!layout.cellConfig || layout.cellConfig.length === 0) && (
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
              暂无单元格，请添加
            </div>
          )}
        </div>
      </div>

      {/* 参数编辑模态框 */}
      <Modal
        title="配置单元格参数"
        open={paramsModalVisible}
        onOk={saveParams}
        onCancel={() => setParamsModalVisible(false)}
        okButtonProps={{ disabled: !isJsonValid }}
        width={600}
      >
        <p>请输入JSON格式的参数（Map结构）:</p>
        <JsonEditor 
          value={paramsJson} 
          onChange={handleJsonChange} 
          rows={12}
        />
      </Modal>
    </div>
  );
};

export default LayoutEditor; 