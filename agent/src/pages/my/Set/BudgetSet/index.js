import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Item from './Item/config'
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';



export default function index(props) {

    const api = '/api/pointListSettingData'

    const [data] = useTokenRequest({ api });


    return (
        <ChakraProvider>
            <PageModuleContainer>
                <PrimaryTitle>预算款分成设置</PrimaryTitle>
                <CssCart backgroundColor=''>
                    <Item list={data.records} />
                </CssCart>
            </PageModuleContainer>
        </ChakraProvider>
    )


}
