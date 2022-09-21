import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import TeanItem from './Item';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
// import SecondaryAgent from './config';
import TopBar from '@/components/presenter/TopBar'
import List from './List'
import AvatarCard from '@/components/presenter/card/AvatarCard';

export default function index(props) {

    // const api = '/api/invitationData'
    // const api = '/api/u/saasAgent/childrenAgent/SECONDARY_AGENT' 
    const api = '/api/u/saasAgent/childrenAgent/TERTIARY_AGENT'

    const [data] = useTokenRequest({ api });

    const items = data.records
    console.log(items, '==items')


    return (
        <>
            <div className='Global' />

            <TopBar>
                三级代理
            </TopBar>

            {items && Array.isArray(items) && items.length > 0 ? (
                // <CssCart backgroundColor='#ffffff' margin=''>
                //     <AvatarCard title={items[0].name} subtitle={items[0].phone} size='40px'>
                //         <TeanItem {...items[0]} />
                //     </AvatarCard>
                // </CssCart>
                <List items={items} />
            ) : <></>}
        </>
    )


}
