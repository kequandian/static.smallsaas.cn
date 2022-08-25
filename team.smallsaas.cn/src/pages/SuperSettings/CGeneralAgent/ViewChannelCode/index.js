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
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import Pages from './BatchGeneration/Pages'
export default function index(props) {

    const { agentId, appid, onNextClick } = props
    const [items, setItems] = useState([])
    const [numberData, setNumberData] = useState('')

    let api = `/api/u/saasAgentInvitationCode?agentId=${agentId}&pageNum=1`


    function valuesData(api) {
        const query = {
        }
        promiseAjax(api, query, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let items = resp.data.records
                let numberDatas = resp.data
                setItems(items)
                setNumberData(numberDatas)
            }
        })
    }

    useEffect(_ => {
        valuesData(api)
    }, [])


    function cb(number) {
        api = `/api/u/saasAgentInvitationCode?agentId=${agentId}&pageNum=${number}`
        valuesData(api)
    }
    return (
        <ChakraProvider>
            <TopBar>
                渠道码
            </TopBar>
            <div className='Global' />
            <ChannelCodelist items={items} />
            <Flex display='flex' justifyContent='ent' >
                <Center>
                    <Pages cb={cb} maxNumber={numberData.pages} />
                </Center>
                <Center color='#909090'>
                    共{numberData.pages}页
                </Center>
            </Flex>
            <Center position='fixed'
                bottom='16px'
                left='0'
                right=' 0'>
                <Box padding='0 10px' margin='0 ' w='100%' onClick={() => onNextClick()} >
                    <Button solid color='#0f83f0'>批量增加渠道码</Button>
                </Box>
            </Center>
        </ChakraProvider>
    )


}
