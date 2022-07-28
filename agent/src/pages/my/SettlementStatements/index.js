import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Center, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import Item from './config'
import Containertitle from 'zero-element-boot-plugin-theme/lib/components/text/Containertitle';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';
import TopBar from '@/components/presenter/TopBar'


// --结算报表页面
export default function index(props) {
  return (
    <>
    <TopBar>
    结算报表
    </TopBar>

    <CssCart position='fixed' width='100%' height='100%' background='#23a7b230'>
    <>
      {/* <Center h='40px' bg='#23a7b2'>
        <DarkBackgroundTitle>结算报表</DarkBackgroundTitle>
      </Center> */}
      <CssCart borderTop='1px solid #f5f5f5' width='100%' height='34px' margin=' 0' padding='6px 10px' backgroundColor='#23a7b2'>
        <Flex w='100%'>
          <Box w='15%' bg=''>
            <PrimarySubtitle color='#ffffff' fontSize='14px'>
              订单
            </PrimarySubtitle>
          </Box>
          <Box w='26%'>
            < PrimarySubtitle  color='#ffffff'fontSize='14px'>
              结算时间
             </PrimarySubtitle>
          </Box>
          <Box w='20%'>

            <PrimarySubtitle color='#ffffff' fontSize='14px'>
              产品
            </PrimarySubtitle>
          </Box>
          <Box w='20%'>
            <PrimarySubtitle color='#ffffff' fontSize='14px'>
              预存
           </PrimarySubtitle>
          </Box>
          <Box w='20%'>
            <PrimarySubtitle color='#ffffff' fontSize='14px'>
              提佣
           </PrimarySubtitle>
          </Box>
        </Flex>
      </CssCart>
      <Item />
      
      </>
    </CssCart>
    </>
  )


}
