import React, { useEffect } from 'react';
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


// --我的邀请码页面
export default function index(props) {


    const { level = '1' } = props

    const apiInfo = '/api/u/saasAgent/myAgentInfo'
    const [dataInfo] = useTokenRequest({ api: apiInfo });
    // console.log('dataInfo ==', dataInfo)
    // ${dataInfo.agentId
    const api = `/api/u/agentApp/list/1`
    // const api = (dataInfo && dataInfo.length > 0) ? `/api/u/agentApp/list/1` : ''
    // const api = '/api/u/saasAgent/invite?inviteCode=(G-15475197476990115851234)'
    const [data] = useTokenRequest({ api });
    // console.log('data==', data)
    // console.log('data.length==', data.length)

    // function PassData() {
    //     pass(data)
    // }

    // useEffect(_ => {
    //     PassData()
    // }, [])

    return (
        <ChakraProvider>
            <TopBar>
                你的APP
            </TopBar>
            {
                (data && data.length > 0) ?
                    (
                        <PageModuleContainer>
                            <ItemTitleBold>
                                创建应用
                            </ItemTitleBold>
                            < AppList columns={data.length} items={data} />
                        </PageModuleContainer>
                    ) : <></>
            }
        </ChakraProvider>
    )
}
