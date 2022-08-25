import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { ChakraProvider, Flex, Center, Stack, Box, Text } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import ProductListDefaultImage from '@/components/presenter/ProductListDefaultImage'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import Counter from './Counter'
// import Counter from 'zero-element-boot/lib/components/presenter/Counter'



/**
 * 
 *弹出的计数按钮
 * 
 */

export default function index(props) {


    const { icon = '', id, name, onIetmClick,callBackData, determine } = props
  
    return (
        <ChakraProvider>
            {/* <Stack padding='0 ' bg='' margin='' spacing={0}> */}
                <Flex  display='flex' justifyContent='ent'>
                    <Button outline w='20px' color='#b03931' onClick={determine} >
                      <Text fontSize='18px' >
                      确认
                        </Text> 
                    </Button>
                </Flex>
                <Center borderTop='1px solid #909090'>
                    <Counter size={60} cb={(number) => callBackData(number)} />
                </Center>
            {/* </Stack> */}
        </ChakraProvider>

    )


}
