import React, { useEffect, useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import TopBar from '@/components/presenter/TopBar'
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import Linktitle from 'zero-element-boot-plugin-theme/lib/components/text/Linktitle';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import SelectedCartUpperRightIcon from 'zero-element-boot/lib/components/indicator/SelectedCartUpperRightIcon';
import { Toast } from 'antd-mobile'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');


// --注册成功页面
export default function index(props) {

    //获取路由中的appid
    const appid = window.location.pathname.substring(1, window.location.pathname.length)
    console.log('appid = ', appid)

    //获取我的邀请码和个人信息
    const api = '/api/u/saasAgent/inviteCode'
    let apiData = '/api/u/saasAgent/myAgentInfo'
    const [data] = useTokenRequest({ api });
    // const [myAgentInfo] = useTokenRequest({ api: apiData });

    const [myAgentInfo, setAgentInfo] = useState()
    console.log('myAgentInfo ==', myAgentInfo)

    function valuesData() {
        const query = {
        }
        promiseAjax(apiData, query, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let myAgentInfo = resp.data
                setAgentInfo(myAgentInfo)
            }
        })
    }

    function flushed() {
        valuesData()
        //判断是否授权
        if (myAgentInfo.level) {
            // valuesData()
            // this.forceUpdate();
            if (appid) {
                // 判断是否有appid
                history.push('/Orders')
            } else {
                history.push('/SelectApply')
            }
        } else {
            Toast.show(
                '请等待你的邀请人授权!',
                2
            )
        }
    }

    useEffect(_ => {
    }, [])

    return (
        <ChakraProvider>
            <TopBar>
                注册成功
            </TopBar>

            <CssCart position='fixed' width='100%' height='100%' padding='40px 20px ' margin='0 0 10px 0'
                backgroundColor='#ffffff'
            // background='linear-gradient(141deg, rgba(98, 98, 125)1%,rgba(2, 4, 7)100%)'
            >
                <>
                    <Stack bg='#'>

                        <Center margin='0'>
                            <svg t="1660105833151" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="98899" width="68" height="68"><path d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z" p-id="98900" fill="#4392ce"></path></svg>
                        </Center>
                        <Center padding='0 62px 0 62px' >
                            <ItemTitleBold>
                                注册成功
                            </ItemTitleBold>
                        </Center>
                        <Center padding='0 80px'>
                            <Box onClick={() => flushed()}>
                                <Button outline color='#4392ce'>
                                    刷新
                                </Button>
                            </Box>
                        </Center>
                        <Center padding='62px 62px 0 0' >
                            <ItemTitleBold>
                                你的邀请码
                            </ItemTitleBold>
                        </Center>

                        <Center borderTop='0px #2e3f64 solid' width='' padding='0 62px 0 62px' bg='' >
                            <CssCart padding='14px ' backgroundColor='#d1e7f4' borderRadius='2px'>
                                {/* <QRCode value="/my/Set/CallsSet" /> */}
                                <QRCode value={`https://static.smallsaas.cn/agent/model-5g.html#/my/myInvitationCode/LoadPage?pass=${data}`} />
                            </CssCart>
                        </Center>

                        <Center >
                            <ContainerSubtitle>
                                {data}
                            </ContainerSubtitle>
                        </Center>
                        <Center padding='62px 62px 0 62px' >
                            <Linktitle>
                                请等待你的邀请人给你授权
                            </Linktitle>
                        </Center>
                    </Stack>

                </>
            </CssCart>
        </ChakraProvider>
    )


}
