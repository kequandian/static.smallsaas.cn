import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Settings from 'zero-element-boot-presenter/lib/components/presenter/card/Settings';
import Containertitle from 'zero-element-boot-plugin-theme/lib/components/text/Containertitle';
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import TopBar from '@/components/presenter/TopBar'
import ModifyAvatarItem from '@/pages/my/ModifyAvatar/config'
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';


import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


// --设置的首页
export default function index(props) {

    // const api = '/api/GeneralAgentSetData'
    const api = '/api/u/saasAgent/pointSetting/all'

    const [data] = useTokenRequest({ api });

    return (
        <TopBar>
        {/* <CssCart backgroundColor='#f4f6f8'  height='100%'  width='100%'  position='fixed' padding='0 10px'> */}
            <>

                 <CssCart margin='6px 0 10px 40px' >
                 <ContainerSubtitle>账号管理</ContainerSubtitle>
               </CssCart>
                <Spacer />
                   
                     <ModifyAvatarItem items={[
                        { "title": "手机号",  "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "" },
                        { "title": "名字",  "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "" },
                        { "title": "密码",  "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "" },
                    ]} />
            </>
        {/* </CssCart> */}
        </TopBar>
    )


}
