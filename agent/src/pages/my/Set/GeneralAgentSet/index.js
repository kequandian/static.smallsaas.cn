import React, { useState, useEffect } from 'react';
import Settings from 'zero-element-boot-presenter/lib/components/presenter/card/Settings';
import TopBar from '@/components/presenter/TopBar'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


// --设置的首页
export default function index(props) {

    // const api = '/api/GeneralAgentSetData'
    const api = '/api/u/saasAgent/pointSetting/all'

    const [data] = useTokenRequest({ api });

    return (
        <>
            <TopBar>
                设置
            </TopBar>
            <Settings items={[
                { "title": "二级代理团队预存款分成", "percentage": `${data.secondaryAgentPoint || '0'}`, "navigation": `/my/Set/GeneralAgentSet/edit/SecondaryDivision?id=8&secondaryAgentPoint=${data.secondaryAgentPoint || '0'}&text=1` },
                { "title": "三级代理团队预存款分成", "percentage": `${data.tertiaryAgentPoint || '0'}`, "navigation": `/my/Set/GeneralAgentSet/edit/tertiaryAgentPoint?id=8&tertiaryAgentPoint=${data.tertiaryAgentPoint || '0'}&text=2` },
                { "title": "团队预存款分成", "percentage": `${data.teamPoint || '0'}`, "navigation": `/my/Set/GeneralAgentSet/edit/teamPoint?id=8&teamPoint=${data.teamPoint || '0'}&text=3` },
                { "title": "二级代理话费分成", "percentage": `${data.secondaryAgentTelephoneCharges || '0'}`, "navigation": `/my/Set/GeneralAgentSet/edit/secondaryAgentTelephoneCharges?id=8&secondaryAgentTelephoneCharges=${data.secondaryAgentTelephoneCharges || '0'}&text=4` },
            ]} />
            <Settings items={[
                { "title": "预存款分成设置", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/GeneralAgentSet/BudgetSet?level=2&text=5" },
                { "title": "话费分成设置", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/GeneralAgentSet/CallsSet?level=2&text=6" },
            ]} />
            <Settings items={[
                { "title": "账号管理", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/ModifyAvatar?level=2" },
            ]} />
        </>
    )


}
