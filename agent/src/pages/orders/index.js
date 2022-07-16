import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import OrderedList from './OrdersList/config';
import SalesStatistic from './SalesStatistic/config';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { history } from 'umi';



export default function index(props) {

  function myPages() {
    history.push('/my/ManagingDirector')
  }

  const api = '/api/SalesStatisticData'

  const [saleData] = useTokenRequest({ api });

  return (
    <CssCart backgroundColor='#ffffff' padding='20px'>
      <>
        <div onClick={myPages}>
          <Avatar size='36px' />
        </div>
        <CssCart width='100%' height='130px' margin='10px auto' padding='16px' border='#48beb3 2px solid'>
          <>
            <Flex >
              <PrimaryTitle fontSize='18PX'>销量</PrimaryTitle>
              <Spacer />
              <PrimaryTitle fontSize='18px'>
                {saleData.month ? `${saleData.month}月` : ''}
              </PrimaryTitle>
            </Flex>
            <SalesStatistic list={saleData.salesList} />
          </>
        </CssCart>
        <PrimaryTitle fontSize='16PX' margin='0'>订单</PrimaryTitle>
        <CssCart border='#aebac6 2px solid' width='100%' height='34px' margin='0 auto' padding='2px 10px' backgroundColor='#dfe6ed'>
          <Flex w='100%'>
            <Box w='80%' bg=''>
              <PrimarySubtitle fontSize='14px'>
                单号
              </PrimarySubtitle>
            </Box>
            <Box w='120%'>
              < PrimarySubtitle fontSize='14px'>
                下单时间
               </PrimarySubtitle>
            </Box>
            <Box w='80%'>

              <PrimarySubtitle fontSize='14px'>
                产品
              </PrimarySubtitle>
            </Box>
            <Box w='80%'>
              <PrimarySubtitle fontSize='14px'>
                代理
             </PrimarySubtitle>
            </Box>
          </Flex>
        </CssCart>
        <OrderedList />
      </>
    </CssCart>
  )


}
