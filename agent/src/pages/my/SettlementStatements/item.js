import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';



// --结算报表item
export default function index(props) {
    const { orderNumber='', price='', profit='', orgId='',userId='' } = props

    return (
        <CssCart backgroundColor='' padding='0px 8px' width='100%' >
            <Container>
                <Flex w='100%' borderBottom='1px solid #f0f0f0'>
                    <Box w='15%' bg=''>
                        <PrimarySubtitle fontSize='14px' color='#333333'>
                           {orderNumber}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='26%'>
                        <PrimarySubtitle fontSize='14px' color='#8c99a5'>
                           {price}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='20%'>
                        <PrimarySubtitle fontSize='14px' color='#333333'>
                            {profit}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='20%'>
                        <PrimarySubtitle fontSize='14px' color='#333333'>
                        <>
                        ￥{orgId}
                        </> 
                        </PrimarySubtitle>
                    </Box>
                    <Box w='20%'>
                        <PrimarySubtitle fontSize='14px' color='#333333'>
                          <>
                          ￥{userId}
                        </> 
                        </PrimarySubtitle>
                    </Box>
                </Flex>
            </Container>
        </CssCart>
    )


}
