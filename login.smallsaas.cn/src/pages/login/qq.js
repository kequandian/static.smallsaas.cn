import React, { useState, useEffect } from 'react';
import { Stack, Flex, Text, Center, Box, ChakraProvider } from '@chakra-ui/react'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import { Toast } from 'antd-mobile'

// --登录页面
export default function index(props) {

    const code = window.location.href.split('=')[1]

    console.log('code =', code)
    console.log('GetCode =', window.location.href)

    const [data, setData] = useState({})
    //终端api
    let api = '/api/oauth/qq/login'

    //登录系统api
    let loginApi = '/api/sys/oauth/qq/login'

    //获取QQ返回的code
    function getCode() {
        const queryData = queryData ? useQuery(props) : ''
        console.log('queryData=', queryData)
    }

    //系统QQ登录api
    function sysLogin() {

        const loginData = {
            "code": `${code}`,
            "app": "Report"
        }

        promiseAjax(loginApi, loginData, { method: 'POST' }).then(resp => {
            if (resp && resp.code === 200) {
                setToken(resp.data.accessToken)
                console.log('token =', getToken())
                Toast.show(
                    '登录成功',
                    2
                )
                setTimeout(() => {
                    const w = window.open('about:self');
                    w.location.href = `https://house.cloud.smallsaas.cn?token=${getToken()}`;
                }, 200)
            }
        })
    }

    //终端QQ登录api
    function qqLogin() {
        const loginData = {
            "code": `${code}`,
            "app": "Report"
        }
        promiseAjax(api, loginData, { method: 'POST' }).then(resp => {
            if (resp && resp.code === 200) {
                setToken(resp.data.accessToken)
                let data=resp.data
                console.log('data =', data)
                console.log('name =', data.name)
            
                console.log('token =', getToken())
                Toast.show(
                    '登录成功',
                    2
                )
                setTimeout(() => {
                    const w = window.open('about:self');
                    w.location.href = `https://www.smallsaas.cn/todo?name=${data.name}&avatar=${data.avatar}&phone=${data.phone}`;
                }, 1000)
            }
        })
    }
   
    useEffect(_ => {
        getCode()
        setTimeout(() => {
            // qqLogin()
        }, 200)
    }, [])

    return (
        <ChakraProvider>
            <div className='login' />
            <Stack spacing={6} w='100%' padding='20px 10px'>
                <>
                    <Flex position='' top='' padding=' 0 0 0 12% ' margin='' w='100%' h='57px' left='10%'>
                        <Center h='100%'>
                            <div style={{ height: '50px', width: "50px", backgroundSize: '100%', backgroundImage: 'url(https://static.smallsaas.cn/house/2022/image/SmallSaaS/SmallSaaS.png)' }} />
                        </Center>
                        <Center h='100%' margin='0 0 0 16px '>
                            <Stack h='100%' spacing={0}>
                                <Text color='#f5f5f5' fontSize='4xl'>smallsaas.cn</Text>
                            </Stack>
                        </Center>
                    </Flex>
                    <Center>
                        <Stack spacing='6'>
                            <Text color='#f5f5f5' fontSize='1xl'>请选择你的app</Text>
                            <Center display='grid' gridTemplateColumns='repeat(2, 1fr)'  >
                                <Center onClick={() => sysLogin()} borderRadius='10px' w='150px' padding='20px 0' backgroundColor='#ffffff10' margin='10px'>
                                    <Stack>
                                        <Center>
                                            <svg t="1669617993934" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2716" width="38" height="38"><path d="M748.059855 454.547497c-22.36231-108.577904-118.169353-191.614086-236.314147-191.614086-92.64912 0-172.455747 51.129494-210.771401 127.782292-99.011015 12.724813-172.45677 92.581582-172.45677 191.614086 0 105.373932 86.241176 191.614086 191.614086 191.614086l415.132812 0c89.445148 0 159.709445-70.287833 159.709445-159.735028C894.974903 531.200294 827.914578 460.934974 748.059855 454.547497" p-id="2717" fill="#e6e6e6"></path></svg>
                                        </Center>
                                        <Center w='300px' padding='0 0px' color='#fff'>
                                            匠城回迁
                                        </Center>
                                    </Stack>

                                </Center>
                                <Center onClick={() => qqLogin()} borderRadius='10px' w='150px' padding='20px 0' backgroundColor='#ffffff10' margin='10px'>
                                    <Stack>
                                        <Center>
                                            <svg t="1669619389388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19976" width="38" height="38"><path d="M819.2 307.2H256v460.8h563.2V307.2zM256 204.8a102.4 102.4 0 0 0-102.4 102.4v460.8a102.4 102.4 0 0 0 102.4 102.4h563.2a102.4 102.4 0 0 0 102.4-102.4V307.2a102.4 102.4 0 0 0-102.4-102.4H256z" fill="#40B1BA" p-id="19977"></path><path d="M358.4 153.6a51.2 51.2 0 0 1 102.4 0v153.6a51.2 51.2 0 0 1-102.4 0V153.6z m153.6 409.6a51.2 51.2 0 0 1 51.2-51.2h102.4a51.2 51.2 0 0 1 51.2 51.2v102.4a51.2 51.2 0 0 1-51.2 51.2h-102.4a51.2 51.2 0 0 1-51.2-51.2v-102.4z m153.6-460.8a51.2 51.2 0 0 0-51.2 51.2v153.6a51.2 51.2 0 1 0 102.4 0V153.6a51.2 51.2 0 0 0-51.2-51.2z" fill="#39D2C4" p-id="19978"></path></svg>
                                        </Center>
                                        <Center w='300px' padding='0 0px' color='#fff'>
                                            TODO
                                        </Center>
                                    </Stack>
                                </Center>

                            </Center>
                        </Stack>
                    </Center>

                </>
            </Stack>
        </ChakraProvider>
    )


}
