import React, { useState, useEffect } from 'react';
import HistoricalOrdersIndex from './index';
import { Flex, Box } from '@chakra-ui/react'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';


export default function (props) {

    // let endpoint='http://app1.console.smallsaas.cn:8001/openapi'


    // const api = '/api/pub/product/products?category=Food'
    const { TotalAmount = '124', time = '2022-06-29', productCount = '4', OrderNumber = 'AXPFDS4532466540009' } = props


    return (
        <CssCart width='100%' padding='20px 10px' backgroundColor='#f5f5f5'>
            <PageModuleContainer>
                <>
                    <CssCart borderBottom= '1px #f5f5f5 solid'padding= '0 0 12px 0' margin='18px'>
                        <ItemTitle fontSize='14px' width='56%'  >
                           供应商名称
                        </ItemTitle>
                    </CssCart>
                    <HistoricalOrdersIndex />
                    <Flex>
                        <PrimarySubtitle color='#000000' fontSize='12px' margin='6px 0 14px 24px'><>共{productCount}件，合计</></PrimarySubtitle>
                        <PrimaryTitle fontSize='12px' margin='6px 0 14px 4px'>
                            ￥
                        </PrimaryTitle>
                        <PrimaryTitle fontSize='20px' margin='0 0 14px 0px'>
                            {TotalAmount}
                        </PrimaryTitle>

                    </Flex>
                </>
            </PageModuleContainer>
        </CssCart>
    )
}