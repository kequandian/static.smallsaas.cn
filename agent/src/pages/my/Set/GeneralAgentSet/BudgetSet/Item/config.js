import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './index';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {

  
  const { list=[] } = props;
  

  /**
   * 页面配置
   */

  const config = {
    items:  list &&  list.length  > 0 ? list : [],
    layout: {
      xname: 'Gridbox',
      props: {
        columns: 1
      },
      container: 'PlainList'
    },
    ...props
  };
// console.log('list ==',list);

  return (
    <AutoLayout {...config} >
      <Presenter  />
    </AutoLayout>

  )
}