import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
// import CallingCard from '@/pages/CallingCard'
import CallingCard from '@/pages/CallingCard'
import SignOffAddress from '@/pages/CallingCard/PopUpContent/SelectAddress'
import ProductList from '@/pages/CallingCard/PopUpContent'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { Center, Stack } from '@chakra-ui/layout';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';


export default function index(props) {

  console.log('window.location==', window.location)

  //获取路由带过来的 渠道码
  // const vendorCodelValue = window.location.pathname.substring(1, window.location.pathname.length)
  const vendorCodelValue = window.location.pathname.split('/')[1]

  const vendorCode = vendorCodelValue ? vendorCodelValue : null
  console.log('vendorCode==', vendorCode)

  //接收扫码跳转带过来的参数,
  const queryData = useQuery(window.location.href)
  // const reference = queryData.query ? queryData.query.phone : 0
  // const appid = queryData.query ? queryData.query.appid : 0
  // const coUserid = queryData.query ? queryData.query.coUserid : 0

  // const [infoData, SetInfoData] = useState([])
  // // console.log('infoData==', infoData)

  // // 根据渠道码获取邀请人的信息
  // function info() {
  //   const query = {
  //   }
  //   promiseAjax(`/api/u/saasAgent/agentInfo/${vendorCode}`, query, { method: 'GET' }).then(resp => {
  //     if (resp && resp.code === 200) {
  //       let data = resp.data
  //       SetInfoData(data)
  //     }
  //   })
  // }

  // useEffect(_ => {
  //   info()
  // }, [])
  return (
    !vendorCode ? (
      // vendorCode ? (
      <Stack h='400px' margin='100px 0'>
        <Center h='200px'>
          <svg t="1661242975784" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="280444" width="128" height="128"><path d="M910.222222 375.466667c0-153.6-122.311111-278.755556-275.911111-278.755556-108.088889 0-199.111111 62.577778-244.622222 153.6-22.755556-8.533333-45.511111-14.222222-71.111111-14.222222-113.777778 0-204.8 93.866667-204.8 210.488889 0 110.933333 85.333333 201.955556 193.422222 207.644444h358.4c136.533333-14.222222 244.622222-133.688889 244.622222-278.755555z" fill="#D5E0F7" p-id="280445"></path><path d="M256 853.333333c-17.066667 0-28.444444-11.377778-28.444444-28.444444v-85.333333c0-17.066667 11.377778-28.444444 28.444444-28.444445s28.444444 11.377778 28.444444 28.444445v85.333333c0 17.066667-11.377778 28.444444-28.444444 28.444444zM597.333333 853.333333c-17.066667 0-28.444444-11.377778-28.444444-28.444444v-85.333333c0-17.066667 11.377778-28.444444 28.444444-28.444445 14.222222 0 28.444444 11.377778 28.444445 28.444445v85.333333c0 17.066667-11.377778 28.444444-28.444445 28.444444zM426.666667 938.666667c-17.066667 0-28.444444-14.222222-28.444445-28.444445v-170.666666c0-17.066667 11.377778-28.444444 28.444445-28.444445s28.444444 11.377778 28.444444 28.444445v170.666666c0 17.066667-11.377778 28.444444-28.444444 28.444445zM768 938.666667c-17.066667 0-28.444444-14.222222-28.444444-28.444445v-170.666666c0-17.066667 11.377778-28.444444 28.444444-28.444445 14.222222 0 28.444444 11.377778 28.444444 28.444445v170.666666c0 17.066667-11.377778 28.444444-28.444444 28.444445z" fill="#88CDFB" p-id="280446"></path></svg>
        </Center>
        <Center h=''>
          <PrimaryTitle>
            未识别到您的渠道码，请从正确的渠道进入进行下单
          </PrimaryTitle>
        </Center>
      </Stack>
    ) : (
      <CallingCard
      vendorCodeData={vendorCode}
        // infoData={infoData}
      // coUserid={coUserid}
      />
    )

    // <ProductList  />
  )
}
