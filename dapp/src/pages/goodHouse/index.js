import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './presenter';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {

  
  const {endpoint, callBackData } = props;
  

  let api =  '/api/goodHouseData'  
  // const api =endpoint +'/api/u/asset/user/userAsset'

 

  const [data] = useTokenRequest({ api });

  /**
   * 页面配置
   */

  const config = {
    items: data.length > 0 ? data : [],
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