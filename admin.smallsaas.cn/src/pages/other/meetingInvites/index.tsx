import xx from '@/assets/xx.svg';
import { CopyOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { Avatar, Button, ConfigProvider, Divider, message, Typography } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import styles from './index.scss';

dayjs.extend(duration);

const { Text } = Typography;

const MeetingInvites: React.FC = () => {
  const { meetingId } = useParams();

  const [meetingInfo, setMeetingInfo] = useState<any>({});

  useEffect(() => {
    document.title = '会议邀请'; // 设置页面标题

    axios
      .get(`/v2/api/pub/newconf/meetingAgenda/${meetingId}`)
      .then((response: any) => {
        if (response.data.code === 200) {
          setMeetingInfo(response?.data?.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleJoinMeeting = () => {
    // 加入会议按钮通过协议调起客户端，并传递会议号
    if (meetingInfo.meetingNumber) {
      // const isWin = navigator.userAgent.toLowerCase().includes('win');
      const isProd = REACT_APP_ENV === 'prod'; //是否生产

      let accordUrl = '';
      if (isProd) {
        accordUrl = `xinzhi://newmeeting/joinmeeting?meetingnum=${meetingInfo.meetingNumber}`;
      } else {
        accordUrl = `xinzhitest://newmeeting/joinmeeting?meetingnum=${meetingInfo.meetingNumber}`;
      }
      window.location.href = accordUrl;
    } else {
      message.error('会议号获取失败，请稍后再试');
    }
  };

  const handleCopyInvite = () => {
    const inviteLink = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(inviteLink).then(
        () => {
          message.success('会议邀请链接已复制到剪贴板');
        },
        () => {
          message.error('复制失败，请手动复制');
        },
      );
    } else {
      // 兼容处理：使用文本区域进行复制
      const textArea = document.createElement('textarea');
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        message.success('会议邀请链接已复制到剪贴板');
      } catch (err) {
        message.error('复制失败，请手动复制');
      }
      document.body.removeChild(textArea);
    }
  };
  // 格式化会议号，每三位隔开
  const formatMeetingNumber = (meetingNumber: string | undefined | null) => {
    if (typeof meetingNumber === 'string') {
      return meetingNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '   ');
    }
    return '';
  };

  const meetingDurationMinutes = dayjs
    .duration(
      dayjs(Number(meetingInfo.meetingEndTime)).diff(dayjs(Number(meetingInfo.meetingStartTime))),
    )
    .asMinutes();

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src={xx} alt="" className={styles.logo} />
            <Text className={styles.text} type="secondary">
              新质数创
            </Text>
          </div>

          <div className={styles.topContent}>
            <div
              className={styles.meetingTitle}
            >{`${meetingInfo?.creatorUserName}预定的会议(${meetingInfo.title})`}</div>
            <Typography.Title
              className={styles.meetingNum}
              level={4}
              copyable={{
                text: meetingInfo?.meetingNumber,
                icon: <CopyOutlined className={styles.copyIcon} />,
              }}
            >
              {formatMeetingNumber(meetingInfo?.meetingNumber)}
            </Typography.Title>

            <div className={styles.meetingTime}>
              <div className={styles.detail_meeting_left}>
                <span className={styles.detail_meeting_start_time}>
                  {dayjs(Number(meetingInfo.meetingStartTime)).format('HH:mm')}
                </span>
                <span className={styles.detail_meeting_start_date} id="tm-meeting-start-date">
                  {dayjs(Number(meetingInfo.meetingStartTime)).format('YYYY年M月D日')}
                </span>
              </div>
              <div className={styles.detail_meeting_duration_container}>
                <div className={styles.detail_meeting_duration_content}>
                  <span className={styles.detail_short_gray_line}></span>
                  <span className={styles.detail_meeting_duration} id="tm-meeting-duration">
                    {meetingDurationMinutes} 分钟
                  </span>
                  <span className={styles.detail_short_gray_line}></span>
                </div>
                <span className={styles.detail_meeting_timezone} id="tm-meeting-timezone">
                  (GMT+08:00)中国标准时间
                </span>
              </div>
              <div className={styles.detail_meeting_time_right_container}>
                <span className={styles.detail_meeting_start_time} id="tm-meeting-end-time">
                  {dayjs(Number(meetingInfo.meetingEndTime)).format('HH:mm')}
                </span>
                <span className={styles.detail_meeting_start_date} id="tm-meeting-end-date">
                  {dayjs(Number(meetingInfo.meetingEndTime)).format('YYYY年M月D日')}
                </span>
              </div>
            </div>

            <Divider dashed />
            <div className={styles.meetingHost}>
              <Avatar className={styles.met_avatar} src={meetingInfo.creatorUserAvatar} />
              <div className={styles.met_info}>
                <span className={styles.met_name}>发起人</span>
                <div>{meetingInfo.creatorUserName}</div>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <Button type="primary" size="large" block onClick={handleJoinMeeting}>
              加入会议
            </Button>

            <Text className={styles.text1} type="secondary">
              您可以
              <Text className={styles.text2} onClick={handleCopyInvite}>
                复制会议邀请
              </Text>
              ，发送至会议成员
            </Text>
          </div>
          {/* 未安装 */}
          <div className={styles.fixedBottom}>
            <Divider className={styles.divider}>暂未安装？</Divider>
            <Button
              size="large"
              block
              onClick={() => {
                const userAgent = navigator.userAgent.toLowerCase();
                let downloadLink = '';
                console.log(userAgent);

                if (userAgent.indexOf('win') !== -1) {
                  downloadLink = 'http://meeting-test.xinzhisc.com/download/windows_voip';
                } else if (userAgent.indexOf('android') !== -1) {
                  downloadLink =
                    'http://meeting-test.xinzhisc.com/download/com.smartsee.newmeeting.debug';
                } else {
                  message.error('暂不支持Mac');
                  return;
                }
                window.location.href = downloadLink;
              }}
            >
              下载新质会议
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MeetingInvites;
