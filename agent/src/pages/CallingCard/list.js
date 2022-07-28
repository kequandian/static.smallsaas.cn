import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box, Spacer, ChakraProvider, Text } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import {
    Button,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon

} from '@chakra-ui/react'

export default function index(props) {

    const { number, onNumberClick } = props;

    return (
        <>
            <Container>
                <Flexbox direction='column' >
                    <Popover>
                        <PopoverTrigger>
                            <div style={{ width: '100%', border: '0px solid #ff0000', height: '30px', margin: '10px 0 0 20px' }} onClick={onNumberClick} >
                                <Text fontSize='20px'> {number}</Text>
                            </div>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                {/* <PopoverHeader>Header</PopoverHeader> */}
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Stack spacing={4}>
                                        <InputGroup size='sm'>
                                            <InputLeftAddon children='电话号码' />
                                            <Input type='tel' placeholder='phone number' />
                                        </InputGroup>

                                        {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                                        <InputGroup size='sm'>
                                            <InputLeftAddon children='地址' />
                                            <Input  />
                                            {/* <InputRightAddon children='.com' /> */}
                                        </InputGroup>
                                    </Stack>
                                </PopoverBody>

                            </PopoverContent>
                        </Portal>
                    </Popover>
                    <Container>
                        <Flexbox direction='row' align='between' w='100%'>
                            <Text fontSize='8px' color='#aaaaaa' as='del'>￥999</Text>
                            <Text fontSize='8px' color='#df7766'>免费领取</Text>
                        </Flexbox>
                    </Container>
                </Flexbox>
            </Container>
        </>
    )
}