export type LayoutConfig = {
  cellConfig: Array<CellConfig>;
  colWeights: number[];
  rowWeights: number[];
  spacing: number;
  margin: number;
};

export type CellConfig = {
  id: string;
  col: number;
  colSpan: number; // 单元格间距
  row: number;
  rowSpan: number; // 行间距
  layout?: LayoutConfig | null;
};

export type NodeRect = {
  left: string;
  top: string;
  width: string;
  height: string;
  cell: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  children?: {
    nodes: NodeRect[];
    cssVar: {
      margin: number;
      spacing: number;
    };
  };
  id?: string;
};

/**
 * 生成网格行
 * @param colWeights
 * @param rowWeights
 */
function touchRows(colWeights: number[], rowWeights: number[]) {
  const h = rowWeights.reduce((acc, cur) => acc + cur, 0);
  const w = colWeights.reduce((acc, cur) => acc + cur, 0);

  const rows: NodeRect[][] = new Array(rowWeights.length).fill(0).map((_, rowIndex) => {
    const children = new Array(colWeights.length).fill(0).map((_, colIndex) => {
      const offsetX =
        colIndex === 0 ? 0 : colWeights.slice(0, colIndex).reduce((acc, cur) => acc + cur, 0);
      const offsetY =
        rowIndex === 0 ? 0 : rowWeights.slice(0, rowIndex).reduce((acc, cur) => acc + cur, 0);

      const cell = {
        width: (colWeights[colIndex] / w) * 100,
        height: (rowWeights[rowIndex] / h) * 100,
        left: (offsetX / w) * 100,
        top: (offsetY / h) * 100,
      };

      return {
        left: `${(offsetX / w) * 100}%`,
        top: `${(offsetY / h) * 100}%`,
        width: `${(colWeights[colIndex] / w) * 100}%`,
        height: `${(rowWeights[rowIndex] / h) * 100}%`,
        cell,
      };
    });

    return children;
  });

  return { rows, w, h };
}

/**
 * 传入布局配置，生成对应的布局网格大小数据
 */
export function touchGridLayout(layout: LayoutConfig) {
  const { cellConfig, colWeights, rowWeights, spacing, margin } = layout;

  const { rows } = touchRows(colWeights, rowWeights);
  const nodes: NodeRect[] = [];

  // 如果存在嵌套单元格
  cellConfig.forEach((cell) => {
    // 原本的单元格
    const rowIndex = cell.row - 1;
    const colIndex = cell.col - 1;
    const currrentCell = rows[rowIndex][colIndex];

    // 合并单元格
    if (cell.colSpan > 1 || cell.rowSpan > 1) {
      currrentCell.width = `${cell.colSpan * currrentCell.cell.width}%`;
      currrentCell.height = `${cell.rowSpan * currrentCell.cell.height}%`;
    }

    // 如果存在嵌套
    if (cell.layout) {
      const children = touchGridLayout(cell.layout);
      rows[rowIndex][colIndex].children = children;
    } else {
      rows[rowIndex][colIndex].id = cell.id || 'empty';
    }

    nodes.push(currrentCell);
  });

  return {
    nodes,
    cssVar: {
      margin: margin / 2, // 除以是用于外边距合并
      spacing,
    },
  };
}
