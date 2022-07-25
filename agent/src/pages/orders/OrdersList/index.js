import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';



// --首页订单列表
export default function index(props) {
    const { userId='',
    // time='2022-06-06',
    price='', 
        productName='', agentName='' } = props
    return (
        <CssCart  borderBottom='1px #f5f5f5 solid' backgroundColor='' padding='1px 8px' width='100%'>
            <Container>
                <Flex w='100%'>
                    <Box w='60%' bg=''>

                        <PrimarySubtitle>
                            {userId || ''}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='80%'>
                        <PrimarySubtitle>
                            {price || ''}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='60%'>
                        <PrimarySubtitle>
                            {productName || ''}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='130%'>
                        <PrimarySubtitle >
                            {agentName || ''}
                        </PrimarySubtitle>
                    </Box>
                </Flex>
            </Container>
        </CssCart>
    )


}
