import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import TeanRouter from './TeanRouter';
import Avatar from '@/components/presenter/Avatar'

import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {

    const api = '/api/invitationData'


    const [data] = useTokenRequest({ api });
    // console.log(data, '==data11111111111');


    const items = data.records
    // console.log(items, '=======================items');

    // const { avatar, name, preStoragePoint } = items

    return (
        <>
            <PageModuleContainer>
                <PrimaryTitle>
                   三级代理
            </PrimaryTitle>
                {items && Array.isArray(items) && items.length > 0 ? (

                    <CssCart backgroundColor=''>
                        <TeanRouter items={items} />
                    </CssCart>
                ) : <></>}
            </PageModuleContainer>
        </>
    )


}
