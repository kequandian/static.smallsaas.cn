import React, { useState, useEffect } from 'react';
import {
    Stack, Flex, Text, Center, Input, InputRightAddon, Spacer, CheckIcon,
    InputGroup, Box,
    InputLeftAddon,
    ChakraProvider
} from '@chakra-ui/react'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'


// --登录页面
export default function index(props) {

    const { width = '900px', height = '600px' } = props
    // const queryData = useQuery(props)

    let api = '/api/app/oauth/account/login'
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [account, setAccount] = useState()


    function changePhone(e) {
        setPhone(e.target.value)
        console.log('phone ==', phone)
    }
    function changePassword(e) {
        setPassword(e.target.value)
        console.log('password ==', password)
    }
    function changeAccount(e) {
        setAccount(e.target.value)
        console.log('password ==', account)
    }
    function validateData() {
        const values = {
            account, password
        }
        console.log('values ==', values)
        values.appid = ""

        promiseAjax(api, values, { method: 'POST' }).then(resp => {
            if (resp && resp.code === 200) {
                // history.push(`/orders?appid=${appid}`)
                // setToken(resp.data.accessToken)
                alert('登录成功！')
            }
        }).catch(errors => {
            console.log('errors==', errors)
            alert('登录失败，请重新输入')
        });
    }




    return (
        <ChakraProvider>
            {/* <div className='Global' /> */}

            <Center  h='600px' w="100%" bg=''>

                <div style={{ height: '180px', width: "180px", backgroundSize: '100%', backgroundImage: 'url(https://static.smallsaas.cn/house/2022/image/SmallSaaS/SmallSaaS.png)' }} />

            </Center>


        </ChakraProvider>
    )


}
