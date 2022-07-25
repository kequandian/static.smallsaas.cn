import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemSubitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemSubitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';



export default function index(props) {

    const { icon = '', navigation, monthlySales = '32' } = props

    const queryData = useQuery(props.navigation)

    const path = () => {
        history.push(queryData)
    }

    const onnextClick = navigation ? path : null

    return (
        <CssCart backgroundColor='#ffffff' height='52px' width='' margin='1px 8px 0  0 ' padding='2px' >
            <Stack>
                <Center h='18px' bg=''>
                    <ItemTitleBold>
                        {monthlySales}
                    </ItemTitleBold>
                </Center>
                <Center h='16px' bg=''>
                    <ItemSubitle>
                        月销
                </ItemSubitle>
                </Center>
            </Stack>
        </CssCart>

    )




}
