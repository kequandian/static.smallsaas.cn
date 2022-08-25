import React, { useEffect, useState } from 'react';
import ModifyAvatar from './config';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack, Box, Center, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';
import Button from 'zero-element-boot/lib/components/presenter/button/Button';

export default function index(props) {
    // console.log('props ==', props)

    const [icon, SetIcon] = useState('')
    const [name, SetName] = useState('')
    const [appid, SetAppid] = useState('')
    const [businessUrl, SetBusinessUrl] = useState('')

    const queryData = useQuery(props)
    console.log('queryData ==', queryData)

    if (icon) {
        const name = queryData.query.name
        SetName(name)
    } else {
        const { icon, name, appid, businessUrl } = props
    }


    function onConfirm() {
        const query = {
            "name": `${name}`,
            "appid": `${appid}`,
            "unionId": "Agent",
            "businessUrl": `${businessUrl}`
        }
        promiseAjax('/api/u/apps', query, { method: "POST" })
            .then(res => {
                if (res && res.code === 200) {
                    // setDetailData(res.data.records)
                    console.log('11111111111 ==')

                }
            })
    }

    const datas = [
        { "title": "应用图标", "icon": `${icon}` || '' },
        { "title": "应用名称", "content": `${name || ''}`, "navigation": `/SuperSettings/manageApp/createApp/editName?&text=name` },
        { "title": "应用服务", "content": `${businessUrl || ''}`, "navigation": `/my/ModifyAvatar/editName?text=name` },
        { "title": "应用ID", "content": `${appid || ''}`, "navigation": `/my/ModifyAvatar/editName?name=}&text=name` },
    ]

    const datas1 = [
        { "title": "应用服务", "content": `${businessUrl || ''}`, "navigation": `/my/ModifyAvatar/editName?name=}&text=name` },

    ]



    function cb(url) {
        if (url) {
            updateAvatar({ avatar: url })
            console.log('url==', url);
        }
    }



    return (
        <>
            <div className='Global' />
            <TopBar>
                新建应用
            </TopBar>
            <ModifyAvatar items={datas} cb={cb} />
            <ModifyAvatar items={datas1} cb={cb} />
            <Center position='fixed'
                bottom=' 16px'
                left='0'
                right=' 0'>
                <Box padding='0 20px' margin='30px 0 0 0' w='100%' onClick={() => onConfirm(id)} >
                    <Button solid>确认</Button>
                </Box>
            </Center>
        </>
    )
}