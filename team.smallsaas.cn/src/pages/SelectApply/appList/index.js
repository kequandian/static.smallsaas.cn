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

    const { items, columns = '2' ,Permissions} = props

    return (

        <Center>
            <Container>
                <div style={{
                    display: 'grid', gridTemplateColumns: `repeat(2, 1fr)`, gridRowgap: '2px', gridColumnGap: '2px',
                }}>
                    {
                        items && items.map((item, i) => (
                            <Item  {...item} key={i}  Permissions={Permissions}/>
                        )
                        )
                    }
                </div>
            </Container>
        </Center>


    )



}