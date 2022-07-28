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
    InputRightAddon, Collapse, useDisclosure, Slide, Fade, CloseButton

} from '@chakra-ui/react'
import ItemCart from '@/components/presenter/ItemCart'

export default function index(props) {

    const { number = '14314325435', onNumberClick, numList = [] } = props;

    let newList = [], newItem = [];
    numList.map((num, index) => {
        newItem.push(num)
        if (index > 0 && index % 12 == 11) {
            newList.push(newItem)
            newItem = []
        }
    });
    const { isOpen, onToggle } = useDisclosure()

    return (
        <ChakraProvider>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridRowgap: '4px', gridColumnGap: '4px' }}>
                {
                    // newList && newList.length > 0 && newList.map((item, index) => (


                    <>

                        <ItemCart key={index}>
                            <>


                                <Popover placement='top-start' w='400px' margin='40px'>
                                    <PopoverTrigger>
                                        <div style={{ width: '', border: '0px solid #ff0000', height: '30px', margin: '6px ' }} onClick={onNumberClick} >
                                            {/* <Text fontSize='20px'> {item[0]}</Text> */}
                                            <Text fontSize='20px' onClick={onToggle}>{number} </Text>
                                        </div>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent w='300px' margin='40px'>
                                            <PopoverArrow />
                                            <PopoverHeader>

                                            </PopoverHeader>
                                            <PopoverCloseButton />
                                            <PopoverBody>

                                                <Stack spacing={4}>

                                                    <Container>
                                                        <Flexbox direction='row' align='start' w='100%'>
                                                            <Text fontSize='14px' color='#aaaaaa' margin='0 0 0 20px'>已选择</Text>
                                                            <Text fontSize='14px' color='#ee4646' margin='0 0 0 20px'>靓号:{number}</Text>
                                                        </Flexbox>
                                                    </Container>
                                                    <InputGroup size='sm'>
                                                        <InputLeftAddon children='姓名' />
                                                        <Input type='text' placeholder='请填写真实姓名（已加密）' />
                                                    </InputGroup>
                                                    <InputGroup size='sm'>
                                                        <InputLeftAddon children='手机号' />
                                                        <Input type='tel' placeholder='请填写本人联系电话（已加密）' />
                                                    </InputGroup>

                                                    <InputGroup size='sm'>
                                                        <InputLeftAddon children='地址' />
                                                        <Input />
                                                    </InputGroup>
                                                </Stack>
                                            </PopoverBody>

                                        </PopoverContent>
                                    </Portal>
                                </Popover>

                                {/* <Button onClick={onToggle}>Click Me</Button> */}




                                <Container>
                                    <Flexbox direction='row' align='start-with-last-end' w='100%'>
                                        <Text fontSize='8px' color='#aaaaaa' as='del'>￥99</Text>
                                        <Text fontSize='8px' color='#df7766'>免费领取</Text>
                                    </Flexbox>
                                </Container>
                            </>


                        </ItemCart>
                        {/* 
                        <Fade  direction='buttum' in={isOpen} style={{backgroundColor:'',height:'200px', zIndex: 100 }}>
                        <CloseButton />
                            <Container>
                                <Flexbox direction='row' align='start' w='100%'>
                                    <Text fontSize='14px' color='#aaaaaa' margin='0 0 0 20px'>已选择</Text>
                                    <Text fontSize='14px' color='#ee4646' margin='0 0 0 20px'>靓号:{number}</Text>
                                </Flexbox>
                            </Container>
                            <Stack spacing={4}>
                                <InputGroup size='sm'>
                                    <InputLeftAddon children='姓名' />
                                    <Input type='text' placeholder='请填写真实姓名（已加密）' />
                                </InputGroup>
                                <InputGroup size='sm'>
                                    <InputLeftAddon children='手机号' />
                                    <Input type='tel' placeholder='请填写本人联系电话（已加密）' />
                                </InputGroup>

                                <InputGroup size='sm'>
                                    <InputLeftAddon children='地址' />
                                    <Input />
                                    <InputRightAddon children='.com' />
                                </InputGroup>
                            </Stack>

                        </Fade> */}
                    </>

                    // )
                    // )
                }

            </div>
        </ChakraProvider>
    )
}