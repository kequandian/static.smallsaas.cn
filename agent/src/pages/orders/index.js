import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from 'zero-element-boot/lib/components/presenter/Avatar'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import OrderedList from './OrdersList/config';
import SalesStatistic from './SalesStatistic/config';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { history } from 'umi';


import type, { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

// const App: React.FC = () => (
// <Space direction="vertical">
//   <DatePicker onChange={onChange} />
//   <DatePicker onChange={onChange} picker="week" />
//   <DatePicker onChange={onChange} picker="month" />
//   <DatePicker onChange={onChange} picker="quarter" />
//   <DatePicker onChange={onChange} picker="year" />
// </Space>
// );

// export default App;



// --首页
export default function index(props) {
  const { onChange } = props

  function myPages() {
    history.push('/my/ManagingDirector')
  }

  const ct = new Date()
  const res = ct.getMonth() + 1


  // const api = '/api/SalesStatisticData'
  const api = `/api/u/saasAgent/salesVolume?month=${res}`

  const [saleData] = useTokenRequest({ api });
  // console.log(saleData, ' == saleData')



  return (
    <>
      <CssCart background='linear-gradient(141deg, rgba(88, 85, 232)1%,rgba(62, 196, 160)80%)' padding='20px'>
        <>
          <div onClick={myPages}>
            <Avatar size='46px' />
          </div>
          <CssCart width='100%' height='130px' margin='10px auto' padding='16px 10px 16px 16px' border='#48beb3 2px solid'>
            <>
              <Flex >
                <PrimaryTitle fontSize='18PX'>销量</PrimaryTitle>
                <Spacer />


                {/* <DatePicker onChange={onChange} picker="month" w='80px' /> */}

                <PrimaryTitle fontSize='18px'>
                  {res}月
                </PrimaryTitle>
              </Flex>
              <SalesStatistic list={saleData} />
            </>
          </CssCart>
        </>
      </CssCart>

      <CssCart width='100%' height='44px' margin='0 auto' padding='8px 20px' backgroundColor=''>
        <PrimaryTitle fontSize='16PX' margin='0'>订单</PrimaryTitle>
      </CssCart>

      <CssCart width='100%' height='34px' margin='0 auto' padding='2px 10px' backgroundColor=''>

        <Flex w='100%'>
          <Box w='60%' bg=''>
            <PrimarySubtitle fontSize='14px'>
              单号
              </PrimarySubtitle>
          </Box>
          <Box w='80%'>
            < PrimarySubtitle fontSize='14px'>
              交易价格
               </PrimarySubtitle>
          </Box>
          <Box w='60%'>

            <PrimarySubtitle fontSize='14px'>
              产品
              </PrimarySubtitle>
          </Box>
          <Box w='130%'>
            <PrimarySubtitle fontSize='14px'>
              代理
             </PrimarySubtitle>
          </Box>
        </Flex>
      </CssCart>
      <OrderedList />
    </>
  )


}
