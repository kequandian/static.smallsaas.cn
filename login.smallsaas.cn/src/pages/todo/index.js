import React, { useState, useEffect } from 'react';
import Login from '@/pages/login/QQInterconnection'
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import { Center, Flex, Stack } from '@chakra-ui/layout';


export default function index(props) {

    const getAvatar = window.location.href? window.location.href.split('avatar=') : ''
    const avatar =  window.location.href? getAvatar[1].split('&phone=null')[0] :''
    // const aa = window.location
    const getName =  window.location.href? getAvatar[0].split('name=')[1] : ''
    const name =  window.location.href? getName.split('&') : ''
    console.log('getAvatar =', getAvatar)
    console.log('avatar =', avatar)
    console.log('name =', name)


    return (
        <>
            <div className='login' />
            <Center height='500px' >
                <Stack spacing='10' w='240px' borderRadius='10px' backgroundColor='#ffffff40' color='#fff' padding='20px'>
                    <Flex>
                        <div style={{ borderRadius: '50%', backgroundSize: '100% 100%', width: '50px', height: '50px', backgroundImage: `url(${avatar})` }} />
                        <Center>
                            <div style={{
                                // weight: '20px',
                                width: '120px',
                                height: "30px",
                                fontSize: '18px',
                                fontWeight: 'bold',
                                marginLeft: '10px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                            >

                                {name}
                                {/* 大苏范弟弟sad */}
                            </div>
                        </Center>

                    </Flex>
                </Stack>
            </Center>
        </>
    )


}
