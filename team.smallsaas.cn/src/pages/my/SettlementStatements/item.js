import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';



// --结算报表item
export default function index(props) {
    const { orderNumber='', settlementTime='', productName='', dealPrice='',settlementPrice='' } = props

    return (
        <CssCart backgroundColor='' padding='0px 8px' width='100%' >
            <Container>
                <Flex w='100%' borderBottom='1px solid #f0f0f0'>
                    <Center w='15%' bg=''>
                        <PrimarySubtitle  fontSize='12px' color='#333333'>
                           {orderNumber}
                        </PrimarySubtitle>
                    </Center>
                    <Center w='36%'>
                        <PrimarySubtitle fontSize='10px' color='#8c99a5'>
                           {settlementTime}
                        </PrimarySubtitle>
                    </Center>
                    <Center w='26%'>
                        <PrimarySubtitle fontSize='12px' color='#333333'>
                            {productName}
                        </PrimarySubtitle>
                    </Center>
                    <Center w='22%'>
                        <PrimarySubtitle fontSize='12px' color='#333333'>
                        <>
                        ￥{dealPrice}
                        </> 
                        </PrimarySubtitle>
                    </Center>
                    <Center w='22%'>
                        <PrimarySubtitle fontSize='12px' color='#333333'>
                          <>
                          ￥{settlementPrice}
                        </> 
                        </PrimarySubtitle>
                    </Center>
                </Flex>
            </Container>
        </CssCart>
    )


}
