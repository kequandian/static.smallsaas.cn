import React, { useState, useEffect } from 'react';
import {
    Stack, Flex, Text, Center, Input, InputRightAddon, Spacer, CheckIcon,
    InputGroup, Box,
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
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


// --登录页面
export default function index(props) {

    const { phone, validateCode, password } = props
    const queryData = useQuery(props)
    const appid = queryData.query.appid


    // 用于切换手机号或者账号密码登录
    const [showPhoneLogin, setShowPhoneLogin] = useState(true)

    let api = '/api/app/oauth/account/login'

    const defaultValues = {};
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    function validateData(values) {

        values.appid = "Unicom5G"
        promiseAjax(api, values, { method: 'POST' }).then(resp => {
            if (resp && resp.code === 200) {
                // console.log('appid = ', appid)
                setToken(resp.data.accessToken)
                let Permissions = resp.data.userTypeList

                //请求登录api成功，并且有appid，跳转到首页
                history.push(`/orders?appid=${appid}&Permissions=${Permissions}`)
                promiseAjax('/api/u/saasAgent/invite?inviteCode=', { method: 'PUT' }).then(resp => {
                })

                //请求登录api成功，访问用户信息api，判断是否授权，未授权跳转到注册成功页面
                if (resp && resp.code === 200 && !appid) {
                    promiseAjax('/api/u/saasAgent/myAgentInfo', { method: 'GET' }).then(resp => {
                        if (resp && resp.code === 200) {
                            let info = resp.data
                            console.log('info ==', info)
                            if (!info.level) {
                                history.push(`/enroll/RegistrationSuccessful?Permissions=${Permissions}`)
                            }
                        }
                    })
                    //请求登录api成功，并且没有appid，跳转到选择app页面
                    history.push(`/SelectApply?Permissions=${Permissions}`)
                }
            }
        }).catch(errors => {
            console.log('errors==', errors)
            alert('登录失败，请重新输入')
        });
    }


    const swtichClick = (status) => {
        setShowPhoneLogin(status)
        reset({ defaultValues })
    }
    function enroll() {
        history.push(`/enroll`)
    }

    return (
        <ChakraProvider>
            <CssCart position='fixed' width='100%' height='100%' padding='16px' >

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
                                        <Text fontSize='16px' color='#333333' onClick={() => swtichClick(true)}>手机号登录</Text>
                                        <Text fontSize='16px' color='#c3c3c3' onClick={() => swtichClick(false)}>账号密码登录</Text>
                                    </Flexbox>
                                </Container>
                            </CssCart>
                            <form onSubmit={handleSubmit(validateData)} noValidate>
                                <Spacer />
                                <Stack spacing={6} h=''>
                                    <>
                                        <InputGroup size='md' errorBorderColor>
                                            <InputLeftAddon
                                                children={<Number />}
                                            />
                                            <Input variant='outline' type='tel' placeholder='号码'
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
                                            <Input variant='outline' placeholder='请输入验证码' value={validateCode}
                                                {...register('validateCode', {
                                                })}
                                            />
                                        </InputGroup>
                                        <Spacer />
                                        {/* <input type="text" id="id名称" onkeyup="value=value.replace(/[^(\d)]/g,'')"
                                            onblur={checkNum()} /> */}
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
                                    <Text fontSize='16px' color='#c3c3c3' onClick={() => swtichClick(true)}>手机号登录</Text>
                                    <Text fontSize='16px' color='#333333' onClick={() => swtichClick(false)}>账号密码登录</Text>
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
                                    <Input type='password' variant='outline' placeholder='密码' value={validateCode}
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
                    < Center h='50px' w='100%' bg='' onClick={() => enroll()}>
                        <Text fontSize='14px' color='#333333'>还没有账号？去注册 </Text>
                    </Center>
                </Stack>
            </CssCart>
        </ChakraProvider>
    )


}
