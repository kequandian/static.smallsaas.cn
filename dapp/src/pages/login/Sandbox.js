import React, { useState, useEffect } from 'react';
import GoodHouse from './index';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle';
import { Flex, Box } from '@chakra-ui/react'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import { getEndpoint } from 'zero-element-boot/lib/components/config/common';
const endpoint = getEndpoint()


export default function (props) {


    const {  DetailType = '户型fwefwgrfeghtghrtg', DetailTowards = '朝向vfehrthtrhtrb', DetailFloor = '楼层efbethetfbefb', DetailArea = '面积regtegreg',

    } = props;

    return (
        <CssCart width='100%' padding='0 0 10px 0 ' backgroundColor='#f5f5f5'>
            <div  >

            </div>
        </CssCart>
    )
}