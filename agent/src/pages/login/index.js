import React, { useState, useEffect } from 'react';
import {
    Stack, Flex, Text, Center, Input, InputRightAddon, Spacer, Button, CheckIcon,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Number from './image/Number'
import VerificationCode from './image/VerificationCode'
import QRCode from './image/QRCode'


export default function index(props) {
    return (
        <CssCart backgroundColor='#ffffff' padding='16px'>
            <Stack spacing={6}>
                < Center h='100px' w='100%' bg=''>
                    <Text fontSize='40px' color='#d3455b'>5G</Text>
                </Center>
                <CssCart width='300px' margin='auto'>
                    <Container>
                        <Flexbox justify='start' direction='row' align='start-with-last-end' >
                            <Text fontSize='16px' color='#333333'>手机快捷登录</Text>
                            <Text fontSize='16px' color='#333333'>账号密码登录</Text>
                        </Flexbox>
                    </Container>
                </CssCart>
                <InputGroup size='md'>
                    <InputLeftAddon
                        children={<Number />}
                    />
                    <Input type='tel' placeholder='号码' />
                    <InputRightAddon
                        children='获取验证码'
                    />
                </InputGroup>

                <InputGroup size='md'>
                    <InputLeftAddon children={<VerificationCode />} />
                    <Input placeholder='请输入手机动态码' />
                </InputGroup>
                <Spacer />
                <InputGroup size='md'>
                    <InputLeftAddon children={<QRCode />} />
                    <Input placeholder='输入邀请码' />
                </InputGroup>
                <Spacer />
                <Button color='#f3c19d'>登录</Button>
            </Stack>
        </CssCart>


    )


}
