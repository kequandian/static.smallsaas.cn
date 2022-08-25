import React, { useEffect, useState } from 'react';
import ModifyAvatar from './config';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';

export default function index(props) {

    const queryData = useQuery(props)
    const Agent = queryData.query.Agent
    const id = 0

    const api = `/api/u/apps?unionId=${Agent}`

    const [data] = useTokenRequest({ api });
    const [detailData, setDetailData] = useState([])

    useEffect(_ => {
        const query = {}
        promiseAjax('/api/u/apps?unionId=Agent', query, { method: "GET" })
            .then(res => {
                if (res && res.code === 200) {
                    setDetailData(res.data.records)
                }
            })
    }, [])
    // console.log('detailData ==', detailData)
    const detailDataItem = detailData[`${id}`]
    console.log('detailDataItem ==', detailDataItem)


    const datas = detailDataItem ? [
        { "title": "应用图标", "icon": `${detailDataItem.icon}` },
        { "title": "应用名称", "content": `${detailDataItem.name || ''}`, "navigation": `/my/ModifyAvatar/editName?name=${data.name}&text=name` },
        { "title": "应用服务", "content": `${detailDataItem.businessUrl || ''}`, "navigation": `/my/ModifyAvatar/editName?name=${data.name}&text=name` },
        { "title": "应用ID", "content": `${detailDataItem.appid || ''}`, "navigation": `/my/ModifyAvatar/editName?name=${data.name}&text=name` },
    ] : ''

    const datas1 = detailDataItem ? [
        { "title": "应用服务", "content": `${detailDataItem.businessUrl || ''}`, "navigation": `/my/ModifyAvatar/editName?name=${data.name}&text=name` },

    ] : ''
   


    function cb(url) {
        if (url) {
            updateAvatar({ avatar: url })
            console.log('url==', url);
        }
    }


    // function updateLevel(id, query) {
    //     promiseAjax('/api/u/saasAgent/pointSetting/all', query, { method: "PUT" })
    //         .then(res => {
    //             console.log(res, '== 更新')
    //             if (res && res.code === 200) {
    //                 getList()
    //             }
    //         })
    // }

    return (
        <>
            <div className='Global' />
            <TopBar>
                修改应用信息
            </TopBar>
            <ModifyAvatar items={datas} cb={cb} />
            <ModifyAvatar items={datas1} cb={cb} />
        </>
    )
}