import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import MyInvite from './config';
import Avatar from '@/components/presenter/Avatar'
import ContainerSubtitle from '@/components/text/ContainerSubtitle';

import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';


export default function index(props) {

    const api = `/api/u/saasAgent/myInvitationList`
    const [ items, setItems ] = useState([])

    //获取列表数据
    useEffect(_=>{
        getList(api)
    },[])

    // const [data] = useTokenRequest({ api });
    // console.log(data, '==data11111111111');


    // const items = data.records
    // console.log(items, '=======================items');

    // const { avatar, name, preStoragePoint } = items


    function getList() {
        promiseAjax(api)
            .then(res => {
                console.log(res, '== 列表')
                if (res && res.code === 200) {
                    let items = res.data.records;
                    setItems(items)
                }
            })
    }
       

    function updateLevel(id, query) {
        promiseAjax(`/api/u/saasAgent/level/${id}`, query, {method:"PUT"})
            .then(res => {
                console.log(res, '== 更新')
                if (res && res.code === 200) {
                    getList()
                }
            })
    }

    function cb(id, level){
        console.log('id = ', id)
        console.log('level = ', level)
        if(id && level){
            updateLevel(id, {level})
        }
    }

    return (
        <>
            <PageModuleContainer>
                <>
                    <ContainerSubtitle>
                        代理授权（我的新邀请）
                    </ContainerSubtitle>
                    {items && Array.isArray(items) && items.length > 0 ? (
                        <CssCart backgroundColor='' margin='8px 0 0 0'>
                            <MyInvite items={items} cb={cb} />
                        </CssCart>
                    ) : <></>}
                </>
            </PageModuleContainer>
        </>
    )


}
