import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Item from './Item/config'
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import TopBar from '@/components/presenter/TopBar'


// --预算分成设置
export default function index(props) {

    const api = '/api/u/saasAgent/pointSetting/byType/charges'
    // const api = '/api/pointListSettingData'

    const [data] = useTokenRequest({ api });


    return (
        <ChakraProvider>
            <TopBar>
                <>
                    <CssCart margin='6px 0 10px 40px' >
                        <ContainerSubtitle>预算款分成设置</ContainerSubtitle>
                    </CssCart>
                    <Spacer />

                    <CssCart backgroundColor='' margin='8px 0 0 0'>
                        <Item list={data.records} />
                    </CssCart>
                </>
            </TopBar>
        </ChakraProvider>
    )


}
