import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './Presenter';


export default function index(props) {

  
  const { productList,callBackData } = props;
  

//   // let api = '/api/AutoDomeData'

// //   const api =endpoint +'/api/u/asset/user/userAsset'

//   const api = '/api/pub/product/products?category=Food '



//   const [data] = useTokenRequest({ api });


  /**
   * 页面配置
   */

  const config = {
    items: productList,
    layout: {
      xname: 'Gridbox',
      props: {
        columns: 1
      },
      container: 'PlainList'
    },
    ...props
  };

  return (
    <AutoLayout {...config} >
      <Presenter callBackData={callBackData}/>
    </AutoLayout>

  )
}