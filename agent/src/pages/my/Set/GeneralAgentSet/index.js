import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Settings from 'zero-element-boot-presenter/lib/components/presenter/card/Settings';
import Containertitle from 'zero-element-boot-plugin-theme/lib/components/text/Containertitle';
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import TopBar from '@/components/presenter/TopBar'


import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


// --设置的首页
export default function index(props) {

    // const api = '/api/GeneralAgentSetData'
    const api = '/api/u/saasAgent/pointSetting/all'

    const [data] = useTokenRequest({ api });

    return (
        <TopBar>
        <CssCart backgroundColor='#f4f6f8'  height='100%'  width='100%'  position='fixed' padding='0 10px'>
            <>

                 <CssCart margin='2px 0 10px 40px' >
                 <Containertitle>设置</Containertitle>
               </CssCart>
                <Spacer />

                    <Settings items={[
                        { "title": "二级代理团队预存款分成", "percentage": `${data.secondaryAgentPoint || '0'}`,"navigation": `/my/Set/GeneralAgentSet/SecondaryDivision?id=8&secondaryAgentPoint=${data.secondaryAgentPoint || '0'}`},
                        { "title": "三级代理团队预存款分成", "percentage": `${data.tertiaryAgentPoint || '0'}`,"navigation":  `/my/Set/GeneralAgentSet/SecondaryDivision?id=8&secondaryAgentPoint=${data.secondaryAgentPoint || '0'}` },
                        { "title": "团队预存款分成", "percentage": `${data.teamPoint || '0'}`,"navigation": "/my/Set/CallsSet"  },
                        { "title": "二级代理话费分成",  "percentage": `${data.secondaryAgentTelephoneCharges || '0'}`,"navigation":  `/my/Set/GeneralAgentSet/SecondaryDivision?id=8&secondaryAgentPoint=${data.secondaryAgentPoint || '0'}` },
                    ]} />

                    <Settings items={[
                        { "title": "预存款分成设置",  "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/GeneralAgentSet/BudgetSet?level=2" },
                        { "title": "话费分成设置",  "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/GeneralAgentSet/CallsSet?level=2" },
                    ]} />
                     <Settings items={[
                        { "title": "账号管理",  "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/GeneralAgentSet/AccountManagement?level=2" },
                    ]} />
            </>
        </CssCart>
        </TopBar>
    )


}
