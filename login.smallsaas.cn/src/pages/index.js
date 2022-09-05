import React, { useState, useEffect } from 'react';
import Login from '@/pages/login/login'
// import Testorders from '@/pages/test/Testorders'
// import TestManagingDirector from '@/pages/test/testMy/TestManagingDirector'
import { history } from 'umi';
// import TopBar from '@/components/presenter/TopBar'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';


export default function index(props) {

  // const appid = window.location.pathname.substring(1, window.location.pathname.length)
  // // console.log('channelValue ==', channelValue)
  // if (!getToken()) {
  //   history.push(`/Orders?appid=${appid}`)
  //   // console.log(!getToken(),'111')
  // } else {
  //   if (appid) {
  //     history.push(`/Orders?appid=${appid}`)
  //   } else {
  //     history.push('/SelectApply')
  //   }
  // }


  return (
    // <></>
    <Login />
    // <SuperSettings />

  )


}
