import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';

import TopBar from '@/components/presenter/TopBar'


// --我的邀请码页面

export default function index(props) {

    function myInvitationCode() {
        history.push('/my/ManagingDirector')
    }

    //   const onHandleButtonClick = (ButtonClick) => {
    //     // console.log('ButtonClick == ', ButtonClick)
    //     history.push('/my/Set/BudgetSet')
    // }


    const api = '/api/u/saasAgent/inviteCode'
    // const api = '/api/u/saasAgent/invite?inviteCode=(G-15475197476990115851234)'
    const Token = getToken()
    console.log(Token, '=== Token');


    const [data] = useTokenRequest({ api });

    // const { InvitationCodeNumber = '33521431' } = props




    return (
        <ChakraProvider>
            <TopBar>
            <CssCart position='fixed' width='100%'  height='100%' padding='40px 20px ' margin='0 0 10px 0'
            //  backgroundColor='#020407'
             background='linear-gradient(141deg, rgba(98, 98, 125)1%,rgba(2, 4, 7)100%)'
              >
                <>
                <CssCart padding='40px 20px ' margin='0 0 20px 0' backgroundColor='#1a2748' >
<>
                    <Center>
                        <DarkBackgroundTitle fontSize='15px'>
                             我的邀请码
                        </DarkBackgroundTitle>
                    </Center>

                     <Stack>
                        <Center border='1px #3156bd solid' padding='4px 10px' margin='20px 40px ' borderRadius='2px'>
                            <DarkBackgroundTitle>
                                {data}
                            </DarkBackgroundTitle>
                         </Center>

                            <Center borderTop='2px #2e3f64 solid' width='' padding='50px 62px'  bg='' >
                                 <CssCart  padding='8px '  backgroundColor='#ffffff'  borderRadius='2px'>
                                     <QRCode value="/my/Set/CallsSet" />
                                </CssCart>

                            </Center>
                         </Stack>   
                         </>
            </CssCart>
                       
                    
                    <Center margin='30px 0'>
                        <div onClick={myInvitationCode} >
                            <svg t="1657853688780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="40710" width="34" height="34"><path d="M512 0C794.769794 0 1024 229.805588 1024 512 1024 794.769794 794.194408 1024 512 1024 229.230208 1024 0 794.194408 0 512 0 229.230208 229.805588 0 512 0ZM512 984.615385C772.648448 984.615385 984.615385 772.81286 984.615385 512 984.615385 251.351552 772.81286 39.384615 512 39.384615 251.351552 39.384615 39.384615 251.18714 39.384615 512 39.384615 772.648448 251.18714 984.615385 512 984.615385ZM512 539.849129 358.829792 693.019336C351.139468 700.70966 338.670988 700.70966 330.980664 693.019336 323.29034 685.329012 323.29034 672.860532 330.980664 665.170208L484.150871 512 330.980664 358.829792C323.29034 351.139468 323.29034 338.670988 330.980664 330.980664 338.670988 323.29034 351.139468 323.29034 358.829792 330.980664L512 484.150871 665.170208 330.980664C672.860532 323.29034 685.329012 323.29034 693.019336 330.980664 700.70966 338.670988 700.70966 351.139468 693.019336 358.829792L539.849129 512 693.019336 665.170208C700.70966 672.860532 700.70966 685.329012 693.019336 693.019336 685.329012 700.70966 672.860532 700.70966 665.170208 693.019336L512 539.849129Z" p-id="40711" fill="#ffffff"></path></svg>
                        </div>
                    </Center>
                  </>
            </CssCart>
           </TopBar>
        </ChakraProvider>
    )


}
