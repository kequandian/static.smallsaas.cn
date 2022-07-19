import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Item from './Item/config'
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import ContainerSubtitle from '@/components/text/ContainerSubtitle';



export default function index(props) {

    const api = '/api/u/saasAgent/pointSetting/byType/charges' 
    // const api = '/api/pointListSettingData'

    const [data] = useTokenRequest({ api });


    return (
        <ChakraProvider>
            <PageModuleContainer>
                <>
                <ContainerSubtitle>预算款分成设置</ContainerSubtitle>
                <Spacer />

                <CssCart backgroundColor='' margin='8px 0 0 0'>
                    <Item list={data.records} />
                </CssCart>
                </>
            </PageModuleContainer>
        </ChakraProvider>
    )


}
