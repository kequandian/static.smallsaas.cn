import React, { useState, useEffect } from 'react';
import {
    Stack, Flex, Text, Center, Input, InputRightAddon, Spacer, CheckIcon,
    InputGroup,
    InputLeftAddon,
    Button, ChakraProvider
} from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Number from './image/Number'
import VerificationCode from './image/VerificationCode'
import QRCode from './image/QRCode'
import Account from './image/Account'
import Name from './image/Name'
import { useForm } from 'react-hook-form';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import TopBar from '@/components/presenter/TopBar'


// --登录页面
export default function index(props) {

    const { phone, validateCode, password } = props

    const [showPhoneLogin, setShowPhoneLogin] = useState(true)

    let api = '/api/app/oauth/account/login'

    // const [data] = useTokenRequest({ api });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    function validateData(values) {

        // console.log('values = ', values)

        promiseAjax(api, values, { method: 'POST' }).then(resp => {
            // console.log('resp data = ', resp)
            if (resp && resp.code === 200) {
                history.push('/orders')
                setToken(resp.data.accessToken)
                // console.log('accessToken = ', resp.data.accessToken)
            }
        });
    }

    const swtichClick = (status) => {
        setShowPhoneLogin(status)
    }
    function enroll() {
        history.push('/enroll')
    }

    // function onLoginClick() {
    //     if (resp && resp.code === 200) {

    //     }
    // }


    return (
        <ChakraProvider>
            <TopBar>
                <CssCart position='fixed' width='100%' height='100%' padding='16px' background='linear-gradient(141deg, rgba(18, 157, 186)1%,rgba(64, 186, 165)80%)'>

                    {/* <CssCart position='fixed' width='100%' height='100%'  backgroundColor='#ff0000' padding='16px'> */}
                    <Stack spacing={6}>
                        < Center h='100px' w='100%' bg=''>
                            <Text fontSize='40px' color='#d22e21'>5G</Text>
                        </Center>

                        {/* // --登录页面 手机号登录or账号密码登录 */}
                        {showPhoneLogin ? (
                            <>
                                <CssCart width='260px' margin='auto'>
                                    <Container>
                                        <Flexbox justify='start' direction='row' align='start-with-last-end' >
                                            <Text fontSize='16px' color='#ffffff' onClick={() => swtichClick(true)}>手机号登录</Text>
                                            <Text fontSize='16px' color='#33333350' onClick={() => swtichClick(false)}>账号密码登录</Text>
                                        </Flexbox>
                                    </Container>
                                </CssCart>
                                <form onSubmit={handleSubmit(validateData)} noValidate>

                                    <Spacer />

                                    <Stack spacing={6} h=''>
                                        <>
                                            {/* <InputGroup size='md'>
                            <InputLeftAddon
                                children={<Name />}
                            />
                            <Input  variant='outline'  type='tel' placeholder='名字'
                                {...register('name', {
                                })}
                            />
                        </InputGroup> */}

                                            <InputGroup size='md'>
                                                <InputLeftAddon
                                                    children={<Number />}
                                                />
                                                <Input variant='outline' type='tel' placeholder='号码'
                                                    {...register('phone', {
                                                        required: '请输入号码',
                                                        minLength: { value: 4, message: '最小长度应为4' },
                                                    })}
                                                />
                                                {/* <InputRightAddon
                        children='获取验证码'
                    /> */}
                                                <InputRightAddon w='90px' padding='8px'>
                                                    <div style={{ color: '#a772ff', fontSize: '13px' }} onClick   >
                                                        获取验证码
                                </div>
                                                </InputRightAddon>
                                            </InputGroup>

                                            <InputGroup size='md'>
                                                <InputLeftAddon children={<QRCode />} />
                                                <Input variant='outline' placeholder='请输入验证码' value={validateCode}
                                                    {...register('validateCode', {
                                                    })}
                                                />
                                            </InputGroup>
                                            {/* <InputGroup size='md'>
                            <InputLeftAddon children={<VerificationCode />} />
                            <Input  variant='outline'  placeholder='密码' value={password}
                                {...register('password', {})} />
                        </InputGroup> */}
                                            <Spacer />
                                            {/* <Button solid color='#0e639c' navigation>登录</Button> */}
                                            <Button width='100%' height='40px' colorScheme='telegram' variant='solid' isLoading={isSubmitting} type='submit' size='sm' >
                                                登录
                </Button> </>
                                    </Stack>
                                </form>
                            </>) : <>
                                <CssCart width='260px' margin='auto'>
                                    <Container>
                                        <Flexbox justify='start' direction='row' align='start-with-last-end' >
                                            <Text fontSize='16px' color='#33333350' onClick={() => swtichClick(true)}>手机号登录</Text>
                                            <Text fontSize='16px' color='#ffffff' onClick={() => swtichClick(false)}>账号密码登录</Text>
                                        </Flexbox>
                                    </Container>
                                </CssCart>
                                <form onSubmit={handleSubmit(validateData)} noValidate>

                                    <Spacer />

                                    <Stack spacing={6} >
                                        <InputGroup size='md'>
                                            <InputLeftAddon
                                                children={<Account />}
                                            />
                                            <Input variant='outline' type='text' placeholder='账号'
                                                {...register('account', {
                                                    required: '',
                                                })}
                                            />

                                        </InputGroup>

                                        <InputGroup size='md'>
                                            <InputLeftAddon children={<VerificationCode />} />
                                            <Input variant='outline' placeholder='密码' value={validateCode}
                                                {...register('password', {
                                                })}
                                            />
                                        </InputGroup>
                                        <Spacer />

                                        {/* <Button solid color='#0e639c' navigation>登录</Button> */}

                                        <Button width='100%' height='40px' colorScheme='telegram' variant='solid' isLoading={isSubmitting} type='submit' size='sm'>
                                            登录
                    </Button>


                                    </Stack>
                                </form>
                            </>}
                        < Center h='50px' w='100%' bg='' onClick={enroll}>
                            <Text fontSize='10px' color='#ffffff'>还没有账号？去注册 ></Text>
                        </Center>
                    </Stack>
                </CssCart>
            </TopBar>

        </ChakraProvider>
    )


}
