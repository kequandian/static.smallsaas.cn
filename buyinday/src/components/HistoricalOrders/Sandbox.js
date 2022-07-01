import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import HistoricalOrdersIndex from './index';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box } from '@chakra-ui/react'
import VStack from 'zero-element-boot/lib/components/layout/VStack'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';


export default function (props) {

    // let endpoint='http://app1.console.smallsaas.cn:8001/openapi'


    // const api = '/api/pub/product/products?category=Food'


    return (
        <CssCart width='100%' backgroundColor='#f5f5f5'>
            <HistoricalOrdersIndex />
        </CssCart>
    )
}