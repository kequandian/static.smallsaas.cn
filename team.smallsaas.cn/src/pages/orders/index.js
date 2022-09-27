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
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { Modal, Toast } from 'antd-mobile'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');


// --首页
export default function index(props) {
  const { onChange } = props
  const queryData = useQuery(props)
  const appid = queryData.query.appid
  const Permissions = queryData.query.Permissions
  // console.log('Permissions ==', Permissions)

  function myPages() {
    if (getToken()) {
      history.push(`/my/ManagingDirector?appid=${appid}&Permissions=${Permissions}`)
      // console.log('getToken() = ', getToken());
    } else {
      history.push(`/login?appid=${appid}&Permissions=${Permissions}`)
      // console.log('2222');
    }

  }
  const ct = new Date()
  const res = ct.getMonth() + 1

  // 获取每月销量api
  const api = `/api/u/saasAgent/salesVolume/${appid}?month=${res}`
  const [saleData] = useTokenRequest({ api });

  //获取用户信息api
  const myApi = '/api/u/saasAgent/myAgentInfo'
  const [myData] = useTokenRequest({ api: myApi });

  const endpoint = getEndpoint()
  const url = myData.avatar ? (endpoint + myData.avatar) : ''

  function onOrderDetails(id) {
    history.push(`/orders/OrderDetails?id=${id}&appid=Unicom5G&Permissions=${Permissions}`)
  }

  function daleteOrder() {
 
    const query = {
    }
    promiseAjax('/api/u/saasAgent/order/self/testOrder', query, { method: 'DELETE' }).then(resp => {
      if (resp && resp.code === 200) {
        console.log('删除成功 ==', resp)
        Toast.show(
          '删除成功',
          2
        )
        // setTimeout(() => {
          // history.push(`/orders?appid=Unicom5G&Permissions=${Permissions}`)
        // }, 200)
      }
    })

  }
  return (
    <>
      <CssCart
        // background='#68a8d8'
        background='linear-gradient(to right bottom,#eea2a4,#619ac3)'
        padding='20px'>
        <>
          <Flex onClick={myPages} bg='' w='40%'>
            <Avatar size='46px' url={url} />
            < Center h='50px' w='' bg=''>
              <Text fontSize='14px' color=''>我的主页</Text>
            </Center>
          </Flex>

          <CssCart width='100%' background='#f5f5f520' height='160px' margin='10px auto' padding='16px 10px 16px 16px' border='#48beb3 2px '>
            <>
              <Flex padding='4px' >
                <PrimaryTitle fontSize='18PX'>销量</PrimaryTitle>
                <Spacer />
                {/* <DatePicker onChange={onChange} picker="month" w='80px' /> */}
                <PrimaryTitle fontSize='18px'>
                  {res}月
                </PrimaryTitle>
              </Flex>
              <Center borderTop='1px #c8cfdc solid'>
                <SalesStatistic list={saleData} />
              </Center>
            </>
          </CssCart>
        </>
      </CssCart>

      <Flex>
        <CssCart width='100%' height='44px' margin='0 auto' padding='14px 20px 4px 20px' backgroundColor=''>
          <PrimaryTitle fontSize='16PX' margin='0'>订单</PrimaryTitle>
        </CssCart>
        <Center w='300px' margin='2px 0 ' onClick={() => daleteOrder()}>
          <Button  outline color='#e5a1a5' >
            一键删除测试订单
          </Button>
        </Center>
      </Flex>

      {/* <CssCart width='100%' height='34px' margin='0 auto' padding='2px 10px' backgroundColor='linear-gradient(141deg, rgba(18, 157, 186)1%,rgba(64, 186, 165)80%)'> */}
      <CssCart width='100%' height='' background='#659ac2'>

        <Flex w='100%'>
          <Center w='82%' bg=''>
            <PrimarySubtitle color='#ffffff' fontSize='16px'>
              单号
            </PrimarySubtitle>
          </Center>
          {/* <Box w='60%'>
            < PrimarySubtitle color='#ffffff' fontSize='16px'>
              交易价格
            </PrimarySubtitle>
          </Box> */}
          <Center w='110%'>

            <PrimarySubtitle color='#ffffff' fontSize='16px'>
              产品
            </PrimarySubtitle>
          </Center>
          <Center w='90%'>
            <PrimarySubtitle color='#ffffff' fontSize='16px'>
              代理
            </PrimarySubtitle>
          </Center>
        </Flex>
      </CssCart>
      <OrderedList onOrderDetails={(id) => onOrderDetails(id)} />
    </>
  )

}
