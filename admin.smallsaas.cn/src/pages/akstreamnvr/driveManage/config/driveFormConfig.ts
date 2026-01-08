import { getMediaServerList, getRecordPlanList } from '@/api/akstreamnvr';

export const driveFormConfig = [
  {
    title: '流媒体服务器',
    valueType: 'select',
    dataIndex: 'mediaServerId',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择ID',
        },
      ],
    },
    tooltip: '流媒体服务器的ID',
    placeholder: '请选择',
    request: async () => await getMediaServerList(),
    fieldProps: { fieldNames: { label: 'mediaServerId', value: 'mediaServerId' } },
    width: 'md',
  },
  {
    title: 'App',
    valueType: 'input',
    dataIndex: 'app',
    tooltip: '应用标识APP',
    placeholder: 'rtp',
    width: 'md',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入应用标识APP',
        },
      ],
    },
  },
  {
    title: 'vhost',
    valueType: 'input',
    dataIndex: 'vhost',
    tooltip: '虚拟主机vhost',
    placeholder: '_defaultVhost_',
    width: 'md',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入vhost',
        },
      ],
    },
  },
  {
    title: '设备名称',
    valueType: 'input',
    dataIndex: 'channelName',
    placeholder: '请输入',
    width: 'md',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入设备名称',
        },
      ],
    },
  },
  {
    title: 'Device ID',
    valueType: 'input',
    dataIndex: 'deviceId',
    placeholder: '请输入',
    width: 'md',
  },
  {
    title: 'Channel ID',
    valueType: 'input',
    dataIndex: 'channelId',
    placeholder: '请输入',
    width: 'md',
  },
  {
    title: 'ipV4',
    valueType: 'input',
    dataIndex: 'ipV4Address',
    tips: '请输入ipV4',
    placeholder: '请输入',
    width: 'md',
  },
  {
    title: '录制计划模板名称',
    valueType: 'selectFetch',
    dataIndex: 'recordPlanName',
    placeholder: '请选择',
    width: 'md',
    request: async () => await getRecordPlanList(),
    fieldProps: { fieldNames: { label: 'name', value: 'name' } },
  },
  {
    title: '录制时长（秒）',
    dataIndex: 'recordSecs',
    placeholder: '请输入',
    width: 'md',
  },
  {
    title: '网络类型',
    valueType: 'radioButton',
    dataIndex: 'deviceNetworkType',
    tips: '请选择网络类型',
    tooltip: '固定网络、移动网络',
    fieldProps: {
      options: [
        { label: 'Fixed', value: 'Fixed' },
        { label: 'Mobile', value: 'Mobile' },
      ],
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择网络类型',
        },
      ],
    },
    width: 'md',
  },
  {
    title: '设备类型',
    valueType: 'radioButton',
    dataIndex: 'videoDeviceType',
    fieldProps: {
      options: [
        { label: 'NVR', value: 'NVR' },
        { label: 'DVR', value: 'DVR' },
        { label: 'IPC', value: 'IPC' },
        { label: 'UNKNOW', value: 'UNKNOW' },
      ],
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择设备类型',
        },
      ],
    },
    width: 'md',
  },
  {
    title: '设备流类型',
    valueType: 'radioButton',
    dataIndex: 'deviceStreamType',
    fieldProps: {
      options: [
        { label: 'GB28181', value: 'GB28181' },
        { label: 'Rtsp', value: 'Rtsp' },
        { label: 'Http', value: 'Http' },
        { label: 'Rtmp', value: 'Rtmp' },
      ],
    },
    width: 'md',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择设备流类型',
        },
      ],
    },
  },
  {
    title: '拉流方式',
    valueType: 'radioButton',
    dataIndex: 'methodByGetStream',
    fieldProps: {
      options: [
        { label: 'None', value: 'None' },
        { label: 'SelfMethod', value: 'SelfMethod' },
        { label: 'UseFFmpeg', value: 'UseFFmpeg' },
      ],
    },
    width: 'md',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选拉流方式',
        },
      ],
    },
  },
  {
    title: 'Rtsp视频地址',
    valueType: 'input',
    dataIndex: 'videoSrcUrl',
    placeholder: '请输入',
    width: 'md',
    tooltip: '仅在拉流方式是SelfMethod或UseFFmpeg时需要，默认None为GB28181拉流',
  },
  {
    title: '协议类型',
    valueType: 'radioButton',
    dataIndex: 'rtpWithTcp',
    fieldProps: {
      options: [
        { label: 'UDP', value: false },
        { label: 'TCP', value: true },
      ],
    },
    width: 'md',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选协议类型',
        },
      ],
    },
  },
  {
    title: '自动推流',
    valueType: 'switch',
    dataIndex: 'autoVideo',
    tooltip: '服务开启后一直推流',
    width: 'md',
  },
  {
    title: '自动断流',
    valueType: 'switch',
    dataIndex: 'noPlayerBreak',
    tooltip: '无人观看自动断流，启用自动推流请勿启用自动断流',
    width: 'md',
  },
  {
    title: '自动录制',
    valueType: 'switch',
    dataIndex: 'autoRecord',
    tooltip: '服务开启后一直推流',
    width: 'md',
  },
  {
    title: '云台控制',
    valueType: 'switch',
    dataIndex: 'hasPtz',
    width: 'md',
  },
  {
    title: '默认端口',
    valueType: 'switch',
    dataIndex: 'defaultRtpPort',
    tooltip: '设备是否使用流媒体默认rtp端口，如10000端口',
    width: 'md',
  },
  {
    title: '启用',
    valueType: 'switch',
    dataIndex: 'enabled',
    tooltip: '是否启用设备',
    width: 'md',
  },
];
