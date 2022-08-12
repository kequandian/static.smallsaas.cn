import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
// import CallingCard from '@/pages/CallingCard'
import CallingCard from '@/pages/CallingCard'
import NonumberOrder from '@/pages/NonumberOrder'



export default function index(props) {

  // history.push('/Testlogin')
  return (
    // <Testlogin />
    // <Testorders />
    <CallingCard />
    //  <Testlogin />
    // </TopBar>
  )


}
