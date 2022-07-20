import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Cart from 'zero-element-boot/lib/components/cart/Cart'
import { Flex, Center, Stack,ChakraProvider } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from '@/components/text/ItemTitleBold';
import ItemTitle from '@/components/text/ItemTitle';
import ItemSubitle from '@/components/text/ItemSubitle';
import Avatar from '@/components/presenter/Avatar'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import Switch from '../../Switch'
import ItemAccent from 'zero-element-boot-plugin-theme/lib/components/text/ItemAccent';
import ItemTag from '@/components/text/ItemTag';
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

