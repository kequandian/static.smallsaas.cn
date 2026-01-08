import PlayVideo from '@/components/PlayVideo';
import { Button, Modal, Space, Table } from 'antd';
import dayjs from 'dayjs';

type Props = {
  queryrecord: any;
  title?: string;
};

export const Info = (props: Props) => {
  const { queryrecord, title } = props;
  // 播放视频
  const onPaly = async (record: any) => {
    Modal.confirm({
      title: title,
      // destroyOnClose: true,
      maskClosable: true,
      icon: <></>,
      footer: null,
      closable: true,
      content: (
        <div>
          <PlayVideo
            url={record?.ori_play_url}
            // url={'http://202.63.172.185:60000/api/play?conf_uuid=22623B744A4F11EF93E9AC1F6B8B0F7B'}
          />
        </div>
      ),
      width: '80%',
    });
  };

  const columns: any[] = [
    {
      title: '文件名',
      dataIndex: 'conf_name',
      key: 'conf_name',
      ellipsis: true,
      render: (_, record: any) => {
        return <a type="link">{record.conf_name}</a>;
      },
    },

    {
      title: '大小（KB）',
      dataIndex: 'file_size',
      key: 'file_size',
      ellipsis: true,
    },

    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      ellipsis: true,
      render: (_, record: any) => {
        return dayjs(record.start_time).format('YYYY-MM-DD HH:mm:ss');
      },
    },

    {
      title: '时长',
      dataIndex: 'start_time',
      key: 'start_time',
      ellipsis: true,
      render: (_, record: any) => {
        const startTime = dayjs(record.start_time);
        const endTime = dayjs(record.end_time);

        // 计算两个日期之间的分钟数
        const minutesDifference = endTime.diff(startTime, 'minute');
        console.log(startTime, endTime, minutesDifference);

        return <div>{minutesDifference}分钟</div>;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record: any) => (
        <Space size={20}>
          <Button type="link" key="paly" onClick={() => onPaly(record)}>
            播放
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={queryrecord} columns={columns} />
      {/* <video
        controls
        src={'http://202.63.172.185:60000/api/play?conf_uuid=22623B744A4F11EF93E9AC1F6B8B0F7B'}
      ></video> */}
    </>
  );
};
