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


// --我的邀请码页面
export default function index(props) {

    const queryData = useQuery(props)
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




    return (
        <ChakraProvider>
            <div className='Global' />

            <TopBar>
                订单详情
            </TopBar>
            <PageModuleContainer>
                <Stack>

                    <Flex>
                        <Center w='30%'>
                            <ContainerInactiveTitle fontSize='14px'>
                                套餐：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%'>
                            <ItemTitleBold>
                                {data.productName || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    {/* <Spacer  borderButtom='1px soild #f5f5f5'/> */}
                    <Spacer borderBottom='1px dashed #d6d3d3' />

                    <Flex>
                        <Center w='30%'>
                            <ContainerInactiveTitle fontSize='14px'>
                                产品编号：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%'>
                            <ItemTitleBold>
                                {data.goodsId || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    <Spacer borderBottom='1px dashed #d6d3d3' />

                    <Flex >
                        <Center w='30%'>
                            <ContainerInactiveTitle fontSize='14px'>
                                成交价格：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%'>
                            <ItemTitleBold>
                                {data.dealPrice || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    <Spacer borderBottom='1px dashed #d6d3d3' />

                    <Flex>
                        <Center w='30%'>
                            <ContainerInactiveTitle fontSize='14px'>
                                下单时间：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%'>
                            <ItemTitleBold>
                                {data.orderTime || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    <Spacer borderBottom='1px dashed #d6d3d3' />

                    <Flex >
                        <Center w='30%'>
                            <ContainerInactiveTitle fontSize='14px'>
                                邀请人：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%'>
                            <ItemTitleBold>
                                {data.reference || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>
                    <Spacer borderBottom='1px dashed #d6d3d3' />

                    <Flex>
                        <Center w='30%'>
                            <ContainerInactiveTitle fontSize='14px'>
                                订单描述：
                            </ContainerInactiveTitle>
                        </Center>

                        <Center w='60%'>
                            <ItemTitleBold>
                                {data.statusDescribe || ''}
                            </ItemTitleBold>
                        </Center>
                    </Flex>

                </Stack>
            </PageModuleContainer>
        </ChakraProvider>
    )


}
