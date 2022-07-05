import React from 'react';
// import PageCart from '@/components/PageCart';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';
import CounterPage from '@/components/page/CounterPage/Sandbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Radio, RadioGroup, Button, Flex, Stack, ChakraProvider } from '@chakra-ui/react'
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';


export default function index(props) {
    return (
        <ChakraProvider>
            <HCenter>
                <CssCart backgroundColor='' width='' height='100%'>
                    <PrimaryTitle>
                   11111111
                     </PrimaryTitle>
                </CssCart>
            </HCenter>
        </ChakraProvider>
    )
}