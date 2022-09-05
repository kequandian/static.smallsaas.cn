import React, { useEffect, useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import Containertitle from 'zero-element-boot-plugin-theme/lib/components/text/Containertitle';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import Router from 'zero-element-boot-presenter/lib/components/presenter/card/Router';
import ChannelCodelist from './ChannelCodelist'
import TagIndicator from 'zero-element-boot/lib/components/indicator/TagIndicator'
import Pages from '@/pages/SuperSettings/CGeneralAgent/ViewChannelCode/BatchGeneration/Pages'


export default function index(props) {


    const queryData = useQuery(props)
    const appid = queryData.query.appid
    const agentId = queryData.query.agentId
    // const { pass,appid } = props
    const [items, setItems] = useState([])
    const [data, setData] = useState('')
    const [number, setNumber] = useState([])
    // console.log('data==', data)



    const api = '/api/u/saasAgentInvitationCode/batchGenCode'

    let apiList = `/api/u/saasAgentInvitationCode?agentId=${agentId}&pageNum=1`
    

    function getNumber() {
        const values = { "agentId": 2, "genCount": "3" }
        promiseAjax(api, values, { method: 'POST' }).then(resp => {
            if (resp && resp.code === 200) {
                let number = resp.data
                setNumber(number)
            }
        })
    }

    function valuesData() {
        const query = {
        }
        promiseAjax(apiList, query, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let items = resp.data.records
                let data = resp.data
                setItems(items)
                setData(data)
            }
        })
    }

    useEffect(_ => {
        valuesData(apiList)
        getNumber(appid)
    }, [])

    //路由到批量修改，把agentId传入
    function BatchDelivery() {
        history.push(`/my/myChannelCode/BatchDelivery?agentId=${agentId}`)
    }

    //点击切换页面的图标，从组件回调number
    function cb(number) {
        apiList = `/api/u/saasAgentInvitationCode?agentId=${agentId}&pageNum=${number}`
        valuesData(apiList)
    }

    return (
        <ChakraProvider>
            <TopBar>
                渠道码
            </TopBar>
            <div className='Global' />
            <Box w='220px' margin='10px' h='40px' onClick={() => BatchDelivery()}>
                <TagIndicator outline plain>
                    <Flex>
                        <svg t="1660727827989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="100106" width="20" height="20"><path d="M521.644581 99.902439c84.917073 0 149.853659 64.936585 149.853659 149.853659s-64.936585 149.853659-149.853659 149.853658-149.853659-64.936585-149.853658-149.853658 69.931707-149.853659 149.853658-149.853659m0-99.902439c-139.863415 0-249.756098 109.892683-249.756097 249.756098s109.892683 249.756098 249.756097 249.756097 249.756098-109.892683 249.756098-249.756097-109.892683-249.756098-249.756098-249.756098zM406.756777 1024H147.010435c-74.926829 0-134.868293-59.941463-134.868293-139.863415V799.219512c0-124.878049 99.902439-224.780488 224.780488-224.780488H711.459216c29.970732 0 49.95122 19.980488 49.951219 49.95122s-19.980488 49.95122-49.951219 49.951219H236.92263C166.990923 674.341463 112.044581 734.282927 112.044581 799.219512v89.912195c0 19.980488 14.985366 39.960976 34.965854 39.960976h259.746342c29.970732 0 49.95122 19.980488 49.951219 49.951219s-19.980488 44.956098-49.951219 44.956098z" p-id="100107" fill="#8e72ff"></path><path d="M996.181167 729.287805c-19.980488-19.980488-49.95122-19.980488-69.931707 0l-174.829269 174.829268-109.892683-104.897561c-19.980488-19.980488-49.95122-19.980488-69.931707 0-19.980488 19.980488-19.980488 49.95122 0 69.931708l139.863415 139.863414s4.995122 4.995122 9.990244 4.995122 4.995122 4.995122 9.990243 4.995122h39.960976c4.995122 0 4.995122-4.995122 9.990244-4.995122s4.995122-4.995122 9.990244-4.995122l209.795122-209.795122c14.985366-19.980488 14.985366-49.95122-4.995122-69.931707z" p-id="100108" fill="#8e72ff"></path></svg>
                    </Flex>
                    批量下发渠道码
                </TagIndicator>
            </Box>
            <ChannelCodelist items={items} number={number} MyownAgentId={agentId} />
            <Flex display='flex' justifyContent='ent' >
                <Center>
                    <Pages cb={cb} maxNumber={data.pages} />
                </Center>
                <Center color='#909090'>
                    共{data.pages}页
                </Center>
            </Flex>
        </ChakraProvider>
    )


}
