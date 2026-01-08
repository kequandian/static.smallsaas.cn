declare namespace API {
  type activateParams = {
    deviceId: string;
    appPackage: string;
    activateCode: string;
  };

  type ApiResult = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type ApiResultBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
  };

  type ApiResultDeviceAttributeDTOResp = {
    code?: number;
    message?: string;
    data?: DeviceAttributeDTOResp;
  };

  type ApiResultDeviceStrategyDTOResp = {
    code?: number;
    message?: string;
    data?: DeviceStrategyDTOResp;
  };

  type ApiResultListMdmAppDTO = {
    code?: number;
    message?: string;
    data: MdmAppDTO[];
  };

  type ApiResultListMdmAppOtaPlanDTO = {
    code?: number;
    message?: string;
    data?: MdmAppOtaPlanDTO[];
  };

  type ApiResultListMdmChannelDTO = {
    code?: number;
    message?: string;
    data?: MdmChannelDTO[];
  };

  type ApiResultListMdmFirmwareDTO = {
    code?: number;
    message?: string;
    data: MdmFirmwareDTO[];
  };

  type ApiResultListMdmFirmwareOtaPlanDTO = {
    code?: number;
    message?: string;
    data?: MdmFirmwareOtaPlanDTO[];
  };

  type ApiResultListMdmStrategyDTO = {
    code?: number;
    message?: string;
    data?: MdmStrategyDTO[];
  };

  type ApiResultListMdmStrategyItemDTO = {
    code?: number;
    message?: string;
    data?: MdmStrategyItemDTO[];
  };

  type ApiResultListNameAndCodeItemDTO = {
    code?: number;
    message?: string;
    data: NameAndCodeItemDTO[];
  };

  type ApiResultLong = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ApiResultMdmAppOtaPlanDTO = {
    code?: number;
    message?: string;
    data?: MdmAppOtaPlanDTO;
  };

  type ApiResultMdmChannelDTO = {
    code?: number;
    message?: string;
    data?: MdmChannelDTO;
  };

  type ApiResultMdmFirmwareOtaPlanDTO = {
    code?: number;
    message?: string;
    data?: MdmFirmwareOtaPlanDTO;
  };

  type ApiResultMdmStrategyDTO = {
    code?: number;
    message?: string;
    data?: MdmStrategyDTO;
  };

  type ApiResultMdmStrategyItemDTO = {
    code?: number;
    message?: string;
    data?: MdmStrategyItemDTO;
  };

  type ApiResultObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type ApiResultPageMdmAppOtaHistoryDTO = {
    code?: number;
    message?: string;
    data?: PageMdmAppOtaHistoryDTO;
  };

  type ApiResultPageMdmAppOtaPlanDTO = {
    code?: number;
    message?: string;
    data?: PageMdmAppOtaPlanDTO;
  };

  type ApiResultPageMdmChannelDTO = {
    code?: number;
    message?: string;
    data: PageMdmChannelDTO;
  };

  type ApiResultPageMdmDeviceAppActivateHistoryDTO = {
    code?: number;
    message?: string;
    data?: PageMdmDeviceAppActivateHistoryDTO;
  };

  type ApiResultPageMdmDeviceAppDTO = {
    code?: number;
    message?: string;
    data?: PageMdmDeviceAppDTO;
  };

  type ApiResultPageMdmFirmwareOtaHistoryDTO = {
    code?: number;
    message?: string;
    data?: PageMdmFirmwareOtaHistoryDTO;
  };

  type ApiResultPageMdmFirmwareOtaPlanDTO = {
    code?: number;
    message?: string;
    data?: PageMdmFirmwareOtaPlanDTO;
  };

  type ApiResultPageMdmStrategyDTO = {
    code?: number;
    message?: string;
    data: PageMdmStrategyDTO;
  };

  type ApiResultPageMdmStrategyItemDTO = {
    code?: number;
    message?: string;
    data: PageMdmStrategyItemDTO;
  };

  type attributeParams = {
    deviceId: string;
  };

  type checkActivateParams = {
    /** 设备标识 */
    deviceId: string;
    /** 应用包名 */
    appPackage: string;
  };

  type delete1Params = {
    id: number;
  };

  type delete2Params = {
    id: number;
  };

  type delete3Params = {
    id: number;
  };

  type delete4Params = {
    id: number;
  };

  type delete5Params = {
    id: number;
  };

  type delete6Params = {
    id: number;
  };

  type delete7Params = {
    id: number;
  };

  type delete8Params = {
    id: number;
  };

  type deleteUsingDELETEParams = {
    id: number;
  };

  type DeviceAttributeDTOResp = {
    /** 设备标识 */
    deviceId?: string;
    /** 设备名称 */
    deviceName?: string;
    /** 是否在线 */
    online?: boolean;
    /** 属性表 */
    attributes?: Record<string, any>;
  };

  type DeviceCommandDTOReq = {
    /** 设备标识 */
    deviceId: string;
    /** 指令类型 */
    command: string;
    /** 指令内容 k-v */
    payload?: Record<string, any>;
    /** 超时秒数 默认20s */
    timeout?: number;
  };

  type DeviceExecStrategyDTOReq = {
    /** 设备标识 */
    deviceId: string;
    /** 策略id */
    strategyId?: number;
    /** 是否强制刷新 */
    forceRefresh?: boolean;
  };

  type DeviceStrategyDTOResp = {
    /** 设备关联的策略列表 */
    strategy?: MdmStrategyDTO;
    /** 设备关联的策略内容列表 */
    strategyItems?: MdmStrategyItemDTO[];
  };

  type exec1Params = {
    id: number;
  };

  type execParams = {
    id: number;
  };

  type get1Params = {
    id: number;
  };

  type get2Params = {
    id: number;
  };

  type get3Params = {
    id: number;
  };

  type get4Params = {
    id: number;
  };

  type getParams = {
    id: number;
  };

  type list1Params = {
    /** 名称 */
    name?: string;
    /** 策略编号 */
    num?: string;
  };

  type list2Params = {
    /** 任务名称 */
    name?: string;
    /** 渠道名称 */
    channelName?: string;
  };

  type list4Params = {
    /** 名称 */
    name?: string;
    /** 渠道编号 */
    num?: string;
  };

  type list5Params = {
    /** 任务名称 */
    name?: string;
    /** 渠道名称 */
    channelName?: string;
  };

  type listParams = {
    /** 名称 */
    name?: string;
    /** 策略类型 1 禁用 2 白名单 */
    itemType?: number;
  };

  type MdmAppDTO = {
    /** 应用包名 */
    appPackage?: string;
    /** 应用名称 */
    name?: string;
  };

  type MdmAppOtaHistoryDTO = {
    /** 主键id */
    id?: number;
    /** 设备云端标识 */
    deviceId?: string;
    /** 应用名称 */
    name?: string;
    /** 应用包名 */
    appPackage?: string;
    /** 升级前版本 */
    beforeVersion?: string;
    /** 升级后版本 */
    afterVersion?: string;
    /** 是否升级成功 */
    upgradeSuccess?: boolean;
    /** 失败原因 */
    failReason?: string;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type MdmAppOtaPlanDTO = {
    /** 主键id */
    id?: number;
    /** 名称 */
    name: string;
    /** 应用包名 */
    appPackage: string;
    /** 渠道id */
    channelId: number;
    /** 执行类型 1 定时执行 2 非定时执行 */
    execType: number;
    /** 执行时间 */
    execTime?: string;
    /** 应用名称 创建更新为空即可 */
    packageName?: string;
    /** 应用版本 创建更新为空即可 */
    lastVersion?: string;
    /** 执行状态 1 未开始 2 已执行 创建更新为空即可 */
    execStatus?: number;
    /** 渠道名称 创建更新为空即可 */
    channelName?: string;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type MdmChannelDTO = {
    /** 主键id */
    id?: number;
    /** 名称 */
    name: string;
    /** 渠道编号 */
    num?: string;
    /** 策略id数组 */
    strategyIds?: number[];
    /** 组织id数组 */
    orgIds?: number[];
    /** 组织数量 创建更新为空即可 */
    orgCount?: number;
    /** 设备数量 创建更新为空即可 */
    deviceCount?: number;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type MdmDeviceAppActivateHistoryDTO = {
    /** 主键id */
    id?: number;
    /** 设备云端标识 */
    deviceId?: string;
    /** 应用名称 */
    name?: string;
    /** 应用包名 */
    appPackage?: string;
    /** 设备激活码 */
    activateCode?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 是否永久不过期 */
    neverExpire?: boolean;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type MdmDeviceAppDTO = {
    /** 主键id */
    id?: number;
    /** 设备云端标识 */
    deviceId?: string;
    /** 应用名称 */
    name?: string;
    /** 应用包名 */
    appPackage?: string;
    /** 设备激活码 */
    activateCode?: string;
    /** 激活状态 -> 1:激活， 0:未激活 */
    activation?: string;
    /** 过期时间 */
    expireTime?: string;
    /** 是否永久不过期 */
    neverExpire?: boolean;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
    /** 设备名称 创建更新为空即可 */
    deviceName?: string;
    /** 设备Sn 创建更新为空即可 */
    deviceSn?: string;
  };

  type MdmFirmwareDTO = {
    /** 固件名称 */
    name?: string;
    /** 模块标识 */
    moduleIdentify?: string;
  };

  type MdmFirmwareOtaHistoryDTO = {
    /** 主键id */
    id?: number;
    /** 设备云端标识 */
    deviceId?: string;
    /** 名称 */
    name?: string;
    /** 模块标识 */
    moduleIdentify?: string;
    /** 升级前版本 */
    beforeVersion?: string;
    /** 升级后版本 */
    afterVersion?: string;
    /** 是否升级成功 */
    upgradeSuccess?: boolean;
    /** 失败原因 */
    failReason?: string;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type MdmFirmwareOtaPlanDTO = {
    /** 主键id */
    id?: number;
    /** 名称 */
    name: string;
    /** 模块标识 */
    moduleIdentify: string;
    /** 渠道id */
    channelId: number;
    /** 执行类型 1 定时执行 2 非定时执行 */
    execType: number;
    /** 执行时间 */
    execTime?: string;
    /** 固件名称 创建更新为空即可 */
    firmwareName?: string;
    /** 固件版本 创建更新为空即可 */
    lastVersion?: string;
    /** 渠道名称 创建更新为空即可 */
    channelName?: string;
    /** 执行状态 1 未开始 2 已执行 创建更新为空即可 */
    execStatus?: number;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type MdmStrategyDTO = {
    /** 主键id */
    id?: number;
    /** 名称 */
    name: string;
    /** 策略编号 自动生成 创建更新为空即可 */
    num?: string;
    /** 描述 */
    description?: string;
    /** 开机自动应用 */
    autoApply?: boolean;
    /** 应用端类型 1 平板 2 大屏 */
    appType: number;
    /** 策略内容 */
    params: string;
    /** 策略内容id数组 */
    strategyItemIds?: number[];
    /** 策略内容数组 创建更新为空即可 */
    strategyItems?: MdmStrategyItemDTO[];
    /** 渠道数量 创建更新为空即可 */
    channelCount?: number;
    /** 设备数量 创建更新为空即可 */
    deviceCount?: number;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
  };

  type MdmStrategyItemDTO = {
    /** 主键id */
    id?: number;
    /** 名称 */
    name: string;
    /** 标识 */
    identify: string;
    /** 分类标识 */
    category: string;
    /** 策略类型 1 禁用 2 应用白名单 3 外设白名单 */
    itemType: number;
    /** itemType=1:allow/deny, itemType=2or3:[{"appPackage":"com.app.package1","appPackage":"com.app.package2"}] */
    params?: string;
    /** 创建时间 创建更新为空即可 */
    createTime?: string;
    /** 更新时间 创建更新为空即可 */
    updateTime?: string;
    /** 分类名称 创建更新为空即可 */
    categoryName?: string;
  };

  type NameAndCodeItemDTO = {
    /** 代码 */
    code?: string;
    /** 名称 */
    name?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type page1Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 名称 */
    name?: string;
    /** 策略编号 */
    num?: string;
  };

  type page2Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 任务名称 */
    name?: string;
    /** 渠道名称 */
    channelName?: string;
  };

  type page3Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 固件名称 */
    name?: string;
    /** 模块标识 */
    moduleIdentify?: string;
    /** 设备标识 */
    deviceId?: string;
  };

  type page4Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 名称 */
    name?: string;
    /** 设备标识 */
    deviceId?: string;
    /** 包名 */
    appPackage?: string;
  };

  type page5Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 设备名称 */
    deviceName?: string;
    /** 设备Sn */
    deviceSn?: string;
    /** 设备Id */
    deviceId?: string;
  };

  type page6Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 名称 */
    name?: string;
    /** 渠道编号 */
    num?: string;
  };

  type page7Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 任务名称 */
    name?: string;
    /** 渠道名称 */
    channelName?: string;
  };

  type page8Params = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 应用名称 */
    name?: string;
    /** 设备标识 */
    deviceId?: string;
    /** 包名 */
    appPackage?: string;
  };

  type PageMdmAppOtaHistoryDTO = {
    records?: MdmAppOtaHistoryDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmAppOtaHistoryDTO;
    searchCount?: PageMdmAppOtaHistoryDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmAppOtaPlanDTO = {
    records?: MdmAppOtaPlanDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmAppOtaPlanDTO;
    searchCount?: PageMdmAppOtaPlanDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmChannelDTO = {
    records: MdmChannelDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmChannelDTO;
    searchCount?: PageMdmChannelDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmDeviceAppActivateHistoryDTO = {
    records?: MdmDeviceAppActivateHistoryDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmDeviceAppActivateHistoryDTO;
    searchCount?: PageMdmDeviceAppActivateHistoryDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmDeviceAppDTO = {
    records?: MdmDeviceAppDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmDeviceAppDTO;
    searchCount?: PageMdmDeviceAppDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmFirmwareOtaHistoryDTO = {
    records?: MdmFirmwareOtaHistoryDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmFirmwareOtaHistoryDTO;
    searchCount?: PageMdmFirmwareOtaHistoryDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmFirmwareOtaPlanDTO = {
    records?: MdmFirmwareOtaPlanDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmFirmwareOtaPlanDTO;
    searchCount?: PageMdmFirmwareOtaPlanDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmStrategyDTO = {
    records: MdmStrategyDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmStrategyDTO;
    searchCount?: PageMdmStrategyDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageMdmStrategyItemDTO = {
    records: MdmStrategyItemDTO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageMdmStrategyItemDTO;
    searchCount?: PageMdmStrategyItemDTO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type pageParams = {
    /** 第几页 开始为1 */
    pageNum?: number;
    /** 一页多少条 */
    pageSize?: number;
    /** 名称 */
    name?: string;
    /** 策略类型 1 禁用 2 白名单 */
    itemType?: number;
  };

  type strategyParams = {
    deviceId: string;
    forceRefresh?: boolean;
  };
}
