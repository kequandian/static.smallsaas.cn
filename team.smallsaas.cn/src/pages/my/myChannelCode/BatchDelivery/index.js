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
import { history } from 'umi';


export default function index(props) {

    const queryData = useQuery(props)
    const appid = queryData.query.appid
    const agentId = queryData.query.agentId
    const [items, setItems] = useState([])

    const api = `/api/u/saasAgentInvitationCode?agentId=${agentId}`

    function valuesData() {
        const query = {
        }
        promiseAjax(api, query, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let items = resp.data.records
                setItems(items)
            }
        })
    }
    useEffect(_ => {
        valuesData(api)
    }, [])

    function onNextClick() {
        history.push('/my/myChannelCode/AuthorizedAgent')
    }

    return (
        <ChakraProvider>
            <TopBar>
                选择要下发给代理的渠道码
            </TopBar>
            <div className='Global' />
            <List items={items} />
            <Center position='fixed'
                bottom=' 16px'
                left='0'
                right=' 0'>
                <Box padding='0 20px' margin='30px 0 0 0' w='100%' onClick={() => onNextClick()} >
                    <Button solid>下一步</Button>
                </Box>
            </Center>
        </ChakraProvider>
    )


}


