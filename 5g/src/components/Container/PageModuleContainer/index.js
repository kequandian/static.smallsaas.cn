import React from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';


/**
 * 
 * @param {ContainerTitle} ContainerTitle 容器标题
 * 
 */


export default function Index(props) {

    const { children, ContainerTitle = '', } = props;



    return React.Children.map(children, child => {
        return (

            <Cart fill='#ffffff' linewidth='0' corner='12px' margin='4px 10px' padding='10px'>
                <>
                    {ContainerTitle}
                    {child}
                </>
            </Cart>
        )
    })
}