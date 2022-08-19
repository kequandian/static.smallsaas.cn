import React, { useEffect, useState } from 'react';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import Containertitle from 'zero-element-boot-plugin-theme/lib/components/text/Containertitle';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import Router from 'zero-element-boot-presenter/lib/components/presenter/card/Router';
import List from './list'
import TagIndicator from 'zero-element-boot/lib/components/indicator/TagIndicator'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import Button from 'zero-element-boot/lib/components/presenter/button/Button';


export default function index(props) {

    const api = `/api/u/saasAgent/myInvitationList`
    const [items, setItems] = useState([])
    //获取列表数据
    useEffect(_ => {
        getList(api)
    }, [])

    function getList() {
        promiseAjax(api)
            .then(res => {
                // console.log(res, '== 列表')
                if (res && res.code === 200) {
                    let items = res.data.records;
                    setItems(items)
                }
            })
    }

    useEffect(_ => {
        getList(api)
    }, [])


    const [agentId, SetAgentId] = useState({})
    const [name, SetName] = useState({})

    function onFinish() {
        const query = {
            "agentId": `${agentId}`,
            "codeId": "5"
        }
        console.log('agentId==', agentId)
        promiseAjax('/api/u/saasAgentInvitationCode/divideCode', query, { method: "PUT" })
            .then(res => {
                console.log(res, '== 更新')
            })
    }

    function cb(name, id, agentId) {
        // if (id && name) {
        SetAgentId(agentId)
        SetName(name)
        // }
    }
    return (
        <ChakraProvider>
            <TopBar>
                选择要下发给代理的渠道码
            </TopBar>
            <div className='Global' />
            <List items={items} cb={cb} />
            <Center position='fixed'
                bottom=' 16px'
                left='0'
                right=' 0'>
                <Box padding='0 20px' margin='30px 0 0 0 ' onClick={() => onFinish()} w='100%' >
                    <Button solid>完成</Button>
                </Box>
            </Center>

        </ChakraProvider>
    )


}


