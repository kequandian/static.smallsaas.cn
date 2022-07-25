import React from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Center, Stack } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import Item from './item';

/**
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { items, columns = '1' } = props


    return (
        // (i == items.length - 1) ?

        <CssCart backgroundColor='#ffffff' padding='4px' margin='' width='100%'>
            <Stack spacing='0' >
                {
                    items && items.map((item, i) => (
        (i == items.length - 1) ?

                       ( <CssCart  minHeight='40px' padding='4px 10px' >

                            <Item  {...item} key={i} />
                        </CssCart>):
                        (
                            <CssCart borderBottom='1px #f5f5f5 solid' minHeight='40px' padding='4px 10px' >

                            <Item  {...item} key={i} />
                        </CssCart> 
                        )
                    )
                    )
                }
            </Stack>
        </CssCart>


    )



}