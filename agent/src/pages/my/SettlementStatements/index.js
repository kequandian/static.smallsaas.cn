import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import Item from './config'


export default function index(props) {
    return (
        <>
        <CssCart border='#aebac6 2px solid' width='100%' height='34px' margin='0 auto' padding='2px 10px' backgroundColor='#dfe6ed'>
        <Flex w='100%'>
          <Box w='80%' bg=''>
            <PrimarySubtitle fontSize='14px'>
             订单
            </PrimarySubtitle>
          </Box>
          <Box w='120%'>
            < PrimarySubtitle fontSize='14px'>
              结算时间
             </PrimarySubtitle>
          </Box>
          <Box w='80%'>

            <PrimarySubtitle fontSize='14px'>
              产品
            </PrimarySubtitle>
          </Box>
          <Box w='80%'>
            <PrimarySubtitle fontSize='14px'>
              预存
           </PrimarySubtitle>
          </Box>
          <Box w='80%'>
            <PrimarySubtitle fontSize='14px'>
              提佣
           </PrimarySubtitle>
          </Box>
        </Flex>
      </CssCart>
        <Item />
</>
    )


}
