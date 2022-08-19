import React, { useState, useEffect } from 'react';
import {
    Stack, Flex, Text, Center, Input, InputRightAddon, Spacer, CheckIcon, ChakraProvider,
    InputGroup,
    InputLeftAddon,
    Button
} from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Number from '../login/image/Number'
import VerificationCode from '../login/image/VerificationCode'
import QRCode from '../login/image/QRCode'
import Account from '../login/image/Account'
import Name from '../login/image/Name'
import { useForm } from 'react-hook-form';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import { history } from 'umi';
import TopBar from '@/components/presenter/TopBar'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';



// --注册页面
export default function index(props) {

    const { phone, validateCode, password,appid } = props


    const [ code, setCode ] = useState(props.location.query.invitationCode)

    let api = '/api/app/oauth/account/register'
    let apiData = '/api/u/saasAgent/myAgentInfo'

    // const [data] = useTokenRequest({ api });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    function validateData(values) {
        values.appid = "Unicom5G"
        promiseAjax(api, values, { method: 'POST' }).then(resp => {
            console.log('resp data = ', resp)
            if (resp && resp.code === 200) {
                history.push(`/enroll/RegistrationSuccessful/login?${appid}`)
                // history.push('/orders')
                setToken(resp.data.accessToken)
                console.log('accessToken = ', resp.data.accessToken)
            }
        });
    }

    function login() {
        history.push(`/login?${appid}`)
    }

    return (
        <ChakraProvider>
            <TopBar>
                注册
            </TopBar>

            <CssCart position='fixed' width='100%' height='100%' padding='16px'>

                {/* <CssCart position='fixed' width='100%' height='100%'  backgroundColor='#ff0000' padding='16px'> */}
                <Stack spacing={6}>
                    < Center h='100px' w='100%' bg=''>
                        <Text fontSize='40px' color='#d22e21'>5G</Text>
                    </Center>

                    {/* <CssCart width='160px' margin='auto'>
                            <Center justify='start' direction='row' align='start-with-last-end' >
                                <Text fontSize='16px' color='#333333' onClick={() => swtichClick(true)}>注册</Text>
                            </Center>
                        </CssCart> */}
                    <form onSubmit={handleSubmit(validateData)} noValidate>

                        <Spacer />

                        <Stack spacing={6} h=''>
                            <>
                                <InputGroup size='md'>
                                    <InputLeftAddon
                                        children={<Name />}
                                    />
                                    <Input type='tel' placeholder='名字'
                                        {...register('name', {
                                        })}
                                    />
                                </InputGroup>

                                <InputGroup size='md'>
                                    <InputLeftAddon
                                        children={<Number />}
                                    />
                                    <Input type='tel' placeholder='号码'
                                        {...register('phone', {
                                            required: '请输入号码',
                                            minLength: { value: 4, message: '最小长度应为4' },
                                        })}
                                    />

                                    <InputRightAddon w='90px' padding='8px'>
                                        <div style={{ color: '#a772ff', fontSize: '13px' }} onClick   >
                                            获取验证码
                                        </div>
                                    </InputRightAddon>
                                </InputGroup>

                                <InputGroup size='md'>
                                    <InputLeftAddon children={<QRCode />} />
                                    <Input placeholder='请输入手机动态码' value={validateCode}
                                        {...register('validateCode', {
                                        })}
                                    />
                                </InputGroup>
                                <InputGroup size='md'>
                                    <InputLeftAddon children={<Account />} />
                                    <Input placeholder='邀请码' defaultValue={code}
                                        {...register('invitationCode', {
                                        })}
                                    />
                                </InputGroup>
                                <InputGroup size='md'>
                                    <InputLeftAddon children={<VerificationCode />} />
                                    <Input placeholder='密码' value={password}
                                        {...register('password', {})} />
                                </InputGroup>
                                <Spacer />
                                {/* <Button solid color='#0e639c' navigation>登录</Button> */}
                                <Button width='100%' height='40px' colorScheme='telegram' variant='solid' isLoading={isSubmitting} type='submit' size='sm' >
                                注册
                                </Button> </>
                            < Center h='50px' w='100%' bg='' onClick={login}>
                                <Text fontSize='14px' color='#ffffff'>已有账号？去登录 </Text>
                            </Center>
                        </Stack>
                    </form>
                </Stack>
            </CssCart>

        </ChakraProvider>
    )


}
