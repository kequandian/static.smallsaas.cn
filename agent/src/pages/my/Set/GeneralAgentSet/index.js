import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import SetItem from './SetItem';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';


import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';



export default function index(props) {

  const api = '/api/GeneralAgentSetData'

  const [data] = useTokenRequest({ api });


    return (
        <PageModuleContainer>
            <PrimaryTitle>设置</PrimaryTitle>
             <CssCart backgroundColor=''>
                <SetItem items={[
                        { "title": "二级代理团队预存款分成", "phone": "1314235466","navigation": "/agent?level=2" ,"text":`${data.secondaryAgentPoint}%`},
                        {  "title": "三级代理团队预存款分成", "phone": "1314235466", "text":`${data.tertiaryAgentPoint}%` },
                        {  "title": "团队预存款分成", "phone": "1314235466","text":`${data.teamPoint}%` },
                        {  "title": "二级代理话费分成", "phone": "1314235466",  "text":`${data.secondaryAgentTelephoneCharges}%`},
                        {},
                        {"title": "预存款分成设置", "phone": "1314235466","nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/BudgetSet" },
                        {"title": "话费分成设置", "phone": "1314235466","nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/CallsSet" },
                    ]} />
            </CssCart>
        </PageModuleContainer>
    )


}
