import React, { useState, useEffect } from 'react';
import {
    Stack, Flex, Text, Box, Center, Input, InputRightAddon, Spacer, CheckIcon, ChakraProvider,
    InputGroup,
    InputLeftAddon,
    Button
} from '@chakra-ui/react'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import { history } from 'umi';
import TopBar from '@/components/presenter/TopBar'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { useForm } from 'react-hook-form';
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Item from './ProductList'


export default function index(props) {

    const {onIetmClick}=props
    return (
        <ChakraProvider>
            <TopBar>
                超级管理员配置
            </TopBar>
            <div className='Global' />

            <>
                <CssCart width='200px' margin='auto'>
                    <Container>
                        <Flexbox justify='start' direction='row' align='start-with-last-end' >
                            <Box borderBottom='2px #ad2429 solid' padding='8px 8px 0 8px'>
                                <Text fontSize='16px' color='#ad2419' >联通5G卡</Text>
                            </Box>
                            <Box borderBottom='2px transparent solid' padding='8px 8px 0 8px'>
                                <Text fontSize='16px' color='#333333'>跨境短信</Text>
                            </Box>
                        </Flexbox>
                    </Container>
                </CssCart>

                <Center h='' w='100%' bg='' >
                    <Item  onIetmClick={onIetmClick}/>
                </Center>
            </>
        </ChakraProvider >
    )


}


