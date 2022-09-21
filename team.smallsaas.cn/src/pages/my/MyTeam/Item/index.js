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
import AvatarCard from '@/components/presenter/card/AvatarCard';



export default function index(props) {

    const { monthlySales,name ,phone,avatar } = props

    return (
        <CssCart backgroundColor='#ffffff' margin='0 0 1px 0'>
            <AvatarCard title={name} subtitle={phone} size='40px'  avatar={avatar} >
                {/* <TeanItem {...items[0]} /> */}
                <Stack>
                    <Center h='18px' bg=''>
                        <ItemTitleBold>
                            {monthlySales + '' || ''}
                        </ItemTitleBold>
                    </Center>
                    <Center h='16px' bg=''>
                        <ItemSubitle>
                            月销
                        </ItemSubitle>
                    </Center>
                </Stack>
            </AvatarCard>
        </CssCart>

    )




}
