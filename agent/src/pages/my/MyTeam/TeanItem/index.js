import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Cart from 'zero-element-boot/lib/components/cart/Cart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from '@/components/text/ItemTitleBold';
import ItemTitle from '@/components/text/ItemTitle';
import ItemSubitle from '@/components/text/ItemSubitle';
import Avatar from '@/components/presenter/Avatar'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';

/**
 * 
 * @param {icon} icon 图片
 * 
 */

export default function index(props) {

    const { icon = '', name = '', navigation, preStoragePoint = '', space = '16px', monthlySales = '' } = props

    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)

    const path = () => {
        history.push(queryData)
    }

    const onnextClick = navigation ? path : null

    return (
        // {/* <h1>11</h1> */}
        (!space || name) ? (
            <CssCart backgroundColor='#f7f9fa' height='52px' width='100%' margin='1px 0 0  0 ' padding='2px' >
                <Flex padding='2px' >
                    <Flex w='100%' h='100%' bg='' >
                        <CssCart height='' width='' margin='auto 1px ' padding='' >
                            <Avatar url={icon} size='36px' />
                        </CssCart >
                        <Stack w='20%'>
                            <ItemSubitle>
                                {name}
                            </ItemSubitle>
                            <ItemSubitle>
                                {preStoragePoint}
                            </ItemSubitle>
                        </Stack>
                        <Stack w='20%'>
                            <ItemSubitle>
                               预存分成
                            </ItemSubitle>
                            <ItemSubitle>
                           <>     {monthlySales}%</>
                            </ItemSubitle>
                        </Stack>
                      
                    </Flex >

                    <Flex h='' margin='0 4px'>
                    <Stack w='40px'>
                            <ContainerInactiveTitle>
                                月销
                            </ContainerInactiveTitle>
                            <ItemSubitle>
                                {monthlySales}
                            </ItemSubitle>
                        </Stack>
                    </Flex>

                </Flex>
            </CssCart>
        ) : (
                <CssCart height={space} width='100%' >
                    <></>
                </CssCart>
            )




    )


}
