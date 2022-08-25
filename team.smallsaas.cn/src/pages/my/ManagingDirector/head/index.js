import React, { useState, useEffect } from 'react';
import RouterBox from 'zero-element-boot-presenter/lib/components/presenter/card/RouterBox';


// --我的页面头部列表

export default function index(props) {
    const { list } = props

    return (
            <>

                {(list.level === 'GENERAL_AGENT') ? (
                    <RouterBox columns='5' items={[
                        { "title": "二级", "value": `${list.secondaryAgentCount || '0'}` },
                        { "title": "三级", "value": `${list.tertiaryAgentAmount || '0'}` },
                        { "title": "直推", "value": `￥${list.point || '0'}` },
                        { "title": "二级贡献", "value": `￥${list.secondaryAgentAmount || '0'}` },
                        { "title": "三级贡献", "value": `￥${list.tertiaryAgentAmount || '0'}` },
                    ]} />
                ) : (list.level === 'SECONDARY_AGENT') ? (
                    <RouterBox columns='5' items={[
                        { "title": "直推", "value": `￥${list.point || '0'}` },
                        { "title": "代理", "value": `${list.secondaryAgentCount || '0'}` },
                        { "title": "代理贡献", "value": `￥${list.secondaryAgentAmount || '0'}` },
                    ]} />
                ) : (list.level === 'TERTIARY_AGENT') ? (
                    <RouterBox columns='5' items={[
                        { "title": "直推", "value": `￥${list.point || '0'}` },
                        { "title": "团队", "value": `${list.tertiaryAgentAmount || '0'}` },
                        { "title": "团队贡献", "value": `￥${list.tertiaryAgentAmount || '0'}` },
                    ]} />
                ) : (<></>)
                }
            </>
    )


}
