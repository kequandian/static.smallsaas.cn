import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { useModel } from '@umijs/max';
import { Button, Card, Input, Space, Typography } from 'antd';
import React from 'react';
const Admin: React.FC = () => {
  const [name, setName] = React.useState('');
  const { user, setUserData } = useModel('defaultSettingsStore');
  return (
    <PageContainer content={' 这个页面只有 admin 权限才能查看'}>
      <Card title="useModel 数据流测试">
        <Typography.Title
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          {user.mame}
        </Typography.Title>
      </Card>

      <Card title="修改标题">
        <Space.Compact>
          <Input size="large" onChange={(e) => setName(e.target.value)} defaultValue={user.mame} />
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setUserData({ mame: name });
            }}
          >
            Submit
          </Button>
        </Space.Compact>
      </Card>
    </PageContainer>
  );
};
export default Admin;
