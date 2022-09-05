import React, { useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';

import TopBar from '@/components/presenter/TopBar'


// --我的邀请码页面
export default function index(props) {


    const { pass } = props
    // console.log('props===', props)
    const api = '/api/u/saasAgent/myAgentInfo'

    const [data] = useTokenRequest({ api });

    console.log(data, '=== data');
    // const channel = (data && data.length > 0) ? (data.name + '' + data.phone) : ''
    // console.log('channel==', channel)
    return (
        // data && data.length > 0 ? (
        <ChakraProvider>
            <TopBar>
                我的下单邀请
            </TopBar>

            <CssCart position='fixed' width='100%' height='100%' padding='40px 20px ' margin='0 0 10px 0'
                backgroundColor=''
            // background='linear-gradient(141deg, rgba(98, 98, 125)1%,rgba(2, 4, 7)100%)'
            >
                <>
                    <Stack bg='#' padding='40px'>
                        <Center border='0px #3156bd solid' padding='4px 10px' margin='20px 40px ' borderRadius='2px'>
                            <ItemTitleBold>
                               {''}
                            </ItemTitleBold>
                        </Center>
                        <Center>
                            <CssCart  boxShadow='0 0px 12px rgba(0, 0, 0, 0.1)' padding='12px ' backgroundColor='#ffffff' borderRadius='2px'>
                                {/* <QRCode value={`https://5g.smallsaas.cn/${data.coChannel}?phone=${data.phone}&coUserid=${data.coUserId}`} /> */}
                                <QRCode value={`https://5g.smallsaas.cn/${data.vendorCode}?phone=${data.phone}&coUserid=${data.coUserId}`} />
                            </CssCart>
                        </Center>
                    </Stack>
                </>
            </CssCart>
        </ChakraProvider>

        // ) : <></>

    )


}
