import { useImperativeHandle, useState } from 'react';

import { streamLiveApi } from '@/api/akstreamnvr';
import Icon from '@ant-design/icons';
import { Input, Modal, Tabs } from 'antd';
import ReactPlayer from 'react-player';

const PlayFormModal: React.FC<any> = ({ onRef }) => {
  // export default forwardRef(function Index(props, ref) {

  const [visible, setVisible] = useState(false);
  const [channelData, setChannelData] = useState<any>({});

  const [playUrlData, setPlayUrlData] = useState<any>({});

  const loadChannel = (mediaServerId: any, mainId: any) => {
    const query = {
      mediaServerId,
      mainId,
      secret: ZlMediaKit_Secret,
    };
    streamLiveApi(query).then((res) => {
      setPlayUrlData({
        flv: res.playUrl[1],
        hls: res.playUrl[4],
        rtmp: res.playUrl[3],
        rtsp: res.playUrl[2],
      });
      console.log(playUrlData);
    });
  };

  const onShow = (data: any) => {
    if (data) {
      setChannelData(data);
      loadChannel(data.mediaServerId, data.mainId);
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setChannelData({});
    setPlayUrlData({});
  };
  //回调
  useImperativeHandle(onRef, () => {
    return {
      onShow,
      onClose,
    };
  });
  return (
    <Modal
      title={`实时视频: ${channelData.channelName}`}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={null}
      width={1120}
      destroyOnClose={true}
    >
      <div className={'playForm-play-container'}>
        <div className={'playForm-play-header'}>
          <div className={'playForm-player'}>
            <ReactPlayer
              className="react-player"
              url={
                playUrlData.flv === undefined
                  ? `${AKSAPI}/` + channelData.app + '/' + channelData.mainId + '.live.flv'
                  : playUrlData.flv
              }
              width="100%"
              height="100%"
              playing={true}
              controls
            />
          </div>
        </div>

        <div className={'playForm-play-bottom'}>
          <div className={'playForm-calendar'}>
            <Tabs>
              <Tabs.TabPane tab="分享地址&视频源地址" key="1">
                <div className={'zpplayer-bottom-tab-pane'}>
                  <div>
                    <div>分享地址：</div>
                    <div>
                      <Input value={location.href} addonAfter={<Icon type="copy" />} />
                    </div>
                  </div>
                  <div>
                    <div>iframe：</div>
                    <div>
                      <Input
                        value={`<iframe src="${location.href}&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay"></iframe>`}
                        addonAfter={<Icon type="copy" />}
                      />
                    </div>
                  </div>
                  <div>
                    <div>flv：</div>
                    <div>
                      <Input value={playUrlData.flv} addonAfter={<Icon type="copy" />} />
                    </div>
                  </div>
                  <div>
                    <div>rtsp：</div>
                    <div>
                      <Input
                        value={
                          playUrlData?.rtsp === null
                            ? null
                            : playUrlData?.rtsp?.replace('http', 'rtsp')
                        }
                        addonAfter={<Icon type="copy" />}
                      />
                    </div>
                  </div>
                  <div>
                    <div>rtmp：</div>
                    <div>
                      <Input
                        value={
                          playUrlData.rtmp === null
                            ? null
                            : playUrlData.rtmp?.replace('http', 'rtmp')
                        }
                        addonAfter={<Icon type="copy" />}
                      />
                    </div>
                  </div>
                  <div>
                    <div>hls：</div>
                    <div>
                      <Input value={playUrlData.hls} addonAfter={<Icon type="copy" />} />
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default PlayFormModal;
