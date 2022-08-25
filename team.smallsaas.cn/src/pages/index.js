import React, { useState, useEffect } from 'react';
import Testlogin from '@/pages/test/Testlogin'
import Testorders from '@/pages/test/Testorders'
import TestManagingDirector from '@/pages/test/testMy/TestManagingDirector'
import { history } from 'umi';
import TopBar from '@/components/presenter/TopBar'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import CallingCard from '@/pages/CallingCard'
import LoadPage from '@/pages/my/myInvitationCode/LoadPage'
import SelectApply from '@/pages/SelectApply'
import SuperSettings from '@/pages/SuperSettings'
import Orders from '@/pages/orders'
import TestPrompt from '@/pages/test/TestPrompt'


export default function index(props) {

  const appid = window.location.pathname.substring(1, window.location.pathname.length)
  // console.log('channelValue ==', channelValue)
  if (!getToken()) {
    history.push(`/Orders?appid=${appid}`)
    // console.log(!getToken(),'111')
  } else {
    if (appid) {
      history.push(`/Orders?appid=${appid}`)
    } else {
      history.push('/SelectApply')
    }
  }


  return (
    <></>
    // <TestPrompt />
    // <SuperSettings />
    // <SelectApply />
    // <Orders />
    // <TestManagingDirector />
    // <TestFrom />
    // <h1>hello</h1>
    // <ProxyDetails />
    // <></>
    // <TestTripleOption />
    // <TopBar>
    //  <Testlogin />
    // </TopBar>
  )


}
