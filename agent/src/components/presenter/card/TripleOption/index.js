import React from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import Item from './item';

/**
 * 
 * @param {options} options 数据
 * 
 options={[{ "value": "null", "name": "无效" },{ "value": "SECONDARY_AGENT", "name": "三级" },{...}]}
 * 
 */
export default function index(props) {

    const { defaultValue, options, callBack, id} = props

    return (

        // <CssCart  backgroundColor='#f5f5f5' padding='4px' margin='' width=''>
            <Center>
                <Flex>
                    {
                        options && options.map((item, i) => (
                           <Item id={id} callBack={callBack} defaultValue={defaultValue}  {...item} key={i} />
                        )
                        )
                    }
                </Flex>
            </Center>
        // </CssCart>


    )



}