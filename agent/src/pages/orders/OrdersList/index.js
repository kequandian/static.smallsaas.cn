import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';



export default function index(props) {
    const { code, createdTime, productName, agentName } = props
    return (
        <CssCart backgroundColor='' padding='2px 8px' width='100%'>
            <Container>
                <Flex w='100%'>
                    <Box w='80%' bg=''>

                        <PrimarySubtitle fontSize='14px' color='#333333'>
                            {code}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='120%'>
                        <PrimarySubtitle fontSize='14px' color='#8c99a5'>
                            {createdTime}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='80%'>
                        <PrimarySubtitle fontSize='14px' color='#333333'>
                            {productName}
                        </PrimarySubtitle>
                    </Box>
                    <Box w='80%'>
                        <PrimarySubtitle fontSize='14px' color='#333333'>
                            {agentName}
                        </PrimarySubtitle>
                    </Box>
                </Flex>
            </Container>
        </CssCart>
    )


}
