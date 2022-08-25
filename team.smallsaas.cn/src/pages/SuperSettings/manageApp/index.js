import React, { useEffect, useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import RouterBox from 'zero-element-boot-presenter/lib/components/presenter/card/RouterBox';
import AppList from './appList'
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import TopBar from '@/components/presenter/TopBar'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


// --我的邀请码页面
export default function index(props) {


    const { level = '1', onIetmClick ,onCreateApp} = props

    // const queryData = useQuery(props)
    // const appid = queryData.query.appid
    // const agentId = queryData.query.agentId

    const [data, setData] = useState([])
    // console.log('data==', data.records)
    const items = data.records
    console.log('items==', items)

    useEffect(_ => {
        const query = {}
        promiseAjax('/api/u/apps?unionId=Agent', query, { method: "GET" })
            .then(res => {
                if (res && res.code === 200) {
                    setData(res.data)
                }
            })
    }, [])

    return (
        <ChakraProvider>
            <TopBar>
            创建应用
            </TopBar>
            {
                (items && items.length > 0) ?
                    (
                        <PageModuleContainer>
                            < AppList columns={data.length} items={items} onIetmClick={onIetmClick}  onCreateApp={onCreateApp}/>
                        </PageModuleContainer>
                    ) : <></>
            }
        </ChakraProvider>
    )
}
