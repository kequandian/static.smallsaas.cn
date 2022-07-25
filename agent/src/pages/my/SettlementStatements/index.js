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
    <TopBar>
    <CssCart position='fixed' width='100%' height='100%' background='linear-gradient(141deg, rgba(18, 157, 186)1%,rgba(64, 186, 165)80%)'>
    <>
      <Center h='40px'>
        <DarkBackgroundTitle>结算报表</DarkBackgroundTitle>
      </Center>
      <CssCart borderTop='1px solid #f5f5f5' width='100%' height='34px' margin=' 0' padding='6px 10px' backgroundColor=''>
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
      {/* <CssCart borderBottom='1px #f5f5f5 solid' width='100%' height='40px' background='#ffffff'>
      11
      </CssCart>
      <CssCart  borderBottom='1px #f5f5f5 solid' width='100%' height='40px' background='#ffffff'>
      11
      </CssCart>
       <CssCart  borderBottom='1px #f5f5f5 solid' width='100%' height='40px' background='#ffffff'>
      11
      </CssCart> */}
      </>
    </CssCart>
    </TopBar>
  )


}
