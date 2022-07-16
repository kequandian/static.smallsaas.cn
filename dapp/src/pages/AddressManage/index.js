import React from 'react';
import Config from './config';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
// import WxPage from 'zero-element-boot/lib/components/container/WxPage'
import { ChakraProvider } from '@chakra-ui/react'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import VStack from 'zero-element-boot/lib/components/layout/VStack';
import SetBarTitle from '@/components/setBarTitle'




export default function (props) {


    // let endpoint = 'http://app1.console.smallsaas.cn:8001'


    const onHandleItemClick = (item) => {
        // console.log(item, ' ======== item')
    }

    return (
        <>
        <SetBarTitle text='地址管理' />
        <ChakraProvider>
            <div style={{ backgroundColor:'#f2f4f8' ,height:'100%'}}>
                <CssCart padding='10px 10px 100% 10px' height='100%' width='100%'  >
                    <Config onItemClick={onHandleItemClick} />
                </CssCart>

                <div style={{ position: 'fixed', bottom: '0', width: '100%', height: '', padding: '1px 10px ', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5) ', margin: '10px 0 0 0', backgroundColor: '#ffffff' }}>
                    <Button add solid color='#0b82d1'>
                        <div style={{ fontSize: '16px', margin: '6px' }}>新增安装地址</div>
                    </Button>
                </div>
            </div>
        </ChakraProvider>
        </>

    )

}