import React, { useState, useEffect } from 'react';
import Orders from '@/pages/orders'
import ManagingDirector from '@/pages/my/ManagingDirector'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'




export default function index(props) {
  return (
    <ChakraProvider>
        <Orders />
    </ChakraProvider>
  )


}
