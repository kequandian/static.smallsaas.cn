import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Stack, Box, Spacer, ChakraProvider, Center } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';



export default function index(props) {
  const { count, productName } = props
  return (
    <CssCart backgroundColor='' padding='10px 2px' width='100%'>
        <Stack >
          <Center>
              <PrimarySubtitle fontSize='16px' color='#333333'>  {count}</PrimarySubtitle>
          </Center>
          <PrimarySubtitle fontSize='16px' color='#8c99a5'> {productName}</PrimarySubtitle>
        </Stack>
    </CssCart>
  )


}
