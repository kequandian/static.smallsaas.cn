import React, { useState, useEffect } from 'react';
import { history } from 'umi'
import GoodHouse from '@/pages/goodHouse'
// import Hello from '@/pages/hello'
import ColorShow from '@/components/presenter/ColorShow'
import AddressManage from '@/pages/AddressManage'
import Login from '@/pages/login'




export default function index(props) {
  history.push('/goodHouse?id=1')
  return (
    // <GoodHouse />
    // < Hello />
    // <ColorShow />
    // <AddressManage />
    // <Login />
    <></>
  )


}
