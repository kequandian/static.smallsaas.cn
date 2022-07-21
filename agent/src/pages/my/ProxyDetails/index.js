import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import Router from 'zero-element-boot-presenter/lib/components/presenter/card/Router';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {

    const api = '/api/invitationData'


    const [data] = useTokenRequest({ api });


    return (
        <PageModuleContainer>
             <CssCart backgroundColor=''>
               
                <Router items={[
                    { "icon": `${data.record.avatar}`, "title": `${data.record.name}`, "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
                    { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/history.svg", "title": "长江营业厅", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
                    { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/SetUp.svg", "title": "东汇营业厅", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
                ]} />

            </CssCart>
        </PageModuleContainer>
    )


}
