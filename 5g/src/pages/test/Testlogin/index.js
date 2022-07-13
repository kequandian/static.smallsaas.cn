import React, { useState, useEffect } from 'react';
import Login from '@/pages/login'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'




export default function index(props) {
  return (
    <ChakraProvider>
        <Login />
    </ChakraProvider>
  )


}
