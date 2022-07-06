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


    const { title = 'fwefwgrfeghtghrtg', time = '5天前', content = '消息内容', DetailArea = '面积regtegreg',

    url = 'https://qhrenderpicoss.kujiale.com/r/2022/04/03/L3D222S21ENDP5LFG4AUWF6H6LUF3P3WU888.0_6000x1000.jpg',
    } = props;

    return (
        <PageModuleContainer>
            <h1>{title}</h1>
            <div style={{width:'100%' ,display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
            <ContainerInactiveTitle>{time}</ContainerInactiveTitle>
            </div>
            <PrimarySubtitle>
                {content}
            </PrimarySubtitle>
            <div style={{ backgroundImage:`url(${url})`, width:'100%' ,height: '260px' }}/>
        </PageModuleContainer>
    )
}