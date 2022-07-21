import React, { useState, useEffect } from 'react';
import RouterBox from '@/components/presenter/card/RouterBox';


// --我的页面头部列表

export default function index(props) {
    const { list } = props
// console.log(props,'==props');

    return (
        <RouterBox columns='5' items={[
            { "title": "二级", "value": `${list.secondaryAgentCount}` },
            { "title": "三级", "value": `${list.tertiaryAgentAmount}` },
            { "title": "直推", "value": `￥${list.point}` },
            { "title": "二级贡献", "value": `￥${list.secondaryAgentAmount}` },
            { "title": "三级贡献", "value": `￥${list.tertiaryAgentAmount}` },
        ]} />

    )


}
