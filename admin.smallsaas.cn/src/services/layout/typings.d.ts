declare namespace API {
  type ApiResultBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
  };

  type ApiResultLayoutConfigDTO = {
    code?: number;
    message?: string;
    data?: LayoutConfigDTO;
  };

  type ApiResultListLayoutConfigDTO = {
    code?: number;
    message?: string;
    data?: LayoutConfigDTO[];
  };

  type ApiResultListWeightCellPosition = {
    code?: number;
    message?: string;
    data?: WeightCellPosition[];
  };

  type ApiResultLong = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ApiResultPageLayoutConfigDTO = {
    code?: number;
    message?: string;
    data?: PageLayoutConfigDTO;
  };

  type layoutConfigDeleteParams = {
    id: number;
  };

  type LayoutConfigDTO = {
    /** 主键id */
    id?: number;
    /** 代码 */
    code: string;
    /** 名称 */
    name: string;
    layout: WeightLayout;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type layoutConfigGetParams = {
    id: number;
  };

  type layoutConfigListParams = {
    /** 名称 */
    name?: string;
    /** 代码 */
    code?: string;
  };

  type layoutConfigPageParams = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 名称 */
    name?: string;
    /** 代码 */
    code?: string;
  };

  type layoutConfigCopyParams = {
    /** 布局配置id */
    id?: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageLayoutConfigDTO = {
    records?: LayoutConfigDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageLayoutConfigDTO;
    searchCount?: PageLayoutConfigDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type WeightCellConfig = {
    id?: string;
    col?: number;
    row?: number;
    layout?: WeightLayout;
    colSpan?: number;
    rowSpan?: number;
    params?: string;
  };

  type WeightCellPosition = {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    id?: string;
  };

  type WeightLayout = {
    x?: number;
    y?: number;
    spacing?: number;
    margin?: number;
    cellConfig?: WeightCellConfig[];
    colWeights?: number[];
    rowWeights?: number[];
    screenHeight?: number;
    screenWidth?: number;
  };
}
