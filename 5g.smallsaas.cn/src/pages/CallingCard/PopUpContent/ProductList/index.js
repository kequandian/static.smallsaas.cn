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

    const { items, columns = '1',onProductClick , selectGoodsId } = props

    return (

        <Center>
            <Container>
                <div style={{
                    display: 'grid', gridTemplateColumns: `repeat(1, 1fr)`, gridRowgap: '2px', gridColumnGap: '2px',
                }}>
                    {
                        items && items.map((item, i) => (
                            <Item  {...item} key={i} onProductClick={onProductClick} selectGoodsId={selectGoodsId}/>
                        )
                        )
                    }
                </div>
            </Container>
        </Center>


    )



}