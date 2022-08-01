import React,{useEffect} from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack, Spinner } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';
import TopBar from '@/components/presenter/TopBar'



export default function index(props) {

    const { pass } = props
    // console.log('props==', props);

    function PassData() {
        // pass(data)
        if( pass ){
            history.push('/orders')
        }else{
            alert('跳转失败，请重新扫码，或输入邀请码登录!')
        }
    }

    useEffect(_ => {
        PassData()
    }, [])

    return (
        <ChakraProvider>
            <TopBar>
                联通5G
            </TopBar>
            <Flex w='100%' borderTop='1px solid #f5f5f5'>
                <Center margin='0 4px'>
                    <Spinner size='sm' />
                </Center>
                <Center>
                    <CssCart >
                        加载中....
                    </CssCart>
                </Center>

            </Flex>

        </ChakraProvider>
    )


}
