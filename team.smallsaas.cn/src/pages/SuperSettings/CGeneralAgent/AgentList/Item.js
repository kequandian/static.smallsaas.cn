import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack, Box } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import ProductListDefaultImage from '@/components/presenter/ProductListDefaultImage'
/**
 * 
 *代理item
 * 
 */

export default function index(props) {

    const { icon = '', id, name ,onIetmClick} = props
  
  
    return (
        <>
            <Center w='200px' onClick={()=>onIetmClick(id)}>
                <Stack padding='8px 26px ' bg='' margin='10px' >
                    <Center h='' w='' margin='0 0 10px 0'>
                        <ProductListDefaultImage size='50' url={icon} />
                    </Center>
                    <Center >
                        <ItemTitle>
                            {name}
                        </ItemTitle>
                    </Center>
                </Stack>
            </Center>
        </>

    )


}
