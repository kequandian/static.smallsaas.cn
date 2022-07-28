import React from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import List from './config'
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';


export default function Container(props) {

    const { address = '广东', } = props;

    const onHandleNumberClick = (NumberClick) => {
        console.log('NumberClick == ', NumberClick)
    }


    return (
        <ChakraProvider>
            <Cart fill='#465bce' padding='18px 10px 10px 10px'>
                <Text color='#ffffff'>归属地：{address}</Text>
            </Cart>
            <CssCart border='1px #dcdcdc solid' borderRadius='4px' margin='10px' padding='14px 20px 10px 6%'>
                <>
                    <Text fontSize='18px'> 请选择你的心仪号码</Text>
                    <List onNumberClick={onHandleNumberClick} />
                </>
            </CssCart>
            <Button color='#4089ec' solid >下一批</Button>
        </ChakraProvider>
    )
}