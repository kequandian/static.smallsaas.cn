import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Item from './Item/config'
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import TopBar from '@/components/presenter/TopBar'
import Settings from '@/components/presenter/card/Settings';
import SettingItem from '@/components/presenter/card/SettingItem';


// --预存款分成设置
export default function index(props) {

    const api = '/api/u/saasAgent/pointSetting/byType/charges'
    // const api = '/api/pointListSettingData'

    const [data] = useTokenRequest({ api });
    console.log(data, '=====data');
    console.log((data && data.records && Array.isArray(data.records) && data.records.length > 0), '=====data');
    // Array.isArray(items)

    return (
        <ChakraProvider>
            <TopBar>
                预存款分成设置
            </TopBar>
            <div className='Global' />

            <CssCart backgroundColor='' margin='4px 0 0 0'>
                <Item list={data.records} />
            </CssCart>
        </ChakraProvider>

    )


}
