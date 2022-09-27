import React, { useEffect, useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import Containertitle from 'zero-element-boot-plugin-theme/lib/components/text/Containertitle';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import TopBar from '@/components/presenter/TopBar'
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import { Modal, Toast } from 'antd-mobile'


// --我的邀请码页面
export default function index(props) {

    const queryData = useQuery(props)
    const appid = queryData.query.appid
    const Permissions = queryData.query.Permissions
    const id = queryData.query.id
    const [data, setData] = useState('')
    console.log('data ==', data)
    useEffect(_ => {
        getData()
    }, [])

    function getData() {
        const query = {
        }

        promiseAjax(`/api/u/saasAgent/orderDetail/${id}`, query, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let data = resp.data
                setData(data)
            }
        })
    }

    const ordersStatus = data.type === "TEST" ? '测试订单' : data.type === "NORMAL" ? '正式订单' : ''

   

    return (
        <ChakraProvider>
            <div className='Global' />

            <TopBar>
                订单详情
            </TopBar>
            <PageModuleContainer>
                <Stack >
                    <Flex>
                        <Center w='30%' justifyContent='end'>
                            <ContainerInactiveTitle fontSize='14px'>
                                套餐：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%' justifyContent='start'>
                            <ItemTitleBold>
                                {data.productName || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    {/* <Spacer  borderButtom='1px soild #f5f5f5'/> */}
                    {/* <Spacer borderBottom='1px dashed #d6d3d3' /> */}

                    <Flex> 
                        <Center w='30%' justifyContent='end'>
                            <ContainerInactiveTitle fontSize='14px'>
                                产品编号：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%' justifyContent='start'>
                            <ItemTitleBold>
                                {data.goodsId || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    {/* <Spacer borderBottom='1px dashed #d6d3d3' /> */}

                    <Flex >
                        <Center w='30%'  justifyContent='end'>
                            <ContainerInactiveTitle fontSize='14px'>
                                产品月费：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%' justifyContent='start'>
                            <ItemTitleBold>
                                {data.monthlyFee || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    {/* <Spacer borderBottom='1px dashed #d6d3d3' /> */}

                    <Flex>
                        <Center w='30%' justifyContent='end'>
                            <ContainerInactiveTitle fontSize='14px'>
                                下单时间：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%' justifyContent='start'>
                            <ItemTitleBold>
                                {data.orderTime || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    {/* <Spacer borderBottom='1px dashed #d6d3d3' /> */}
                    <Flex>
                        <Center w='30%' justifyContent='end'>
                            <ContainerInactiveTitle fontSize='14px'>
                                邀请人：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%' justifyContent='start'>
                            <ItemTitleBold>
                                {data.agentName ||''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>

                    <Flex >
                        <Center w='30%' justifyContent='end'>
                            <ContainerInactiveTitle fontSize='14px'>
                                邀请人电话：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%' justifyContent='start'>
                            <ItemTitleBold>
                                {data.reference || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    {/* <Spacer borderBottom='1px dashed #d6d3d3' /> */}

                    <Flex>
                        <Center w='30%' justifyContent='end'>
                            <ContainerInactiveTitle fontSize='14px'>
                                订单属性：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%' justifyContent='start'>
                            <ItemTitleBold>
                                {ordersStatus}
                            </ItemTitleBold>
                        </Center>
                    </Flex>

                </Stack>
            </PageModuleContainer>
          
        </ChakraProvider>
    )
}
