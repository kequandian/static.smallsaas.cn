import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle';
import { Flex, Box } from '@chakra-ui/react'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';


export default function (props) {


    return (
        <HCenter offset='90px'>
            <h1>大匠回迁</h1>
            <Flex>
                <ContainerInactiveTitle>手机号登录</ContainerInactiveTitle>
                <ContainerInactiveTitle>账号密码登录</ContainerInactiveTitle>
            </Flex>
        </HCenter>
    )
}