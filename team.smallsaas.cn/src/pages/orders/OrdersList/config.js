import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './index';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
// import { ProvidePlugin } from '@umijs/deps/compiled/webpack';


export default function index(props) {

  const { appid='Unicom5G',id} =props
  
  // const api ='/api/OrdersListData' 
  const api =`/api/u/saasAgent/orderList/${appid}?pageSize=50`

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
        space:0
      },
      container: 'PlainList'
    },
    ...props
  };
// console.log(data,' ==data');

  return (
    <CssCart background='#f0ffff'>
      <AutoLayout {...config} data={data} >
        <Presenter id={id}/>
      </AutoLayout>
    </CssCart>

  )
}