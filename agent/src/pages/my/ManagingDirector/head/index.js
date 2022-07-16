import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';



export default function index(props) {
    const { secondaryAgentCount = '', point, secondaryAgentAmount, tertiaryAgentAmount } = props

    return (
        <>
            <Flex margin='' w='100%'h='74px'  bg=''>
                <Stack w='36px'h='33px' bg='#33333320'>
                    <HCenter>
                        <PrimarySubtitle fontSize='18px' >
                            {secondaryAgentCount}
                        </PrimarySubtitle>
                        <Text>二级</Text>
                    </HCenter>
                </Stack>
                <Spacer />


                <Stack w='40px'h='33px' bg='#33333330'>
                    <HCenter>
                        <PrimarySubtitle fontSize='18px' >
                            {tertiaryAgentAmount}
                        </PrimarySubtitle>
                        <Text>三级</Text>
                    </HCenter>
                </Stack>

                <Spacer />


                <Stack w='44px'h='33px' bg='#33333330'>
                    <HCenter>
                        <PrimarySubtitle fontSize='18px' >
                            <>   ￥{point}</>
                        </PrimarySubtitle>
                        <Text>直推</Text>
                    </HCenter>
                </Stack>

                <Spacer />


                <Stack w='56px' h='33px'bg='#33333330'>
                    <HCenter>
                        <PrimarySubtitle fontSize='18px' >
                            <>   ￥{secondaryAgentAmount}</>
                        </PrimarySubtitle>
                        <Text>二级贡献</Text>
                    </HCenter>
                </Stack>
                <Spacer />

                <Stack w='56px'h='33px' bg='#33333330'>
                    <HCenter>
                        <PrimarySubtitle fontSize='18px' >
                            <>   ￥{tertiaryAgentAmount}</>
                        </PrimarySubtitle>
                        <Text>二级</Text>
                    </HCenter>
                </Stack>
            </Flex>
        </>
    )


}
