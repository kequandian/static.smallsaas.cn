import React, { useState, useEffect } from 'react';
import Testlogin from '@/pages/test/Testlogin'
import Testorders from '@/pages/test/Testorders'
import TestManagingDirector from '@/pages/test/testMy/TestManagingDirector'
import TestFrom from '@/pages/test/Testfrom'
import { history } from 'umi';
import ProxyDetails from '@/pages/my/ProxyDetails'

import Popover from '@/components/presenter/Popover'


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
    // <Popover />
  )


}
