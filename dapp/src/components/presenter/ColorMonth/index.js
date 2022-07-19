import React from 'react';
import Confing from './Confing'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';


/**
 * 
 * 
 */


export default function Index(props) {


    
    const palette = ["#363d61", "#3ec4a0", "#8596af", "#fbb828", "#5855e8"]

    return (
        <>
        <CssCart background='' margin='40px auto'>
            <Confing  palette = {palette} />
        </CssCart>
        </>
    )

}