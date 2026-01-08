declare namespace API {
  type ApiResultFileManagementRespDTO_ = {
    code?: number;
    data?: FileManagementRespDTO;
    message?: string;
  };

  type ApiResultInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type ApiResultIssueRespDTO_ = {
    code?: number;
    data?: IssueRespDTO;
    message?: string;
  };

  type ApiResultIssueTemplateRespDTO_ = {
    code?: number;
    data?: IssueTemplateRespDTO;
    message?: string;
  };

  type ApiResultLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type ApiResultPageResultFileManagementRespDTO_ = {
    code?: number;
    data?: PageResultFileManagementRespDTO_;
    message?: string;
  };

  type ApiResultPageResultIssueRespDTO_ = {
    code?: number;
    data?: PageResultIssueRespDTO_;
    message?: string;
  };

  type ApiResultPageResultIssueTemplateRespDTO_ = {
    code?: number;
    data: PageResultIssueTemplateRespDTO_;
    message?: string;
  };

  type deleteUsingDELETE3Params = {
    /** 文件ID */
    id: number;
  };

  type deleteUsingDELETE4Params = {
    /** 议题ID */
    id: number;
  };

  type deleteUsingDELETE5Params = {
    /** 主键id */
    id: number;
  };

  type FileManagementReqDTO = {
    /** 访问级别 0：私有的 1: 公开的 */
    accessLevel?: number;
    /** 文件业务类型（根据业务进行定义） */
    fileBusinessType?: number;
    /** 文件名 */
    fileName: string;
    /** 文件大小 单位b */
    fileSize?: number;
    /** 文件类型 */
    fileType?: string;
    /** 文件路径 */
    fileUrl: string;
    /** 主键 创建的时候为空即可 */
    id?: number;
  };

  type FileManagementRespDTO = {
    /** 访问级别 0：私有的 1: 公开的 */
    accessLevel?: number;
    /** 用户者 */
    createBy?: number;
    /** 创建时间 */
    createTime?: string;
    /** 创建用户类型 */
    createUserType?: number;
    /** 文件业务类型（根据业务进行定义） */
    fileBusinessType?: number;
    /** 文件名 */
    fileName?: string;
    /** 文件大小 单位b */
    fileSize?: number;
    /** 文件类型 */
    fileType?: string;
    /** 文件路径 */
    fileUrl?: string;
    /** 主键 */
    id?: number;
    /** 组织id */
    orgId?: number;
    /** 更新时间 */
    updateTime?: string;
  };

  type getUsingGET1Params = {
    /** 议题ID */
    id: number;
  };

  type getUsingGET2Params = {
    /** 主键id */
    id: number;
  };

  type getUsingGETParams = {
    /** 文件ID */
    id: number;
  };

  type IssueReqDTO = {
    /** 附件路径 */
    attachmentUrl?: string;
    /** 主键，创建时为空即可 */
    id?: number;
    /** 子议题列表 */
    subIssues?: SubIssueReqDTO[];
    /** 模版id */
    templateId?: number;
    /** 议题主题 */
    title: string;
  };

  type IssueRespDTO = {
    /** 审批状态 */
    approvalStatus?: number;
    /** 附件路径 */
    attachmentUrl?: string;
    /** 创建者id */
    createBy?: number;
    /** 创建时间 */
    createTime?: string;
    /** 创建者用户类型 */
    createUserType?: number;
    /** 分发状态 */
    distributeStatus?: number;
    /** 组织id */
    orgId?: number;
    /** 子议题列表 */
    subIssues?: SubIssueRespDTO[];
    /** 模版id */
    templateId?: number;
    /** 议题主题 */
    title?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type IssueTemplateReqDTO = {
    /** 模版文件路径 */
    fileUrl: string;
    /** 主键 */
    id?: number;
    /** 模版名称 */
    name: string;
    /** 类型 */
    type?: number;
  };

  type IssueTemplateRespDTO = {
    /** 创建者 */
    createBy?: number;
    /** 创建时间 */
    createTime?: string;
    /** 创建用户类型 */
    createUserType?: number;
    /** 模版文件路径 */
    fileUrl?: string;
    /** 模版名称 */
    name?: string;
    /** 组织id */
    orgId?: number;
    /** 类型 */
    type?: number;
    /** 更新时间 */
    updateTime?: string;
  };

  type PageResultFileManagementRespDTO_ = {
    current?: number;
    pages?: number;
    records?: FileManagementRespDTO[];
    size?: number;
    total?: number;
  };

  type PageResultIssueRespDTO_ = {
    current?: number;
    pages?: number;
    records?: IssueRespDTO[];
    size?: number;
    total?: number;
  };

  type PageResultIssueTemplateRespDTO_ = {
    current?: number;
    pages?: number;
    records: IssueTemplateRespDTO[];
    size?: number;
    total?: number;
  };

  type pageUsingGET2Params = {
    /** 页码 */
    pageNum?: string;
    /** 每页数量 */
    pageSize?: string;
  };

  type pageUsingGET3Params = {
    /** 页码 */
    pageNum?: string;
    /** 每页数量 */
    pageSize?: string;
  };

  type pageUsingGET4Params = {
    /** 页码 */
    pageNum?: string;
    /** 每页数量 */
    pageSize?: string;
  };

  type SubIssueReqDTO = {
    /** 主键id */
    id?: number;
    /** 子议题标题 */
    title?: string;
  };

  type SubIssueRespDTO = {
    /** 创建时间 */
    createTime?: string;
    /** 主键id */
    id?: number;
    /** 议题id */
    issueId?: number;
    /** 子议题标题 */
    title?: string;
    /** 更新时间 */
    updateTime?: string;
  };
}
