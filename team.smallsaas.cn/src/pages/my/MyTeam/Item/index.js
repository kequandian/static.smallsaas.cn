import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemSubitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemSubitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import ItemCart from '@/components/presenter/ItemCart'
import { object } from 'prop-types';



export default function index(props) {

    const {  monthlySales  } = props

    return (
            <Stack>
                <Center h='18px' bg=''>
                    <ItemTitleBold>
                    {monthlySales+'' || ''}
                    </ItemTitleBold>
                </Center>
                <Center h='16px' bg=''>
                    <ItemSubitle>
                        月销
                </ItemSubitle>
                </Center>
            </Stack>
    )




}
