import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './presenter';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {


  const { endpoint, callBackData, list=[] } = props;

  

  const api = '/api/u/asset/user/rent/list'

  const [detail] = useTokenRequest({ api });

  /**
   * 页面配置
   */

  const config = {
    items: list.length > 0 ? list : [],
    layout: {
      xname: 'Gridbox',
      props: {
        columns: 1
      },
      container: 'PlainList'
    },
    ...props
  };
// console.log('list === ',list);

  return (
    <AutoLayout {...config} >
      <Presenter callBackData={callBackData} list={detail} />
    </AutoLayout>

  )
}