import React, { useState, useEffect } from 'react';
import GoodHouse from './index';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle';
import { Flex, Box } from '@chakra-ui/react'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import BackgroundImage from '@/components/presenter/backgroundImage';


export default function (props) {


    const { title = '消息标题fwefwgrfeghtghrtg', time = '5天前', content = '消息内容', DetailArea = '面积regtegreg',

    } = props;

    return (
        <PageModuleContainer>
            <div style={{fontSize:'26px'}}>{title}</div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <ContainerInactiveTitle>{time}</ContainerInactiveTitle>
            </div>
            <div dangerouslySetInnerHTML={{__html: '<div>hello world</div>'}}></div>
        </PageModuleContainer>
    )
}