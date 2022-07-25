import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import Item from './Item/config'
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import TopBar from '@/components/presenter/TopBar'



// --话费分成设置item
export default function index(props) {

    const api = '/api/u/saasAgent/pointSetting/byType/bonus'

    const [data] = useTokenRequest({ api });


    return (
        <ChakraProvider>
            <TopBar>
                <>

                    <CssCart margin='6px 0 10px 40px' >
                        <ContainerSubtitle>话费分成设置</ContainerSubtitle>
                    </CssCart>
                    <CssCart backgroundColor='' margin='8px 0 0 0'>
                        <Item list={data.records} />
                    </CssCart>
                </>
            </TopBar>
        </ChakraProvider>
    )


}
