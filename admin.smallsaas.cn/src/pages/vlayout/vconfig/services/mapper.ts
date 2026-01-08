/**
 * 数据字段映射服务，用于转换后端API和UI之间的数据结构差异
 */

// 将API格式的布局转换为UI格式
export const convertApiLayoutToUi = (apiLayout: API.WeightLayout): API.WeightLayout => {
  if (!apiLayout) return {
    x: 0,
    y: 0,
    spacing: 10,
    margin: 20,
    colWeights: [1, 1, 1],
    rowWeights: [1, 1, 1],
    cellConfig: [],
    screenWidth: 0,
    screenHeight: 0,
  };
  
  // 递归处理所有嵌套布局
  const processNestedLayouts = (layout: API.WeightLayout): API.WeightLayout => {
    const result = { ...layout };
    
    // 深度复制单元格配置，并递归处理嵌套布局
    if (Array.isArray(result.cellConfig)) {
      result.cellConfig = result.cellConfig.map(cell => {
        const processedCell = { ...cell };
        
        // 如果单元格有嵌套布局，递归处理
        if (processedCell.layout) {
          processedCell.layout = processNestedLayouts(processedCell.layout);
        }
        
        return processedCell;
      });
    } else {
      result.cellConfig = [];
    }
    
    return {
      x: result.x || 0,
      y: result.y || 0,
      spacing: result.spacing || 0,
      margin: result.margin || 0,
      colWeights: result.colWeights || [1, 1, 1],
      rowWeights: result.rowWeights || [1, 1, 1],
      cellConfig: result.cellConfig,
      screenWidth: result.screenWidth || 0,
      screenHeight: result.screenHeight || 0,
    };
  };
  
  return processNestedLayouts(apiLayout);
};

// 将UI格式的布局转换为API格式
export const convertUiLayoutToApi = (uiLayout: API.WeightLayout): API.WeightLayout => {
  if (!uiLayout) return {
    x: 0,
    y: 0,
    spacing: 10,
    margin: 20,
    colWeights: [1, 1, 1],
    rowWeights: [1, 1, 1],
    cellConfig: [],
    screenWidth: 0,
    screenHeight: 0,
  };
  
  // 递归处理所有嵌套布局
  const processNestedLayouts = (layout: API.WeightLayout): API.WeightLayout => {
    const result = { ...layout };
    
    // 深度复制单元格配置，并递归处理嵌套布局
    if (Array.isArray(result.cellConfig)) {
      result.cellConfig = result.cellConfig.map(cell => {
        const processedCell = { ...cell };
        
        // 如果单元格有嵌套布局，递归处理
        if (processedCell.layout) {
          processedCell.layout = processNestedLayouts(processedCell.layout);
        }
        
        return processedCell;
      });
    } else {
      result.cellConfig = [];
    }
    
    return {
      x: result.x || 0,
      y: result.y || 0,
      spacing: result.spacing || 0,
      margin: result.margin || 0,
      colWeights: result.colWeights || [1, 1, 1],
      rowWeights: result.rowWeights || [1, 1, 1],
      cellConfig: result.cellConfig,
      screenWidth: result.screenWidth || 0,
      screenHeight: result.screenHeight || 0,
    };
  };
  
  return processNestedLayouts(uiLayout);
}; 