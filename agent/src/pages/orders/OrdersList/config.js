import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './index';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {

  
  const api ='/api/OrdersListData'


  const [data] = useTokenRequest({ api });



  /**
   * 页面配置
   */

  const config = {
    items: data || data.length > 0 ? data.records : [],
    layout: {
      xname: 'Flexbox',
      props: {
          direction: 'column',
      },
      container: 'PlainList'
    },
    ...props
  };
console.log(data,' ==data');

  return (
    <AutoLayout {...config} data={data} >
      <Presenter />
    </AutoLayout>

  )
}