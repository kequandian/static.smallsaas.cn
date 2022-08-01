import React, { useState, useEffect } from 'react';
import Testlogin from '@/pages/test/Testlogin'
import Testorders from '@/pages/test/Testorders'
import TestManagingDirector from '@/pages/test/testMy/TestManagingDirector'
import { history } from 'umi';
import TopBar from '@/components/presenter/TopBar'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
// import CallingCard from '@/pages/CallingCard'
import CallingCard from '@/pages/CallingCard'
import LoadPage from '@/pages/my/myInvitationCode/LoadPage'



export default function index(props) {

  // history.push('/Testlogin')
  return (
    // <Testlogin />
    <Testorders />
  //  <LoadPage />
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
