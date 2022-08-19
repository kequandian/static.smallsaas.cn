import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack,Box } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import ProductListDefaultImage from '@/components/presenter/ProductListDefaultImage'
/**
 * 
 * 产品item
 * 
 */

export default function index(props) {

    const { icon = '', appid, name } = props

    return (
        <>
            <Center w='200px'>
                <Stack padding='8px 26px ' bg='' margin='10px'>
                    <Center h='' w='' margin='0 0 10px 0'>
                        {/* <Box  bg='#ffffff' borderRadius='50%' padding='8px'> */}
                            {/* {icon} */}
                            <ProductListDefaultImage  size='50' url={icon}/>
                        {/* <svg t="1660716963325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="99033" width="50" height=""><path d="M862 306c0-49.7-40.3-90-90-90H252c-49.7 0-90 40.3-90 90v412c0 49.7 40.3 90 90 90h520c49.7 0 90-40.3 90-90V306z m-610-30h520c16.5 0 30 13.5 30 30v73H222v-73c0-16.5 13.5-30 30-30z m520 472H252c-16.5 0-30-13.5-30-30V439h580v279c0 16.5-13.5 30-30 30z" p-id="99034" fill="#cc7770"></path><path d="M424 612H288c-16.6 0-30 13.4-30 30s13.4 30 30 30h136c16.6 0 30-13.4 30-30s-13.4-30-30-30z" p-id="99035" fill="#cc7770"></path></svg> */}
                        {/* </Box> */}
                    </Center>
                    <Center h='' w='' bg='' >
                        <ItemTitle>
                            {name}
                        </ItemTitle>
                    </Center>
                </Stack>
            </Center>
        </>

    )


}
