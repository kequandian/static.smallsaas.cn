import React from 'react';
import ModifyAvatar from './config';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';

export default function index(props) {

    // const queryData = useQuery(props)


    const api = '/api/u/saasAgent/myAgentInfo'

    const [data] = useTokenRequest({ api });

    const datas = [
        { "title": "头像", "icon": `${data.avatar }` },
        { "title": "昵称", "content": `${data.name || ''}`,"navigation": `/my/ModifyAvatar/editName?name=${data.name}&text=name` },
        // { "title": "手机号", "content":`${data.generalAgentAmount || ''}`, "navigation": `/my/ModifyAvatar/editName?name=${data.generalAgentAmount}&text=name` },
        // { "title": "密码", "content":`${data.password  || '----'}`, "navigation": `/my/ModifyAvatar/editName?name=${data.password}&text=name` },
   
    ]
    const datas1=[
        { "title": "手机号", "content":`${data.phone || ''}`, "navigation": `/my/ModifyAvatar/editPhone?phone=${data.phone}&text=name` },
        { "title": "密码", "content":`${data.password  || '----'}`, "navigation": `/my/ModifyAvatar/editPassword?password=${data.password || '------'}&text=name` },
    ]

    function updateAvatar(query) {
        promiseAjax('/api/u/user/accounts/updateUserInfo', query, { method: "PUT" })
            .then(res => {
                console.log(res, '== 更新111')
                
            })
    }
    function cb(url) {
        if (url) {
            updateAvatar({avatar:url })
            console.log('url==',url);
        }
    }

    return (
        <>
            <div className='Global' />
            <TopBar>
                修改个人信息
            </TopBar>
            <ModifyAvatar items={datas} cb={cb} />
            <ModifyAvatar items={datas1} cb={cb} />
        </>
    )
}