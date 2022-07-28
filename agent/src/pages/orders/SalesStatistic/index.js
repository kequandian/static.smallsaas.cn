import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Stack, Box, Spacer, ChakraProvider, Center } from '@chakra-ui/react'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';

// --首页销量列表
export default function index(props) {
  const { count, productName } = props
  return (
    <CssCart backgroundColor='' padding='10px 2px' width='100%'>
        <Stack >
          <Center>
              <PrimarySubtitle fontSize='16px' color=''>  {count || ''}</PrimarySubtitle>
          </Center>
          <PrimarySubtitle fontSize='16px' color=''> {productName || ''}</PrimarySubtitle>
        </Stack>
    </CssCart>
  )


}
