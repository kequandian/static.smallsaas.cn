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

    //接收路由传过来的
    const queryData = useQuery(props)
    const id = queryData.query.id
    const MyownAgentId = queryData.query.MyownAgentId
    const [SelectList, setSelectList] = useState([])


    const api = `/api/u/saasAgent/myInvitationList`
    const [items, setItems] = useState([])

    //获取代理列表数据
    useEffect(_ => {
        getList(api)
        if (queryData && queryData.query && queryData.query.SelectList) {
            setSelectList(queryData.query.SelectList.split(','))
            // setSelectItemList(SelectList)
        }
    }, [])

    function getList() {
        promiseAjax(api)
            .then(res => {
                if (res && res.code === 200) {
                    let items = res.data.records;
                    setItems(items)
                }
            })
    }

    useEffect(_ => {
        getList(api)
    }, [])

    //选中的代理id
    const [selectedAgentId, setSelectedAgentId] = useState('')

    //点击完成判断传过来的是SelectList还是id，分别访问不同的api
    function onFinish() {
        if (queryData && queryData.query && queryData.query.SelectList) {
            if (selectedAgentId) {
                const IssuedQuery = {
                    "agentId": `${selectedAgentId}`,
                    "ids": `${SelectList}`.split(',')
                }
                // console.log('agentId==', agentId)
                promiseAjax('/api/u/saasAgentInvitationCode/batchDivideCode', IssuedQuery, { method: "PUT" })
                    .then(res => {
                        console.log(res, '== 更新')
                        alert('下发成功！')
                        history.push(`/my/myChannelCode?agentId=${MyownAgentId}`)
                    })
            } else {
                alert('请选择代理！')
            }

        } else {
            if (selectedAgentId) {
                const authorizationQuery = {
                    "agentId": `${selectedAgentId}`,
                    "codeId": `${id}`
                }
                // console.log('agentId==', agentId)
                promiseAjax('/api/u/saasAgentInvitationCode/divideCode', authorizationQuery, { method: "PUT" })
                    .then(res => {
                        console.log(res, '== 更新')
                        alert('授权成功！')
                        history.push(`/my/myChannelCode?agentId=${MyownAgentId}`)
                    })
            }
            else {
                alert('请选择代理！')
            }
        }

    }


    function cb(agentId) {
        setSelectedAgentId(agentId)
    }
    return (
        <ChakraProvider>
            <TopBar>
                选择要授权或下发的代理
            </TopBar>
            <div className='Global' />
            {queryData && queryData.query && queryData.query.SelectList ?
                (
                    <List items={items} cb={cb} selectedAgentId={selectedAgentId}  SelectList/>
                ) : (
                    <List items={items} cb={cb} selectedAgentId={selectedAgentId} />
                )
            }
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


