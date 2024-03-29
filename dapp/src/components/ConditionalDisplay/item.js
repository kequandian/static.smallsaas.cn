import React from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import ConditionalIem from './ConditionalIem';

/**
 * 配套设施配置组件
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { items, columns = '2' } = props


    return (

        <CssCart backgroundColor='#ffffff' padding='4px' margin='' borderRadius='8px' width='100%'>
            <Center>
                <Container>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,80px)" }} >
                        {
                            items && items.map((item, i) => (
                                // <Gridbox columns={columns}>
                                <ConditionalIem  {...item} key={i} />
                                // {/* </Gridbox> */ }
                            )
                        )
                    }
                    </div>

                </Container>
            </Center>
        </CssCart>


    )



}