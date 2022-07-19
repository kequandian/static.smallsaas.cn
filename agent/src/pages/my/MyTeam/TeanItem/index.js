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



export default function index(props) {

    const { icon = '',  navigation,  monthlySales = '32' } = props

    const queryData = useQuery(props.navigation)

    const path = () => {
        history.push(queryData)
    }

    const onnextClick = navigation ? path : null

    return (
            <CssCart backgroundColor='' height='52px' width='100%' margin='1px 0 0  0 ' padding='2px' >
                <Flex padding='2px' >
                    <Flex w='100%' h='100%' bg='' >
                        <Stack w='50%'>
                            <ItemSubitle>
                            <>     {monthlySales}%</>
                            </ItemSubitle>
                            <ContainerInactiveTitle>
                                销账分成
                            </ContainerInactiveTitle>
                        </Stack>
                        <Stack w='50%'>
                            <ItemSubitle>
                            <>     {monthlySales}%</>
                            </ItemSubitle>
                            <ContainerInactiveTitle>
                          预存分成
                            </ContainerInactiveTitle>
                        </Stack>
                      
                    </Flex >
                    <Flex h='' w='20%' margin='0 4px'>
                    <Stack>
                            <ItemSubitle>
                                {monthlySales}
                            </ItemSubitle>
                            <ContainerInactiveTitle >
                            月销
                            </ContainerInactiveTitle>
                        </Stack>
                    </Flex>

                </Flex>
            </CssCart>
        
            )




}
