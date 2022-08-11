import React, { useState, useEffect } from 'react';
import Orders from '@/pages/orders'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'

import TripleOption from '@/components/presenter/card/TripleOption'



export default function index(props) {
  return (
    <ChakraProvider>
        <CssCart backgroundColor='#f5f5f5' padding='0px' margin='20px' width=''>
          <TripleOption options={[{ "value": "story", "name": "故事" }, { "value": "knowledge", "name": "知识" },{ "value": "knowledge", "name": "知识" },]} />
        </CssCart>
    </ChakraProvider>
  )


}
