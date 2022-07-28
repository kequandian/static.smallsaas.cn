import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import List from './list';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {


  const { endpoint, callBackData } = props;

  

  const api = '/api/CallingCardData'

  const [data] = useTokenRequest({ api });

  /**
   * 页面配置
   */

  const config = {
    items: data.length > 0 ? data : [],
    layout: {
      xname: 'Gridbox',
      props: {
        columns: 2
      },
      container: 'PlainList'
    },
    ...props
  };
console.log('data === ',data);

  return (
    <AutoLayout {...config} >
      <List callBackData={callBackData} list={data} />
    </AutoLayout>

  )
}