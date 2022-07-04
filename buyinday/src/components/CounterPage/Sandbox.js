import React, { useState, useEffect } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import CounterPage from './index';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box } from '@chakra-ui/react'
import VStack from 'zero-element-boot/lib/components/layout/VStack'
import Avatar from '@/components/presenter/Avatar'
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import HistoryIcon from '@/components/presenter/HistoryIcon';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');


export default function (props) {

    // let endpoint='http://app1.console.smallsaas.cn:8001'

    const { onRemark, amountPaid = '242', purchased = '4' } = props

    const api = '/api/pub/product/products?category=Food'
    // const api = '/api/productsData'
   

    const [productList, setProductList] = useState([])
    const [productCount, setProductCount] = useState([])
    const [productTotal, setProductTotal] = useState([])

    useEffect(_ => {

        promiseAjax(api)
            .then(res => {
                if (res && res.code === 200) {
                    let respData = res.data;
                    if (respData && respData.records && respData.records.length > 0) {

                        // console.log(respData,'== respData')
                        setProductList(respData.records)
                        handleCount(respData.records)
                    }
                } else {
                    console.log('获取商品信息失败 == ', res)
                }
            })

    }, [])


    //计算商品总数和总额 (for forEach)
    function handleCount(productList) {
        //数量
        let count = 0;
        //总额
        let total = 0;
        productList.map((item, index) => {
            //console.log(item,'== item')
            // console.log(index,'== index')
            if (item.quantity >= 0) {
                count = count + item.quantity
                total = total + (item.price * item.quantity)
            } else {
                count = count + 1
                total = total + item.price
            }
        })
        setProductCount(count)
        setProductTotal(total)
    }

    //点击的商品item，回调商品ID和商品数量
    function callback(productId, number) {
        // console.log('product productId = ', productId)
        // console.log('product number = ', number)

        productList.map((item, index) => {
            if (productId == item.id) {
                item.quantity = number
                item.checked = true
            }
            return item
        })
        console.log('productList = ', productList)

        handleCount(productList)
    }


    return (
        <ChakraProvider>
            <VStack>
                <Cart fill='#ffffff' linewidth='0' corner='12px' margin='10px' padding='10px 8px 10px 8px'>
                    <VStack>
                        <Flex w='100%'>
                            <Avatar size='30'  url = ''  />
                            <Flex w='100%'>
                                <PrimaryTitle  fontSize='14px'>
                                    肖生
                                </PrimaryTitle>

                                <PrimarySubtitle fontSize='14px' >
                                黄荆小区
                                </PrimarySubtitle>
                            </Flex>

                            <HistoryIcon />

                        </Flex>
                        <Flex w='100%' margin='10px'>
                            <Box borderTop='1px #f0f0f1 solid ' w='33.3%' h='50px' padding='4px'
                            >

                                <PrimarySubtitle margin='0' color='#b03931' fontSize='22px'>
                                    {purchased}
                                </PrimarySubtitle>

                                <ContainerInactiveTitle fontSize='14px'>
                                    已团
                                </ContainerInactiveTitle>
                            </Box>
                            <Box borderTop='1px #f0f0f1 solid' w='33.3%' h='50px' padding='4px'
                            >

                                <PrimarySubtitle margin='0' color='#b03931' fontSize='22px'>
                                    <Flex> ￥{amountPaid}</Flex>
                                </PrimarySubtitle>


                                <ContainerInactiveTitle  fontSize='14px'>
                                    今日应付
                                </ContainerInactiveTitle>
                            </Box>
                            <Box borderTop='1px #f0f0f1 solid' w='33.3%' h='50px' padding='4px'>
                                <PrimarySubtitle margin='0' color='#b03931' fontSize='22px'>
                                    <Flex> ￥--</Flex>
                                </PrimarySubtitle>

                                <ContainerInactiveTitle fontSize='14px'>
                                    已付
                                </ContainerInactiveTitle>
                            </Box>
                        </Flex>

                    </VStack>
                </Cart>

                <CssCart backgroundColor='#ffffff' width='100%' padding='0 10px 10px 10px ' borderRadius='12px' margin='0 10px 10px 10px'>
                    <Box h='' bg='' >
                        <CounterPage productList={productList} callBackData={callback} />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            borderTop: '1px solid #f5f5f5',
                            margin: '10px auto -26px auto',
                            padding: '6px '
                        }}>
                            <Flex >
                                <PrimarySubtitle fontSize='12px' color='#7d7d7d' margin='8px 0 14px 4px'>
                                    共{productCount} 件
                                </PrimarySubtitle>
                                <PrimaryTitle fontSize='12px' margin='8px 0 14px 4px'>
                                    合计：
                                </PrimaryTitle>

                                <PrimaryTitle fontSize='20px' margin='0 8px 12px 4px' color='#ff0000'>
                                    <Flex>  ￥{productTotal}</Flex>
                                </PrimaryTitle>
                            </Flex>
                        </div>
                    </Box>

                </CssCart>

                <Cart fill='#ffffff' linewidth='0' corner='12px' margin='2px 10px' padding='2px'>
                    <Flex>
                        <PrimaryTitle fontSize='14px' margin='16px 4px -3px 14px' fontWeight='bold'>
                            订单备注
                       </PrimaryTitle>

                        <div onClick={onRemark} style={{
                            display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '16px 2px -3px 4px',
                            fontSize: '14px', height: '100%', color: '#cdcdcd', width: '75%'
                        }}>选填，输入备注内容 ></div>
                     

                    </Flex>
                </Cart>
             

                <div style={{ width: '100%', margin: '2px 4px 10px 6px', backgroundColor: 'transparent' }}>
                    <Button solid color='#c86963'>
                        发给Ta
                    </Button>
                </div>
            </VStack>
        </ChakraProvider>
    )
}