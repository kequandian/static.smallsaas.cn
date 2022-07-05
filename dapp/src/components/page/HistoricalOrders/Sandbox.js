import React from 'react';
import HistoricalOrdersIndex from './index';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';


export default function (props) {

    // let endpoint='http://app1.console.smallsaas.cn:8001/openapi'

    // const api = '/api/pub/product/products?category=Food'


    return (
        <CssCart width='100%' padding='20px 10px' backgroundColor='#f5f5f5'>
            {/* // <ContainerInactiveTitle> */}
                <HistoricalOrdersIndex />
            {/* // </ContainerInactiveTitle> */}
         </CssCart>
    )
} 