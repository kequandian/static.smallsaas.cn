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
// import TopBar from 'zero-element-boot-presenter/lib/components/presenter/TopBar'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


// --登录页面
export default function index(props) {

    const { phone, validateCode, password } = props
    // const queryData = useQuery(props)

    let api = '/api/app/oauth/account/login'

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
                history.push(`/orders?appid=${appid}`)
                setToken(resp.data.accessToken)
                if (resp && resp.code === 200 && !appid) {
                    history.push('/SelectApply')
                }
            }
        }).catch(errors => {
            console.log('errors==', errors)
            alert('登录失败，请重新输入')
        });
    }

    function enroll() {
        history.push(`/enroll?appid=${appid}`)
    }


    return (
        <ChakraProvider>
            <div className='Global' />
            <Center position='fixed' width='100%' height='100%' padding='16px' >
                <Stack spacing={6} w='400px'>
                    < Center h='100px' w='100%' bg=''>
                        <Text fontSize='44px' color='#ffffff'>SmallSaaS</Text>
                    </Center>
                    <>
                        <form onSubmit={handleSubmit(validateData)} noValidate>
                            <Spacer />
                            <Stack spacing={6} h=''>
                                <>
                                    <InputGroup size='md' errorBorderColor>
                                        <InputLeftAddon
                                            children={<Number />}
                                        />
                                        <Input variant='solid' type='tel' placeholder='号码'
                                            {...register('phone', {
                                                required: '请输入号码',
                                                minLength: { value: 4, message: '最小长度应为4' },
                                            })}
                                        />
                                        {/* <InputRightAddon w='90px' padding='8px'>
                                            <div style={{ color: '#a772ff', fontSize: '13px' }} onClick   >
                                                获取验证码
                                            </div>
                                        </InputRightAddon> */}
                                    </InputGroup>
                                    {/* <InputGroup size='md'>
                                        <InputLeftAddon children={<QRCode />} />
                                        <Input variant='solid' placeholder='请输入验证码' value={validateCode}
                                            {...register('validateCode', {
                                            })}
                                        />
                                    </InputGroup> */}
                                     <InputGroup size='md'>
                                        <InputLeftAddon children={<QRCode />} />
                                        <Input variant='solid' placeholder='密码'  type='password' value={validateCode}
                                            {...register('password', {
                                            })}
                                        />
                                    </InputGroup>
                                    <Spacer />
                                    <Button width='100%' height='40px' colorScheme='whatsapp' variant='solid' isLoading={isSubmitting} type='submit' size='sm' >
                                        登录
                                    </Button> </>
                            </Stack>
                        </form>
                    </>
                    < Center h='50px' w='100%' bg='' onClick={enroll}>
                        <Text fontSize='14px' color='#333333'>还没有账号？去注册 </Text>
                    </Center>
                    < Center>
                        <Flex w='160px' h='50px' bg='#ffffff20' borderRadius='40px'  padding='16px 14px' onClick >
                            <Text fontSize='14px' color='#333333'>使用第三方登录 </Text>
                            <Center h='12px' margin='0 2px'>
                            <svg t="1661482961807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="56565" width="28" height="28"><path d="M511.037 986.94c-85.502 0-163.986-26.686-214.517-66.544-25.66 7.149-58.486 18.655-79.202 32.921-17.725 12.202-15.516 24.647-12.32 29.67 14.027 22.069 240.622 14.092 306.04 7.219v-3.265z" fill="#FAAD08" p-id="56566"></path><path d="M495.627 986.94c85.501 0 163.986-26.686 214.518-66.544 25.66 7.149 58.485 18.655 79.203 32.921 17.724 12.202 15.512 24.647 12.32 29.67-14.027 22.069-240.623 14.092-306.042 7.219v-3.265z" fill="#FAAD08" p-id="56567"></path><path d="M496.137 472.026c140.73-0.935 253.514-27.502 291.73-37.696 9.11-2.432 13.984-6.789 13.984-6.789 0.032-1.25 0.578-22.348 0.578-33.232 0-183.287-88.695-367.458-306.812-367.47C277.5 26.851 188.8 211.021 188.8 394.31c0 10.884 0.55 31.982 0.583 33.232 0 0 3.965 4.076 11.231 6.048 35.283 9.579 150.19 37.482 294.485 38.437h1.037z m387.364 154.941c-8.66-27.825-20.484-60.273-32.455-91.434 0 0-6.886-0.848-10.366 0.158-107.424 31.152-237.624 51.006-336.845 49.808h-1.026c-98.664 1.186-227.982-18.44-335.044-49.288-4.09-1.176-12.168-0.677-12.168-0.677-11.97 31.16-23.793 63.608-32.453 91.433-41.3 132.679-27.92 187.587-17.731 188.818 21.862 2.638 85.099-99.88 85.099-99.88 0 104.17 94.212 264.125 309.947 265.596a765.877 765.877 0 0 1 5.725 0c215.738-1.471 309.947-161.424 309.947-265.595 0 0 63.236 102.519 85.102 99.88 10.186-1.231 23.566-56.14-17.732-188.819" p-id="56568"></path><path d="M429.208 303.911c-29.76 1.323-55.195-32.113-56.79-74.62-1.618-42.535 21.183-78.087 50.95-79.417 29.732-1.305 55.149 32.116 56.765 74.64 1.629 42.535-21.177 78.08-50.925 79.397m220.448-74.62c-1.593 42.507-27.03 75.941-56.79 74.62-29.746-1.32-52.553-36.862-50.924-79.397 1.614-42.526 27.03-75.948 56.764-74.639 29.77 1.33 52.57 36.881 50.951 79.417" fill="#FFFFFF" p-id="56569"></path><path d="M695.405 359.069c-7.81-18.783-86.466-39.709-183.843-39.709h-1.045c-97.376 0-176.033 20.926-183.842 39.709a6.66 6.66 0 0 0-0.57 2.672c0 1.353 0.418 2.575 1.072 3.612 6.58 10.416 93.924 61.885 183.341 61.885h1.045c89.416 0 176.758-51.466 183.34-61.883a6.775 6.775 0 0 0 1.069-3.622 6.66 6.66 0 0 0-0.567-2.664" fill="#FAAD08" p-id="56570"></path><path d="M464.674 239.335c1.344 16.946-7.87 32-20.55 33.645-12.701 1.647-24.074-10.755-25.426-27.71-1.326-16.954 7.873-32.008 20.534-33.64 12.722-1.652 24.114 10.76 25.442 27.705m77.97 8.464c2.702-4.392 21.149-27.488 59.328-19.078 10.028 2.208 14.667 5.457 15.646 6.737 1.445 1.888 1.84 4.576 0.375 8.196-2.903 7.174-8.894 6.979-12.217 5.575-2.144-0.907-28.736-16.948-53.232 6.99-1.685 1.648-4.7 2.212-7.558 0.258-2.856-1.956-4.038-5.923-2.342-8.678" p-id="56571"></path><path d="M503.821 589.328h-1.031c-67.806 0.802-150.022-8.004-229.638-23.381-6.817 38.68-10.934 87.294-7.399 145.275 8.928 146.543 97.728 238.652 234.793 239.996h5.57c137.065-1.344 225.865-93.453 234.796-239.996 3.535-57.986-0.584-106.6-7.403-145.283-79.631 15.385-161.861 24.196-229.688 23.389" fill="#FFFFFF" p-id="56572"></path><path d="M310.693 581.35v146.633s69.287 13.552 138.7 4.17V596.897c-43.974-2.413-91.4-7.79-138.7-15.546" fill="#EB1C26" p-id="56573"></path><path d="M806.504 427.238s-130.112 43.08-302.66 44.309h-1.025c-172.264-1.224-302.217-44.161-302.66-44.309L156.58 541.321c108.998 34.464 244.093 56.677 346.238 55.387l1.024-0.002c102.152 1.297 237.226-20.917 346.24-55.385l-43.579-114.083z" fill="#EB1C26" p-id="56574"></path></svg>
                            </Center>
                        </Flex>
                    </Center>
                </Stack>
            </Center>
        </ChakraProvider>
    )


}
