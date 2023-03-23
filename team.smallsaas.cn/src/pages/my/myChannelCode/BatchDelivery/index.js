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
import Pages from '@/pages/SuperSettings/CGeneralAgent/ViewChannelCode/BatchGeneration/pages'


export default function index(props) {
    const { id='' }=props
    const queryData = useQuery(props)
    const agentId = queryData.query.agentId
    const [items, setItems] = useState([])
    const [datas, setDatas] = useState('')
    const [SelectList, setSelectList] = useState([])
    // const [id, SetId] = useState('')
    const [nextStatus, SetNextStatus] = useState(false)

    // let api = `/api/u/saasAgentInvitationCode?agentId=${agentId}`
    let api = `/api/u/saasAgentInvitationCode?agentId=${agentId}&use=false`
    
    function valuesData() {
        const query = {
        }
        promiseAjax(api, query, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let items = resp.data.records
                let data = resp.data
                setItems(items)
                setDatas(data)
                // console.log('data= ', data)
            }
        })
    }
    useEffect(_ => {
        valuesData(api)
        SetNextStatus(false)
    }, [])

    function onNextClick() {
        if (SelectList.length > 0) {
            history.push(`/my/myChannelCode/AuthorizedAgent?id=${id}&MyownAgentId=${agentId}&SelectList=${SelectList}`)
        } else {
            alert('请先选择渠道码')
        }
    }

    function cb(id, status) {
        // console.log('id==', id)
        let newList = SelectList
        if (status) {
            newList.push(id)
        } else {
            newList = SelectList.filter(item => { return item != id })
        }
        SetNextStatus(false)
        setSelectList(newList)
    }

    function pages(number) {
        api = `/api/u/saasAgentInvitationCode?agentId=${agentId}&pageNum=${number}`
        valuesData(api)

    }

    return (
        <ChakraProvider>
            <TopBar>
                选择要下发给代理的渠道码
            </TopBar>
            <div className='Global' />

            <List items={items} cb={cb} nextStatus={nextStatus} />

            <Flex display='flex' justifyContent='ent' >
                <Center>
                    <Pages cb={pages} />
                </Center>
                <Center color='#909090'>
                    共{datas.pages}页
                </Center>
            </Flex>
            <Center position='fixed'
                bottom=' 16px'
                left='0'
                right=' 0'>
                <Box padding='0 20px' margin='30px 0 0 0' w='100%' onClick={() => onNextClick(id)} >
                    <Button solid>下一步</Button>
                </Box>
            </Center>
        </ChakraProvider>
    )


}


