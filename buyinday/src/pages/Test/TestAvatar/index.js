import React from 'react';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';
import Avatar from 'zero-element-boot/lib/components/presenter/Avatar';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import {  ChakraProvider } from '@chakra-ui/react'


export default function index(props) {
    return (
        <ChakraProvider>
            <HCenter>
                <CssCart backgroundColor='' width='300px' height='300px'>
                    <Avatar />
                </CssCart>
            </HCenter>
        </ChakraProvider>
    )
}