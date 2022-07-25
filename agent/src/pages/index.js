import React, { useState, useEffect } from 'react';
import Testlogin from '@/pages/test/Testlogin'
import Testorders from '@/pages/test/Testorders'
import TestManagingDirector from '@/pages/test/testMy/TestManagingDirector'
import { history } from 'umi';
import TopBar from '@/components/presenter/TopBar'



export default function index(props) {
  // history.push('/Testlogin')
  return (
    <Testlogin />
    // <Testorders />
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
