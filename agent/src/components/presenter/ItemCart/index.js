import React from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'

/**
 * 
 * 
 */
export default function index(props) {

    const { children, ...rest } = props

    return React.Children.map(children, child => {

        return (
            <CssCart background='' padding='' boxShadow='0 0px 2px rgba(0, 0, 0, 0.12)' borderRadius='10px' margin='10px' overflow='hidden'>
                {
                    React.cloneElement(child, {
                        ...rest
                    })
                }
            </CssCart>
        )
    }

    )

}