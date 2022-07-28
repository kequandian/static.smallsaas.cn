import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Settings from './config';


/**
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { items } = props


    return (
        <CssCart boxShadow='0 2px 8px rgba(0, 0, 0, 0.08) ' backgroundColor='#ffffff' padding='10px' margin='8px' borderRadius='8px' width=''>
            <Settings items={items} />
        </CssCart>

    )



}