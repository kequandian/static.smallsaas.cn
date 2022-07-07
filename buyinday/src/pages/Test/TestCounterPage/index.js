import React from 'react';
// import PageCart from '@/components/PageCart';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';
import CounterPage from '@/components/page/CounterPage'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
// import WxPage from '@/components/WxPage'
import { Radio, RadioGroup, Button, Flex, Stack, ChakraProvider } from '@chakra-ui/react'


export default function index(props) {
    return (
        <ChakraProvider>
            <HCenter>
                <CssCart backgroundColor='#f4f5f7' width='100%' height='100%'>
                    <CounterPage />
                </CssCart>
            </HCenter>
        </ChakraProvider>
    )
}