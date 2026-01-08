import { Gauge, Liquid, WordCloud } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
// import { IconIntro } from '@douyinfe/semi-icons';
import { useRequest } from '@umijs/max';
import { Card, Col, Progress, Row, Statistic } from 'antd';
import { createStyles } from 'antd-style';
import type { FC } from 'react';
import ActiveChart from './components/ActiveChart';
import Map from './components/Map';

export async function queryTags(): Promise<{ data: { list: any[] } }> {
  return {
    data: {
      list: [
        { name: '石嘴山市', value: 81, type: 0 },
        { name: '天津市', value: 94, type: 2 },
        { name: '随州市', value: 24, type: 1 },
        { name: '三明市', value: 95, type: 1 },
        { name: '河源市', value: 22, type: 0 },
        { name: '海北藏族自治州', value: 59, type: 0 },
        { name: '忻州市', value: 37, type: 0 },
        { name: '三亚市', value: 43, type: 1 },
        { name: '三沙市', value: 36, type: 0 },
        { name: '四平市', value: 29, type: 0 },
        { name: '大连市', value: 37, type: 0 },
        { name: '天津市', value: 64, type: 0 },
        { name: '铜仁市', value: 68, type: 1 },
        { name: '马鞍山市', value: 5, type: 1 },
        { name: '海口市', value: 52, type: 2 },
        { name: '黄石市', value: 88, type: 0 },
        { name: '上海市', value: 48, type: 2 },
        { name: '齐齐哈尔市', value: 97, type: 0 },
        { name: '吴忠市', value: 66, type: 1 },
        { name: '阿里地区', value: 64, type: 2 },
        { name: '秦皇岛市', value: 54, type: 1 },
        { name: '榆林市', value: 88, type: 2 },
        { name: '马鞍山市', value: 16, type: 0 },
        { name: '上海市', value: 91, type: 1 },
        { name: '宜昌市', value: 76, type: 1 },
        { name: '北海市', value: 63, type: 2 },
        { name: '香港岛', value: 32, type: 1 },
        { name: '莱芜市', value: 83, type: 0 },
        { name: '常德市', value: 96, type: 1 },
        { name: '西安市', value: 1, type: 2 },
        { name: '衢州市', value: 18, type: 1 },
        { name: '绍兴市', value: 82, type: 2 },
        { name: '乐山市', value: 32, type: 2 },
        { name: '吴忠市', value: 61, type: 2 },
        { name: '盘锦市', value: 39, type: 2 },
        { name: '香港岛', value: 72, type: 1 },
        { name: '白城市', value: 21, type: 1 },
        { name: '新界', value: 76, type: 1 },
        { name: '香港岛', value: 4, type: 1 },
        { name: '重庆市', value: 33, type: 1 },
        { name: '海南藏族自治州', value: 7, type: 1 },
        { name: '上海市', value: 47, type: 0 },
        { name: '邵阳市', value: 36, type: 1 },
        { name: '天津市', value: 7, type: 2 },
        { name: '金门县', value: 33, type: 1 },
        { name: '金华市', value: 32, type: 0 },
        { name: '长治市', value: 46, type: 1 },
        { name: '西安市', value: 54, type: 1 },
        { name: '鄂州市', value: 58, type: 1 },
        { name: '澳门半岛', value: 68, type: 2 },
        { name: '吴忠市', value: 27, type: 2 },
        { name: '宜兰县', value: 79, type: 0 },
        { name: '遵义市', value: 46, type: 1 },
        { name: '榆林市', value: 100, type: 0 },
        { name: '台州市', value: 57, type: 1 },
        { name: '石嘴山市', value: 78, type: 1 },
        { name: '张掖市', value: 70, type: 0 },
        { name: '中山市', value: 51, type: 1 },
        { name: '宜春市', value: 21, type: 2 },
        { name: '重庆市', value: 89, type: 0 },
        { name: '中卫市', value: 97, type: 2 },
        { name: '安顺市', value: 98, type: 1 },
        { name: '澎湖县', value: 19, type: 1 },
        { name: '金昌市', value: 92, type: 0 },
        { name: '北京市', value: 6, type: 1 },
        { name: '攀枝花市', value: 49, type: 1 },
        { name: '三亚市', value: 25, type: 2 },
        { name: '株洲市', value: 88, type: 1 },
        { name: '芜湖市', value: 47, type: 1 },
        { name: '晋城市', value: 61, type: 1 },
        { name: '吴忠市', value: 6, type: 1 },
        { name: '肇庆市', value: 76, type: 2 },
        { name: '晋中市', value: 82, type: 1 },
        { name: '昆明市', value: 77, type: 1 },
        { name: '山南地区', value: 98, type: 1 },
        { name: '丹东市', value: 25, type: 1 },
        { name: '威海市', value: 31, type: 2 },
        { name: '桃园县', value: 94, type: 1 },
        { name: '乌兰察布市', value: 19, type: 2 },
        { name: '阿克苏地区', value: 80, type: 2 },
        { name: '柳州市', value: 68, type: 0 },
        { name: '衡阳市', value: 41, type: 0 },
        { name: '昭通市', value: 15, type: 0 },
        { name: '石嘴山市', value: 35, type: 1 },
        { name: '怒江傈僳族自治州', value: 76, type: 1 },
        { name: '天津市', value: 82, type: 2 },
        { name: '随州市', value: 52, type: 0 },
        { name: '玉林市', value: 97, type: 2 },
        { name: '延安市', value: 28, type: 1 },
        { name: '朔州市', value: 62, type: 0 },
        { name: '齐齐哈尔市', value: 60, type: 0 },
        { name: '三沙市', value: 30, type: 1 },
        { name: '淮南市', value: 4, type: 1 },
        { name: '芜湖市', value: 29, type: 1 },
        { name: '滁州市', value: 30, type: 1 },
        { name: '三沙市', value: 74, type: 1 },
        { name: '重庆市', value: 51, type: 2 },
        { name: '徐州市', value: 24, type: 1 },
        { name: '呼和浩特市', value: 50, type: 1 },
        { name: '威海市', value: 37, type: 1 },
      ],
    },
  };
}

