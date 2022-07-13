import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';



export default function index(props) {
    const { secondaryAgentCount='', Level3='', PushStraight, secondaryAgentAmount, tertiaryAgentAmount } = props
   
    return (
        <Container>
            <Flex margin='0 10px'>
                <Flex w='60%'>
                    <PrimarySubtitle fontSize='18px' margin='10px auto 0 0 ' >
                        {secondaryAgentCount}
                    </PrimarySubtitle>
                    <Spacer />
                    <PrimarySubtitle fontSize='18px' margin='10px auto 0 0 '>
                        {Level3}
                    </PrimarySubtitle>
                </Flex>

                <Spacer />
                <PrimarySubtitle fontSize='16px' margin='10px auto 0 0 '>
                    ￥{PushStraight}
                </PrimarySubtitle>

                <Spacer />
                <PrimarySubtitle fontSize='16px' margin='10px auto 0 0 '>
                    ￥{secondaryAgentAmount}
                </PrimarySubtitle>

                <Spacer />
                <PrimarySubtitle fontSize='16px' margin='10px auto 0 0 '>
                    ￥{tertiaryAgentAmount}
                </PrimarySubtitle>

            </Flex>
        </Container>
    )


}
