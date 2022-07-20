import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './item';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {


  // const api = '/api/settlementStatementData'
  const api = '/api/u/saasAgent/settlementOrderList'


  const [data] = useTokenRequest({ api });



  /**
   * 页面配置
   */

  const config = {
    items: data && data.records && data.records.length > 0 ? data.records : [],
    layout: {
      xname: 'Gridbox',
      props: {
        columns: 1,
        space: 0,
      },
      container: 'PlainList'
    },
    ...props
  };
  console.log(data, ' ==data');

  return (
    <AutoLayout {...config} data={data} >
    <Presenter />
    </AutoLayout>

  )
}