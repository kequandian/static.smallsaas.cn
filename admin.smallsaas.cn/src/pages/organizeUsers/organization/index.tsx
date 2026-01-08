import { useOrganization } from '@/hooks/useOrganization';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import Pubsub from 'pubsub-js';

import React, { useEffect, useRef } from 'react';
import OrgTree from 'react-org-tree';
import './index.scss';

const Organization: React.FC = () => {
  const { orgList, getOrgListApi } = useOrganization();
  const orgTreeRef = useRef(null);

  // 初始化/更新
  useEffect(() => {
    (async function handle() {
      await getOrgListApi();
    })();
  }, []);

  useEffect(() => {
    const updataListPub = Pubsub.subscribe('UPDATE-ORGTREE', () => getOrgListApi());
    return () => {
      Pubsub.unsubscribe(updataListPub);
    };
  }, []);

  return (
    <ProCard className="org">
      {orgList.length > 0 && (
        <OrgTree
          ref={orgTreeRef}
          data={orgList[0]}
          horizontal={true}
          collapsable={true}
          renderContent={(data: any) => {
            return (
              <span
                style={{
                  color: data.tenantFlag ? '#52c41a' : '',
                }}
              >
                {data.fullName}
              </span>
            );
          }}
          expandAll={true}
        // onClick={(e: any, data: any) => onInfo(data)}
        // onNodeDoubleClick={handleNodeDoubleClick}
        ></OrgTree>
      )}
    </ProCard>
  );
};

export default Organization;
