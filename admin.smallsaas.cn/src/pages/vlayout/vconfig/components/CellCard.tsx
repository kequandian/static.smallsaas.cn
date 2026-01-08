import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styles from './LayoutEditor.less';
import { debounce } from 'lodash';

// 单元格卡片组件
export interface CellCardProps {
  cell: API.WeightCellConfig;
  index: number;
  isSelected: boolean;
  hasNestedLayout: boolean;
  onCellSelect: (index: number) => void;
  onCellUpdate: (index: number, key: string, value: any) => void;
  onCellRemove: (index: number) => void;
  onNestedLayoutAdd: () => void;
  onNestedLayoutRemove: () => void;
  onParamsEdit: () => void;
}

const CellCard: React.FC<CellCardProps> = ({
  cell: initialCell,
  index,
  isSelected,
  hasNestedLayout,
  onCellSelect,
  onCellUpdate,
  onCellRemove,
  onNestedLayoutAdd,
  onNestedLayoutRemove,
  onParamsEdit,
}) => {
  // 本地状态管理单元格数据
  const [cellData, setCellData] = useState<API.WeightCellConfig>(initialCell);
  // 本地状态保存输入值，避免每次输入都触发更新
  const [idInputValue, setIdInputValue] = useState(initialCell.id || '');
  
  // 使用useCallback缓存函数，避免重复创建
  const debouncedUpdate = useCallback(
    debounce((key: string, value: any) => {
      onCellUpdate(index, key, value);
    }, 300),
    [index, onCellUpdate]
  );
  
  // 当外部传入的cell属性变化时更新本地状态
  useEffect(() => {
    setCellData(initialCell);
    setIdInputValue(initialCell.id || '');
  }, [initialCell]);
  
  // 更新单元格数据
  const updateCellData = (key: string, value: any) => {
    // 立即更新本地状态，提高响应性
    setCellData(prev => ({ ...prev, [key]: value }));
    // 延迟通知父组件
    debouncedUpdate(key, value);
  };

  // 处理ID输入变化
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setIdInputValue(newValue);
    updateCellData('id', newValue);
  };
  
  return (
    <Card 
      className={`${styles.cellCard} ${isSelected ? styles.selected : ''}`}
      style={{ marginBottom: 8 }}
      hoverable
      size="small"
      onClick={() => onCellSelect(index)}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <b>单元格 {index + 1}</b>
          </div>
          <Space>
          <Button
              type="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onParamsEdit();
              }}
            >
              配置参数
            </Button>
            {hasNestedLayout ? (
              <Button 
                danger
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  onNestedLayoutRemove();
                }}
              >
                移除嵌套布局
              </Button>
            ) : (
              <Button 
                type="primary" 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  onNestedLayoutAdd();
                }}
              >
                嵌入布局
              </Button>
            )}
           
            <Button 
              danger 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onCellRemove(index);
              }}
            >
              删除
            </Button>
          </Space>
        </div>
        
        <Row gutter={16}>
          <Col span={24} style={{ marginBottom: '8px' }}>
            <span>单元格ID:</span>
            <Input
              value={idInputValue}
              onChange={handleIdChange}
              size="small"
              style={{ width: 'calc(100% - 70px)', marginLeft: '4px' }}
            />
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px' }}>
              <span>列:</span>
              <Input
                type="number"
                min={1}
                value={cellData.col || 1}
                onChange={(e) => updateCellData('col', Number(e.target.value) || 1)}
                size="small"
                style={{ width: '50px', marginLeft: '4px' }}
              />
            </div>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px' }}>
              <span>行:</span>
              <Input
                type="number"
                min={1}
                value={cellData.row || 1}
                onChange={(e) => updateCellData('row', Number(e.target.value) || 1)}
                size="small"
                style={{ width: '50px', marginLeft: '4px' }}
              />
            </div>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px' }}>
              <span>跨列:</span>
              <Input
                type="number"
                min={1}
                value={cellData.colSpan || 1}
                onChange={(e) => updateCellData('colSpan', Number(e.target.value) || 1)}
                size="small"
                style={{ width: '50px', marginLeft: '4px' }}
              />
            </div>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: '8px' }}>
              <span>跨行:</span>
              <Input
                type="number"
                min={1}
                value={cellData.rowSpan || 1}
                onChange={(e) => updateCellData('rowSpan', Number(e.target.value) || 1)}
                size="small"
                style={{ width: '50px', marginLeft: '4px' }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default CellCard; 