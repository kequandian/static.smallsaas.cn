import React, { useState, useEffect } from 'react';
import { history } from 'umi'
import GoodHouse from '@/pages/goodHouse'
// import Hello from '@/pages/hello'
import ColorShow from '@/components/presenter/ColorShow'
import ColorMonth from '@/components/presenter/ColorMonth'
import Login from '@/pages/login'
import RentAssetDetails from '@/pages/RentAssetDetails'




export default function index(props) {
  history.push('/RentAssetDetails?id=20')
  return (
    // <GoodHouse />
    // < Hello />
    // <ColorMonth />
    // <AddressManage />
    // <Login />
    // <RentAssetDetails />
    <></>
  )


}
