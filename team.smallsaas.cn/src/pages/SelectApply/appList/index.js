import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Center } from '@chakra-ui/react'
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import Item from './item';

/**
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { items,columns='2' } = props

    return (

            <Center>
                <Container>
                    {
                        items && items.map((item, i) => (
                            <Gridbox columns={columns}>
                                <Item  {...item} key={i} />
                            </Gridbox>
                        )
                        )
                    }
                </Container>
            </Center>


    )



}