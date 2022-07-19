import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import MyInvite from './config';
import Avatar from '@/components/presenter/Avatar'
import ContainerSubtitle from '@/components/text/ContainerSubtitle';

import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {

    const api = '/api/MyInviteData'


    const [data] = useTokenRequest({ api });
    // console.log(data, '==data11111111111');


    const items = data.records
    // console.log(items, '=======================items');

    // const { avatar, name, preStoragePoint } = items


    return (
        <>
            <PageModuleContainer>
                <>
                    <ContainerSubtitle>
                        代理授权（我的新邀请）
                    </ContainerSubtitle>
                    {items && Array.isArray(items) && items.length > 0 ? (
                        <CssCart backgroundColor='' margin='8px 0 0 0'>
                            <MyInvite items={items} />
                        </CssCart>
                    ) : <></>}
                </>
            </PageModuleContainer>
        </>
    )


}
