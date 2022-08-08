import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Center, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from 'zero-element-boot/lib/components/presenter/Avatar'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import OrderedList from './OrdersList/config';
import SalesStatistic from './SalesStatistic/config';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { history } from 'umi';
import TopBar from '@/components/presenter/TopBar'
import { getEndpoint, getToken } from 'zero-element-boot/lib/components/config/common';


// --首页
export default function index(props) {
  const { onChange } = props

  function myPages() {
    if (getToken()) {
    history.push('/my/ManagingDirector')
    // console.log('getToken() = ', getToken());
    } else {
      history.push('/login')
      // console.log('2222');
    }

  }
  const ct = new Date()
  const res = ct.getMonth() + 1

  // 获取每月销量api
  const api = `/api/u/saasAgent/salesVolume?month=${res}`
  const [saleData] = useTokenRequest({ api });
  
  //获取用户信息api
  const myApi = '/api/u/saasAgent/myAgentInfo'
  const [myData] = useTokenRequest({ api:myApi });

  const endpoint = getEndpoint()
    const url =myData.avatar? (endpoint + myData.avatar):''
  // console.log('myData==', myData);

  return (
    <>


      <CssCart
        // background='#23a7b2'
        background='linear-gradient(161deg, rgba(55, 139, 203),rgba(219, 237, 247)100%)' padding='20px'>
        <>
          <Flex onClick={myPages} bg='' w='40%'>
            <Avatar size='46px' url={url} />
            < Center h='50px' w='' bg=''>
              <Text fontSize='14px' color=''>我的主页</Text>
            </Center>
          </Flex>

          <CssCart width='100%' background='#f5f5f530' height='130px' margin='10px auto' padding='16px 10px 16px 16px' border='#48beb3 2px '>
            <>
              <Flex padding='4px' >
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

      <CssCart width='100%' height='44px' margin='0 auto' padding='14px 20px 4px 20px' backgroundColor=''>
        <PrimaryTitle fontSize='16PX' margin='0'>订单</PrimaryTitle>
      </CssCart>

      {/* <CssCart width='100%' height='34px' margin='0 auto' padding='2px 10px' backgroundColor='linear-gradient(141deg, rgba(18, 157, 186)1%,rgba(64, 186, 165)80%)'> */}
      <CssCart width='100%' height='' background='linear-gradient(141deg, rgba(43, 145, 204)1%,rgba(137, 208, 244)80%)'>

        <Flex w='100%'>
          <Box w='60%' bg=''>
            <PrimarySubtitle color='#ffffff' fontSize='16px'>
              单号
            </PrimarySubtitle>
          </Box>
          <Box w='60%'>
            < PrimarySubtitle color='#ffffff' fontSize='16px'>
              交易价格
            </PrimarySubtitle>
          </Box>
          <Box w='70%'>

            <PrimarySubtitle color='#ffffff' fontSize='16px'>
              产品
            </PrimarySubtitle>
          </Box>
          <Box w='130%'>
            <PrimarySubtitle color='#ffffff' fontSize='16px'>
              代理
            </PrimarySubtitle>
          </Box>
        </Flex>
      </CssCart>
      <OrderedList />
    </>
  )

}
