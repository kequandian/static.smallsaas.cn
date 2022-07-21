import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack,ChakraProvider } from '@chakra-ui/react'
import AvatarCard from '@/components/presenter/card/AvatarCard';
import TripleOption from '@/components/presenter/card/TripleOption'


/**
 * 
 * @param {icon} icon 图片
 * 
 */

export default function index(props) {

    const { cb, id, level, status, icon = '', name = '', space = '16px', phone = '' } = props

    return (
        (!space || name) ? (
        <ChakraProvider>

            <CssCart backgroundColor='#f7f9fa' height='58px' width='100%' margin='1px 0 0  0 ' padding='2px' >
                <>
                    <Flex  >
                        <AvatarCard size='30px' Avatar={icon} title={name} subtitle={phone} >
                        <CssCart background='#ffffff' padding='4px ' margin='4px'>
                            <TripleOption 
                                id={id}
                                defaultValue={level} 
                                options={[{ "value": "null", "name": "无效" },{ "value": "TERTIARY_AGENT", "name": "二级" }, { "value": "SECONDARY_AGENT", "name": "三级" }]}
                                callBack={cb}
                            />
                        </CssCart>
                       
                        
                        </AvatarCard>

                    </Flex>
                </>
            </CssCart>
</ChakraProvider>

        ) : (
                <>
                </>
            )




    )


}

