import React, { useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';

import TopBar from '@/components/presenter/TopBar'


// --我的邀请码页面
export default function index(props) {


    const { pass } = props


    const api = '/api/u/saasAgent/myAgentInfo'

    const [data] = useTokenRequest({ api });

    // console.log(data, '=== data');

    return (
        // data && data.length > 0 ? (
            <ChakraProvider>
                <TopBar>
                    我的下单邀请
                </TopBar>

                <CssCart position='fixed' width='100%' height='100%' padding='40px 20px ' margin='0 0 10px 0'
                    //  backgroundColor='#020407'
                    background='linear-gradient(141deg, rgba(98, 98, 125)1%,rgba(2, 4, 7)100%)'
                >
                    <>
                        <Stack bg='#1a2748'>
                            <Center border='1px #3156bd solid' padding='4px 10px' margin='20px 40px ' borderRadius='2px'>
                                <DarkBackgroundTitle>
                                    扫我下单
                                </DarkBackgroundTitle>
                            </Center>

                            <Center borderTop='2px #2e3f64 solid' width='' padding='60px 62px' bg='' >
                                <CssCart padding='8px ' backgroundColor='#ffffff' borderRadius='2px'>
                                    {/* <QRCode value="/my/Set/CallsSet" /> */}
                                    <QRCode value={`https://static.smallsaas.cn/agent/model-5g.html#/CallingCard?channel=${data.phone}`} />
                                </CssCart>
                            </Center>
                        </Stack>
                      
                    </>
                </CssCart>
            </ChakraProvider>

        // ) : <></>
    
    )


}
