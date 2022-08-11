import React from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import Item from './item';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';

/**
 * 配套设施配置组件
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { homeData, columns = '4' } = props

    console.log('homeData==', homeData)
    // const titleBold =homeData[0]
    return (
        <>
            {
                homeData && homeData.map((item, i) => (
                    <Cart corner='16px' padding='0'  margin='6px 2px' {...item} key={i}>
                        <Flex>
                            <Center w='70px' borderRight='1px #d0cdcd solid' >
                                <ItemTitleBold >
                                    {item.cnName || ''}
                                </ItemTitleBold>
                            </Center>
                            <Center margin='8px'>
                                <Item items={homeData.items} columns={columns} key={i}  {...item} />
                            </Center>
                        </Flex>
                    </Cart>
                )
                )
            }

        </>

    )



}