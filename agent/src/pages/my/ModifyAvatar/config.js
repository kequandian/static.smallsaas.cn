import React from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Center, Stack } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import Item from './item';
import ItemCart from '@/components/presenter/ItemCart'

/**
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { items, columns = '1',cb } = props


    return (
        // (i == items.length - 1) ?

        <ItemCart>
            <Stack spacing='0' >
                {
                    items && items.map((item, i) => (
                        (i == items.length - 1) ?
                            (<CssCart minHeight='40px' padding='8px 10px' background='#ffffff' >
                                <Item  {...item} key={i} callBack={cb} />
                            </CssCart>) :
                            (
                                <CssCart borderBottom='1px #f5f5f5 solid' minHeight='40px'  background='#ffffff'  padding='8px 10px' >
                                    <Item  {...item} key={i} callBack={cb} />
                                </CssCart>
                            )
                    )
                    )
                }
            </Stack>
        </ItemCart>


    )



}