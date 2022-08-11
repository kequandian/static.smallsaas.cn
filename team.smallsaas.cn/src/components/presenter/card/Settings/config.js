import React from 'react';
import SettingItem from '../SettingItem';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Center } from '@chakra-ui/react'

export default function index(props) {

    const { items } = props

    return items && items.map((item, i) => (

       (i == items.length - 1) ?
            (<CssCart padding='10px 2px 10px 6px' margin=' 0 8px' >
                <SettingItem  {...item} key={i} />
            </CssCart>)
            :
            <CssCart padding='10px 2px 10px 6px' margin=' 0 8px' borderBottom='0.1px #dfe1e6 solid'>
                <SettingItem  {...item} key={i} />
            </CssCart>


    )

    )



}