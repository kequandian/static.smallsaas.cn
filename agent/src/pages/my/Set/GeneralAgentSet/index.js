import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import Settings from 'zero-element-boot-presenter/lib/components/presenter/card/Settings';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Containertitle from '@/components/text/Containertitle';
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'


import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';



export default function index(props) {

    // const api = '/api/GeneralAgentSetData'
    const api = '/api/u/saasAgent/pointSetting/all'

    const [data] = useTokenRequest({ api });

    return (
        <CssCart backgroundColor='#f4f6f8'  height='100%'  width='100%'  position='fixed' padding='10px'>
            <>
                <Containertitle>设置</Containertitle>
                <Spacer />

                    <Settings items={[
                        { "title": "二级代理团队预存款分成", "percentage": `${data.secondaryAgentPoint}`,"navigation": `/my/Set/GeneralAgentSet/SecondaryDivision?id=8&secondaryAgentPoint=${data.secondaryAgentPoint}`},
                        { "title": "三级代理团队预存款分成", "percentage": `${data.tertiaryAgentPoint}`,"navigation":  `/my/Set/GeneralAgentSet/SecondaryDivision?id=8&secondaryAgentPoint=${data.secondaryAgentPoint}` },
                        { "title": "团队预存款分成", "percentage": `${data.teamPoint}`,"navigation": "/my/Set/CallsSet"  },
                        { "title": "二级代理话费分成",  "percentage": `${data.secondaryAgentTelephoneCharges}`,"navigation":  `/my/Set/GeneralAgentSet/SecondaryDivision?id=8&secondaryAgentPoint=${data.secondaryAgentPoint}` },
                    ]} />

                    <Settings items={[
                        { "title": "预存款分成设置", "phone": "1314235466", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/BudgetSet?level=2" },
                        { "title": "话费分成设置", "phone": "1314235466", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/CallsSet?level=2" },
                    ]} />
            </>
        </CssCart>
    )


}
