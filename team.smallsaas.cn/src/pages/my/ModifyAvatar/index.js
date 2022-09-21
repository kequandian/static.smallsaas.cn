import React from 'react';
import ModifyAvatar from './config';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import SelectAddress from '@/components/SelectAddress'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack, Box, Spacer, Flex, Center } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';

export default function index(props) {

    // const queryData = useQuery(props)


    const api = '/api/u/saasAgent/myAgentInfo'

    const [data] = useTokenRequest({ api });

    const datas = [
        { "title": "头像", "icon": `${data.avatar}` },
        { "title": "昵称", "content": `${data.name || ''}`, "navigation": `/my/ModifyAvatar/editName?name=${data.name}&text=name` },
        // { "title": "手机号", "content":`${data.generalAgentAmount || ''}`, "navigation": `/my/ModifyAvatar/editName?name=${data.generalAgentAmount}&text=name` },
        // { "title": "密码", "content":`${data.password  || '----'}`, "navigation": `/my/ModifyAvatar/editName?name=${data.password}&text=name` },

    ]
    const datas1 = [
        { "title": "手机号", "content": `${data.phone || ''}`, "navigation": `/my/ModifyAvatar/editPhone?phone=${data.phone}&text=name` },
        { "title": "密码", "content": `${data.password || '· · · · · ·'}`, "navigation": `/my/ModifyAvatar/editPassword?password=${data.password || ''}&text=name` },
    ]

    function updateAvatar(query) {
        promiseAjax('/api/u/user/accounts/updateUserInfo', query, { method: "PUT" })
            .then(res => {
                console.log(res, '== 更新111')

            })
    }
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
                修改个人信息
            </TopBar>
            <ModifyAvatar items={datas} cb={cb} />
            <ModifyAvatar items={datas1} cb={cb} />
            <Flex>
                <Flex w='130px' h='40px' boxShadow='0 0px 8px rgba(0, 0, 0, 0.08) ' borderRadius='10px 0 0 10px' margin=' 0 0 0 10px' overflow='hidden' backgroundColor='#fff' padding='0 20PX'>
                    <Center>
                        <ItemTitleBold>
                            归属地
                        </ItemTitleBold>
                    </Center>
                </Flex>
                <SelectAddress />
            </Flex>




        </>
    )
} 