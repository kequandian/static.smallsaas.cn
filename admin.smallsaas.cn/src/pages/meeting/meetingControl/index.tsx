import { getMeetingsDetails } from '@/api/meeting';
import { getQueryrecord } from '@/api/smartSeePortalAPI';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { Basic } from './components/Basic';
import { Info } from './components/Info';
import './index.scss';

const MeetingControl: React.FC = () => {
  // const params = useParams();

  const [tabActive, setTabActive] = useState('basic');
  const [queryrecord, setQueryrecord] = useState('');
  const [meetingData, setMeetingData] = useState<any>();

  /**
   * 查询录像文件
   * @param url 请求地址
   * @param data 请求参数
   * @returns 返回mp4
   * @conf_name 750175522006125
   * @type mp4
   */
  // console.log(params);
  const { state } = history.location as any;
  const onQueryrecord = async () => {
    // console.log(state?.videoServicePrefix, state?.routeMeetingNumber);

    const recordParams = {
      conf_name: (state?.videoServicePrefix || '7501') + state?.routeMeetingNumber,
      type: 'mp4',
    };

    const res = await getQueryrecord(recordParams);
    if (res.code === 200) {
      setQueryrecord(res.data);
    }
  };

  const onMeetingsDetails = async () => {
    const res = await getMeetingsDetails(state.id);
    if (res.code === 200) {
      setMeetingData(res.data);
    }
  };

  useEffect(() => {
    onQueryrecord();
    onMeetingsDetails();
  }, []);
  return (
    <PageContainer
      title={meetingData?.title}
      tabList={[
        {
          tab: '基本信息',
          key: 'basic',
        },
        {
          tab: '会议视频',
          key: 'info',
        },
      ]}
      onTabChange={(key) => {
        setTabActive(key);
      }}
    >
      <ProCard title="基本信息">
        {tabActive === 'basic' && meetingData && <Basic meetingData={meetingData} />}
        {tabActive === 'info' && JSON.stringify(queryrecord) !== '{}' && (
          <Info queryrecord={queryrecord} title={meetingData?.title} />
        )}
      </ProCard>
    </PageContainer>
  );
};

export default MeetingControl;
