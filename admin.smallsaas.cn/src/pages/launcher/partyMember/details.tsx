import { uploadAuthentication } from '@/api/launcher';
import { usePartyOrg } from '@/hooks/usePartyOrg';
import cache from '@/utils/cache';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Avatar, Button, Col, message, Row, Space, Table, Tag, Upload } from 'antd';
import { useEffect, useState } from 'react';
import '../orgManager/index.scss';

const PartyManager: React.FC = () => {
  const { memberDetails, getMemberByIdApi } = usePartyOrg();
  const { id } = useParams();
  const [columns3data, setColumns3data] = useState<any>();
  const action = `${UPLOAD_IMG}`;

  useEffect(() => {
    getMemberByIdApi(id);
  }, []);

  // 认证
  const onAuthentication = async (type: any, info: any) => {
    console.log(type, info);

    switch (type) {
      case '人脸认证':
        uploadAuthentication({ id: memberDetails?.id, videoUrl: info }, 'uploadVideo').then(
          (res) => {
            if (res) {
              message.success('认证文件上传成功');
              getMemberByIdApi(id);
            }
          },
        );
        break;
      case '声音认证':
        uploadAuthentication({ id: memberDetails?.id, audioUrl: info }, 'uploadAudio').then(
          (res) => {
            if (res) {
              message.success('认证文件上传成功');
              getMemberByIdApi(id);
            }
          },
        );
        break;
      case '照片认证':
        uploadAuthentication({ id: memberDetails?.id, imgUrl: info }, 'uploadImg').then((res) => {
          if (res) {
            message.success('认证文件上传成功');
            getMemberByIdApi(id);
          }
        });
        break;
      case '身份认证':
        // message.success('认证文件上传成功');
        uploadAuthentication({ id: memberDetails?.id, cardUrl: info }, 'uploadIdentity').then(
          (res) => {
            if (res) {
              message.success('认证文件上传成功');
              getMemberByIdApi(id);
            }
          },
        );
        break;
      default:
        break;
    }
  };

  const columns_1 = [
    {
      title: '学校',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: '时间',
      dataIndex: 'experienceDate',
      key: 'experienceDate',
    },
    {
      title: '学历',
      dataIndex: 'experienceLevel',
      key: 'experienceLevel',
    },
    {
      title: '专业',
      dataIndex: 'profession',
      key: 'profession',
    },
  ];

  const columns_2 = [
    {
      title: '单位',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: '时间',
      dataIndex: 'experienceDate',
      key: 'experienceDate',
    },
    {
      title: '行业',
      dataIndex: 'experienceLevel',
      key: 'experienceLevel',
    },
    {
      title: '职务',
      dataIndex: 'profession',
      key: 'profession',
    },
  ];
  const columns_3 = [
    {
      title: '认证类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '认证内容',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '认证时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: any) => (
        <Tag color={!!record.status ? '#00B42A' : '#165DFF'}>
          {!!record.status ? '已认证' : '未认证'}
        </Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 160,

      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Upload
            name="file"
            headers={{ authorization: `Bearer ${cache.getToken()}` }}
            action={UPLOAD_IMG}
            showUploadList={false} // 不显示上传列表

            onChange={async (info: any) => {
              if (info.file.status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully`);
                await onAuthentication(record.type, info?.file?.response?.data?.fileUrl);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
          >
            <Button icon={<UploadOutlined />}>上传认证文件</Button>
          </Upload>
        </Space>
      ),
    },
  ];

  // 认证信息过滤 //根据columns_3对应的认证信息表格
  // const columns_3_data = columns_3.map((item) => {
  //   const authenticationType = {};
  //   return { type: item.dataIndex, name: item.title, date: '2023-01-01', status: '已认证' };
  // });
  useEffect(() => {
    const columns_3_data = [
      {
        type: '人脸认证',
        name: '视频',
        date: memberDetails?.videoDate,
        status: memberDetails?.isVideo,
      },
      {
        type: '声音认证',
        name: '音频',
        date: memberDetails?.videoDate,
        status: memberDetails?.isAudio,
      },
      {
        type: '照片认证',
        name: '证件照',
        date: memberDetails?.imgDate,
        status: memberDetails?.isImg,
      },
      {
        type: '身份认证',
        name: '身份证',
        date: memberDetails?.cardDate,
        status: memberDetails?.isCard,
      },
    ];
    setColumns3data(columns_3_data);
  }, [memberDetails]);

  // const onViewStructure = () => {
  //   history.push(`/launcher/party/orgManager/structure/${memberDetails?.id}`);
  // };

  return (
    <PageContainer title={false} className="org-manager">
      <div className="manager-content">
        <ProCard title="基础信息" className="base-card ">
          <Row>
            <Col className=" min-w-40">
              <Avatar size={100} src={<img src={memberDetails?.headUrl} alt="avatar" />} />
            </Col>
            <Col>
              <Row gutter={[0, 12]}>
                <Col span={2} className="labels">
                  姓名
                </Col>
                <Col span={4}>{memberDetails?.name}</Col>
                <Col span={2} className="labels">
                  入党时间
                </Col>
                <Col span={4}>{memberDetails?.joinDate}</Col>
                <Col span={2} className="labels">
                  性别
                </Col>
                <Col span={4}>{memberDetails?.sex ? '男' : '女'}</Col>
                <Col span={2} className="labels">
                  党龄
                </Col>
                <Col span={4}>{memberDetails?.partyAge}</Col>
                <Col span={2} className="labels">
                  出生年月
                </Col>
                <Col span={4}>{memberDetails?.birthDate}</Col>
                <Col span={2} className="labels">
                  民族
                </Col>
                <Col span={4}>{memberDetails?.nation}</Col>
                <Col span={2} className="labels">
                  党内职位
                </Col>
                <Col span={4}>{memberDetails?.profession}</Col>
                <Col span={2} className="labels">
                  手机号
                </Col>
                <Col span={4} className="labels">
                  {memberDetails?.phone}
                </Col>
                <Col span={2} className="labels">
                  email
                </Col>
                <Col span={4} className="labels">
                  {memberDetails?.email}
                </Col>
              </Row>
            </Col>
          </Row>
        </ProCard>
        <ProCard title="组织信息" className="name-card mt-3">
          <Row gutter={[0, 10]}>
            <Col span={6}>
              <span className="labels">党内职位</span>
              <span>{memberDetails?.profession}</span>
            </Col>
            <Col span={6}>
              <span className="labels">所在党支部</span>
              <span>{memberDetails?.partyOrganizationName || '暂无数据'}</span>
            </Col>
            <Col span={6}>
              <span className="labels">党内编号</span>
              <span>{memberDetails?.memberCode || '暂无数据'}</span>
            </Col>
            {/* <Col span={5}>
              <span className="labels">党费缴纳情况</span>
              <span>{'暂无数据'}</span>
            </Col> */}
            {/* <Col span={6}>
              <div className="text-a" onClick={onViewStructure}>
                查看组织架构
              </div>
            </Col> */}
          </Row>
        </ProCard>
        <ProCard title="党员学历" className="name-card mt-3">
          <Table
            columns={columns_1}
            pagination={false}
            dataSource={memberDetails?.educationalList}
          />
        </ProCard>
        <ProCard title="工作经历" className="name-card mt-3">
          <Table columns={columns_2} pagination={false} dataSource={memberDetails?.societyList} />
        </ProCard>
        <ProCard title="认证信息" className="name-card mt-3">
          <Table columns={columns_3 as any} pagination={false} dataSource={columns3data} />
        </ProCard>
      </div>
    </PageContainer>
  );
};

export default PartyManager;