const useStyles = createStyles(({ token }) => {
  return {
    mapChart: {
      height: '452px',
      paddingTop: '24px',
      img: { display: 'inline-block', maxWidth: '100%', maxHeight: '437px' },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        height: 'auto',
      },
    },
  };
});

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const Monitor: FC = () => {
  const { styles } = useStyles();
  const { loading, data } = useRequest(queryTags);

  const wordCloudData = (data?.list || []).map((item) => {
    return {
      id: +Date.now(),
      word: item.name,
      weight: item.value,
    };
  });
  return (
    <PageContainer title={false}>
      <Row gutter={24}>
        <Col
          xl={18}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="活动实时交易情况" bordered={false}>
            <Row>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="今日交易总额" suffix="元" value={124543233} />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="销售目标完成率" value="92%" />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Countdown title="活动剩余时间" value={deadline} format="HH:mm:ss:SSS" />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="每秒交易总额" suffix="元" value={234} />
              </Col>
            </Row>
            <div className={styles.mapChart}>
              <Map />
            </div>
          </Card>
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="活动情况预测"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <ActiveChart />
          </Card>
          <Card
            title="券核效率"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <Gauge
              height={180}
              data={
                {
                  target: 80,
                  total: 100,
                  name: 'score',
                  thresholds: [20, 40, 60, 80, 100],
                } as any
              }
              padding={-16}
              style={{
                textContent: () => '优',
              }}
              meta={{
                color: {
                  range: ['#6395FA', '#62DAAB', '#657798', '#F7C128', '#1F8718'],
                },
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xl={12}
          lg={24}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="各品类占比" bordered={false}>
            <Row
              style={{
                padding: '16px 0',
              }}
            >
              <Col span={8}>
                <Progress type="dashboard" percent={75} />
              </Col>
              <Col span={8}>
                <Progress type="dashboard" percent={48} />
              </Col>
              <Col span={8}>
                <Progress type="dashboard" percent={33} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col
          xl={6}
          lg={12}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="热门搜索" loading={loading} bordered={false}>
            <WordCloud
              data={wordCloudData}
              height={162}
              textField="word"
              colorField="word"
              layout={{ spiral: 'rectangular', fontSize: [10, 20] }}
            />
          </Card>
        </Col>
        <Col
          xl={6}
          lg={12}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="资源剩余" bordered={false}>
            <Liquid height={160} percent={0.35} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default Monitor;
