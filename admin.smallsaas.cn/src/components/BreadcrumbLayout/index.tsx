import { ProBreadcrumb } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import React from 'react';

const BreadcrumbLayout: React.FC = () => {
  console.log(useLocation());
  const shouldShowBreadcrumb = (useLocation().pathname.match(/\//g) || []).length === 1;
  console.log(shouldShowBreadcrumb);

  return !shouldShowBreadcrumb && <ProBreadcrumb className=" pb-4" />;
};

export default BreadcrumbLayout;
