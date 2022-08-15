import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
// import CallingCard from '@/pages/CallingCard'
import CallingCard from '@/pages/CallingCard'
import NonumberOrder from '@/pages/NonumberOrder'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


export default function index(props) {

  console.log('window.location==', window.location)

  //获取路由带过来的 渠道码
  const channelValue = window.location.pathname.substring(1, window.location.pathname.length)
  // const channelV = window.location.pathname.split('/')[1]

  //接收扫码跳转带过来的参数,
  const queryData = useQuery(window.location.search)
  const reference = queryData.query.phone
  const coUserid = queryData.query.coUserid
  console.log('reference==', reference)
  console.log('coUserid==', coUserid)
  // history.push('/Testlogin')

  return (
    // <Testlogin />
    // <Testorders />
    <CallingCard coChannel={channelValue} coUserid={coUserid} reference={reference} />
    //  <Testlogin />
    // </TopBar>
  )


}
