import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack, ChakraProvider } from '@chakra-ui/react'
import AvatarCard from '@/components/presenter/card/AvatarCard';
import TripleOption from '@/components/presenter/card/TripleOption'
import Switch from '@/pages/my/Switch'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';

import ItemCart from '@/components/presenter/ItemCart'
import { getEndpoint, getToken } from 'zero-element-boot/lib/components/config/common';



/**
 * 
 * 
 */

export default function index(props) {

    const { cb, id,levelInfo, level, status, avatar = '', name = '', phone = '', coChannel = '11', coUserId = '22' } = props
    // const useLevel = ''
    // console.log('useLevel ==', useLevel);

    // const api = '/api/u/saasAgent/myAgentInfo'

    // const [data] = useTokenRequest({ api });
    // console.log('data== ',data)
    const endpoint = getEndpoint()
    const url = !(avatar == null) ? (endpoint + avatar) : ''

    return (
        <ChakraProvider>
            <CssCart backgroundColor='#ffffff' height='62px' width='100%' margin='1px 0 0  0 '  >
                <>
                    <Flex  >
                        <AvatarCard size='34px' avatar={url} title={name} subtitle={phone} navigation={`/my/MyInvite/ModifyChannelCode?id=${id}&coChannel=${coChannel}&coUserId=${coUserId}`} >
                            <CssCart background='#ffffff' padding='4px ' margin='4px'>
                                {(levelInfo == 'GENERAL_AGENT' || 'SECONDARY_AGENT') ? (
                                    <TripleOption
                                        id={id}
                                        defaultValue={level}
                                        defaultStatus={status}
                                        options={[{ "value": "UNAUTHORIZED_LEVEL", "name": "无效" }, { "value": "SECONDARY_AGENT", "name": "二级" }, { "value": "TERTIARY_AGENT", "name": "三级" }]}
                                        callBack={cb}
                                    />
                               ) : (levelInfo == 'TERTIARY_AGENT') ?
                                    (
                                        <Switch />
                                    ) : (
                                        <></>
                                    )
                                }
                            </CssCart>
                        </AvatarCard>
                    </Flex>
                </>
            </CssCart>
        </ChakraProvider>





    )


}

