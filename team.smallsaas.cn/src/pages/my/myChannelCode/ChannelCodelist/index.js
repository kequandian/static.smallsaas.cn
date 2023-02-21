import React from 'react';
import RouterItem from './Item';


/**
 * 
 * @param {data} items 数据
 * 
 */


export default function index(props) {

    const { items ,number,MyownAgentId,level} = props
    // console.log(props, ' == items2222222222222')
    // items.map(item=>{
    //     // console.log('item==',item)
    //     items.title = item.agentName,
    //     items.nextIcon = item.code
    // })

    // const data = [
    //     { "/icon": "http:/static.smallsaas.cn/house/2022/svg/Router/invite.svg", "title": "我的邀请", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
    //     { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/ThreeLevelAgent.svg", "title": "三级代理", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
    //     { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/secondaryAgent.svg", "title": "二级代理", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
    //     { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/report.svg", "title": "结算报表", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
    //     { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/history.svg", "title": "历史", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
    //     { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/SetUp.svg", "title": "设置", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
    // ]

    return items && items.map((item, i) => (

        <RouterItem  {...item} key={i} MyownAgentId={MyownAgentId} level={level} />


    )


    )

}