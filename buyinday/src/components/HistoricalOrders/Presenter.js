import React from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box } from '@chakra-ui/react'
import { getEndpoint } from 'zero-element-boot/lib/components/config/common';
import VStack from 'zero-element-boot/lib/components/layout/VStack';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/Text/ItemTitle';
import ItemSubitle from 'zero-element-boot-plugin-theme/lib/components/Text/ItemSubitle';
import ItemAccent from 'zero-element-boot-plugin-theme/lib/components/Text/ItemAccent';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/Text/ContainerInactiveTitle';

/**
 *
 * @returns 
 */


export default function index(props) {

    const { TotalAmount = '124', time = '2022-06-29' } = props

    return (
        <Box w='100%' border='' >
            <CssCart height='' width='40%'  margin=' 20px auto'  border=''>
               <>
                  <ContainerInactiveTitle fontSize='4px'>{time}</ContainerInactiveTitle>
                 <Cart  shadow='0 0 4px rgba(0, 0, 0, 0.1)' fill='#ffffff' linewidth='0' >
                    <HCenter>
                        <ContainerInactiveTitle>付款金额</ContainerInactiveTitle>
                        <ItemAccent justifyContent='center' fontSize='26px'><>￥{TotalAmount}</></ItemAccent>
                        <ContainerInactiveTitle fontSize='14px'> 订单详情 </ContainerInactiveTitle>
                    </HCenter>
                </Cart>  
               </> 
            </CssCart>
        </Box>
    )
}