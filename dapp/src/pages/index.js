import React, { useState, useEffect } from 'react';
import { history } from 'umi'
import GoodHouse from '@/pages/goodHouse/Sandbox'
// import Hello from '@/pages/hello'



export default function index (props) {
  history.push('/goodHouse/Sandbox?id=1')
  return (
<></>
  // <GoodHouse />
  // < Hello />
  )


}
