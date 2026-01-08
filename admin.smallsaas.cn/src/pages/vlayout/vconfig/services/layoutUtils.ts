import { generateId } from '../components/LayoutEditor';

/**
 * 创建默认的布局配置
 */
export const createDefaultLayout = (isNested: boolean = false): API.WeightLayout => {
  return {
    x: 0,
    y: 0,
    spacing: isNested ? 5 : 10,
    margin: isNested ? 10 : 20,
    cellConfig: [],
    colWeights: [1, 1],
    rowWeights: [1, 1],
    screenWidth: isNested ? 0 : 1920,
    screenHeight: isNested ? 0 : 1080,
  };
};

/**
 * 创建新的单元格配置
 */
export const createCellConfig = (
  isNested: boolean = false,
  level: number = 0
): API.WeightCellConfig => {
  const prefix = isNested ? `nested-cell-lvl${level}-` : 'cell-';
  const cellId = `${prefix}${generateId().substring(0, 8)}`;
  
  return {
    id: cellId,
    col: 1,
    row: 1,
    colSpan: 1,
    rowSpan: 1,
  };
};

/**
 * 深度克隆布局对象
 */
export const deepCloneLayout = (layout: API.WeightLayout): API.WeightLayout => {
  if (!layout) return createDefaultLayout();

  const clonedLayout: API.WeightLayout = {
    ...layout,
    cellConfig: layout.cellConfig ? [...layout.cellConfig] : [],
    colWeights: layout.colWeights ? [...layout.colWeights] : [1, 1],
    rowWeights: layout.rowWeights ? [...layout.rowWeights] : [1, 1],
  };

  // 深度克隆单元格配置，包括嵌套布局
  if (clonedLayout.cellConfig) {
    clonedLayout.cellConfig = clonedLayout.cellConfig.map(cell => {
      const clonedCell = { ...cell };
      
      // 如果单元格有嵌套布局，递归克隆
      if (cell.layout) {
        clonedCell.layout = deepCloneLayout(cell.layout);
      }
      
      return clonedCell;
    });
  }
  
  return clonedLayout;
};

/**
 * 提取布局中的所有单元格ID（包括嵌套布局中的单元格）
 */
export const extractAllCellIds = (layout: API.WeightLayout): string[] => {
  if (!layout.cellConfig) return [];
  
  const cellIds: string[] = [];
  
  // 递归收集所有单元格ID
  const collectCellIds = (currentLayout: API.WeightLayout) => {
    if (!currentLayout.cellConfig) return;
    
    currentLayout.cellConfig.forEach(cell => {
      if (cell.id) {
        cellIds.push(cell.id);
      }
      
      // 如果有嵌套布局，递归收集
      if (cell.layout) {
        collectCellIds(cell.layout);
      }
    });
  };
  
  collectCellIds(layout);
  
  return cellIds;
};

/**
 * 平铺布局结构（用于调试或序列化）
 */
export const flattenLayout = (layout: API.WeightLayout): Record<string, any> => {
  const result: Record<string, any> = {};
  
  // 递归处理布局
  const processLayout = (currentLayout: API.WeightLayout, path: string = 'root') => {
    // 存储基本属性
    result[path] = {
      x: currentLayout.x,
      y: currentLayout.y,
      spacing: currentLayout.spacing,
      margin: currentLayout.margin,
      colWeights: currentLayout.colWeights,
      rowWeights: currentLayout.rowWeights,
      cellCount: currentLayout.cellConfig?.length || 0,
    };
    
    // 处理单元格及其嵌套布局
    if (currentLayout.cellConfig) {
      currentLayout.cellConfig.forEach((cell, index) => {
        const cellPath = `${path}.cell[${index}]`;
        result[cellPath] = {
          id: cell.id,
          col: cell.col,
          row: cell.row,
          colSpan: cell.colSpan,
          rowSpan: cell.rowSpan,
          hasNestedLayout: !!cell.layout,
        };
        
        // 递归处理嵌套布局
        if (cell.layout) {
          processLayout(cell.layout, `${cellPath}.layout`);
        }
      });
    }
  };
  
  processLayout(layout);
  
  return result;
};

/**
 * 查找布局中的特定单元格
 */
export const findCellById = (layout: API.WeightLayout, cellId: string): { 
  cell: API.WeightCellConfig | null; 
  parentLayout: API.WeightLayout | null;
  index: number;
} => {
  let result = { 
    cell: null as API.WeightCellConfig | null,
    parentLayout: null as API.WeightLayout | null,
    index: -1
  };
  
  // 搜索当前级别的单元格
  if (layout.cellConfig) {
    const index = layout.cellConfig.findIndex(cell => cell.id === cellId);
    if (index !== -1) {
      result = { 
        cell: layout.cellConfig[index],
        parentLayout: layout,
        index
      };
      return result;
    }
    
    // 递归搜索嵌套布局
    for (const cell of layout.cellConfig) {
      if (cell.layout) {
        const nestedResult = findCellById(cell.layout, cellId);
        if (nestedResult.cell) {
          return nestedResult;
        }
      }
    }
  }
  
  return result;
}; 