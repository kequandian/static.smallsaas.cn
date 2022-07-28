import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import {
    Button, SlideFade, useDisclosure, Lorem
,Collapse

} from '@chakra-ui/react'
import ItemCart from '@/components/presenter/ItemCart'



function SlideFadeEx() {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <>
            <Button onClick={onToggle}>Click Me</Button>
            {/* <SlideFade in={isOpen} offsetY='20px'>
                    <Box
                        p='40px'
                        color='white'
                        mt='4'
                        bg='teal.500'
                        rounded='md'
                        shadow='md'
                    >
                        <Lorem count={1} />
                    </Box>
                </SlideFade> */}

            <Collapse in={isOpen} animateOpacity>
                {/* <Box
                w='100px'
                h='100px'
                    p='40px'
                    color='white'
                    mt='4'
                    bg='teal.500'
                    rounded='md'
                    shadow='md'
                > */}
               {/* 11     <Lorem count={1} /> */}
                {/* </Box> */}
             <div style={{background:'#ff0000'}}>
             11
                 </div>   
            </Collapse>
        </>
    )
}

export default SlideFadeEx;

