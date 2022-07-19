import React from 'react';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';



export default function index(props) {

    function myInvitationCode() {
        history.push('/my/ManagingDirector')
    }

    //   const onHandleButtonClick = (ButtonClick) => {
    //     // console.log('ButtonClick == ', ButtonClick)
    //     history.push('/my/Set/BudgetSet')
    // }


    const api = '/api/u/saasAgent/inviteCode'
    const Token = getToken()
    console.log(Token, '=== Token');


    const [data] = useTokenRequest({ api });

    const { InvitationCodeNumber = '33521431' } = props




    return (
        <>
            <CssCart padding='40% 20px ' margin='0 0 10px 0' backgroundColor='#78d2c1' height=''>

                <HCenter offset='20px' >

                    <PrimaryTitle>
                        我的邀请码
                   </PrimaryTitle>
                   
                    <CssCart border='1px #5c9cc8 solid' padding='0 30px'>
                        <PrimarySubtitle>
                            {InvitationCodeNumber}
                        </PrimarySubtitle>
                    </CssCart>

                    <CssCart borderTop='2px #5c9cc8 solid' width='' padding='20px 82px' >
                        <QRCode value="/my/Set/CallsSet" />
                    </CssCart>

                </HCenter>
            </CssCart>
            <Center>
                <div onClick={myInvitationCode} >
                    <svg t="1657853688780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="40710" width="34" height="34"><path d="M512 0C794.769794 0 1024 229.805588 1024 512 1024 794.769794 794.194408 1024 512 1024 229.230208 1024 0 794.194408 0 512 0 229.230208 229.805588 0 512 0ZM512 984.615385C772.648448 984.615385 984.615385 772.81286 984.615385 512 984.615385 251.351552 772.81286 39.384615 512 39.384615 251.351552 39.384615 39.384615 251.18714 39.384615 512 39.384615 772.648448 251.18714 984.615385 512 984.615385ZM512 539.849129 358.829792 693.019336C351.139468 700.70966 338.670988 700.70966 330.980664 693.019336 323.29034 685.329012 323.29034 672.860532 330.980664 665.170208L484.150871 512 330.980664 358.829792C323.29034 351.139468 323.29034 338.670988 330.980664 330.980664 338.670988 323.29034 351.139468 323.29034 358.829792 330.980664L512 484.150871 665.170208 330.980664C672.860532 323.29034 685.329012 323.29034 693.019336 330.980664 700.70966 338.670988 700.70966 351.139468 693.019336 358.829792L539.849129 512 693.019336 665.170208C700.70966 672.860532 700.70966 685.329012 693.019336 693.019336 685.329012 700.70966 672.860532 700.70966 665.170208 693.019336L512 539.849129Z" p-id="40711" fill="#ad6b6c"></path></svg>
                </div>
            </Center>
        </>
    )


}
