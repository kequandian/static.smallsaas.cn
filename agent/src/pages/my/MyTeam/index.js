import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import TeanItem from './TeanItem';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import Tean from './Tean';
import TopBar from '@/components/presenter/TopBar'

export default function index(props) {

    // const api = '/api/invitationData'
    const api = '/api/u/saasAgent/childrenAgent/SECONDARY_AGENT'

    const [data] = useTokenRequest({ api });

    const items = data.records
    console.log(items, '==items')


    return (
        <TopBar>
            <>
            <CssCart margin='6px 0 10px 40px' >
                <ContainerSubtitle>
                    三级代理
                </ContainerSubtitle>
            </CssCart>

            {items && Array.isArray(items) && items.length > 0 ? (
                <CssCart backgroundColor='#f7f9fa' margin='8px'>
                    <Tean title={items[0].name} subtitle={items[0].phone} size='40px' >
                        <TeanItem {...items} />
                    </Tean>
                </CssCart>

            ) : <></>}
            </>
        </TopBar>

    )


}
