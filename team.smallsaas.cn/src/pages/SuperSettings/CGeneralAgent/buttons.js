import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { ChakraProvider, Flex, Center, Stack, Box, Spacer } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import ProductListDefaultImage from '@/components/presenter/ProductListDefaultImage'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';



/**
 * 
 * 
 */

export default function index(props) {

    const { icon = '', id, name, onIetmClick } = props
    // function onAppClick() {
        // history.push(`/SuperSettings/CGeneralAgent/ViewChannelCode/BatchGeneration?agentId=${id}`)
    // }
    console.log('11=',id)
    function onChannelCode() {
        history.push(`/SuperSettings/CGeneralAgent/ViewChannelCode/BatchGeneration?agentId=${id}`)
    }
    return (
        <ChakraProvider>
            <Stack padding='0 8px ' bg='' margin='' spacing={0}>
                <Center w=''>
                    <Box padding='0 10px' margin='0 ' w='100%' onClick={() => onChannelCode()} >
                        <Button solid color='#0f83f0'>查看应用列表</Button>
                    </Box>
                </Center>
                <Center w='' >
                    <Box padding='0 10px' margin='0 ' w='100%' onClick={() => onChannelCode()} >
                        <Button solid color='#0f83f0'>查看授权渠道码</Button>
                    </Box>
                </Center>
                <Center w='' onClick>
                    <Box padding='0 10px' h='10px' margin='0 ' w='100%' />
                </Center>
                <Center w='' onClick>
                    <Box padding='0 10px' margin=' 0 ' w='100%' onClick={() => onNextClick()} >
                        <Button outline plain color='#0f83f0'>编辑</Button>
                    </Box>
                </Center>
                <Center w='' onClick>
                    <Box padding='0 10px' margin='0 ' w='100%' onClick={() => onNextClick()} >
                        <Button outline color='#d54f64'>删除</Button>
                    </Box>
                </Center>
            </Stack>
        </ChakraProvider>

    )


}
