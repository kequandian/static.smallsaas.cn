import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';



// --首页订单列表
export default function index(props) {
    const { userId='',
    // time='2022-06-06',
    price='', 
    onOrderDetails,
        productName='', agentName='',orderNumber,id } = props
    return (
        <CssCart  borderBottom='1px #f5f5f5 solid' backgroundColor='' padding='1px 8px' width='100%'>
            <Container>
                <Flex w='100%' onClick={()=>onOrderDetails(id)}>
                    <Center w='82%' bg='' padding='0 2px'>
                        <PrimarySubtitle fontSize='12px'>
                            {orderNumber || ''}
                        </PrimarySubtitle>
                    </Center>
                    <Center w='110%' padding='0 2px'>
                        <PrimarySubtitle fontSize='12px'>
                            {productName || ''}
                        </PrimarySubtitle>
                    </Center>
                    <Center w='90%' padding='0 2px'>
                        <PrimarySubtitle  fontSize='12px'>
                            {agentName || ''}
                        </PrimarySubtitle>
                    </Center>
                </Flex>
            </Container>
        </CssCart>
    )


}
