import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemSubitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemSubitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import AvatarCard from '@/components/presenter/card/AvatarCard';
import { getEndpoint } from 'zero-element-boot/lib/components/config/common'


export default function index(props) {

    const { icon = '', navigation, monthlySales = '32', name, phone, avatar } = props

    const queryData = useQuery(props.navigation)

    const path = () => {
        history.push(queryData)
    }
    const onnextClick = navigation ? path : null
    // const endpoint = getEndpoint()
    // console.log('endpoint ==',endpoint)
    return (
        <CssCart backgroundColor='#ffffff' margin=' 0 0 1px 0'>
            <AvatarCard title={name} subtitle={phone} size='40px' avatar={avatar} >
                <CssCart backgroundColor='#ffffff' height='52px' width='200px' margin=' 0 ' padding='' >
                    <Flex padding='' >
                        <Flex w='100%' h='100%' bg='' >
                            <Stack w='50%'>
                                <Center>
                                    <ItemTitleBold>
                                        <>     {monthlySales}%</>
                                    </ItemTitleBold>
                                </Center>
                                <ItemSubitle>
                                    销账分成
                                </ItemSubitle>
                            </Stack>
                            <Stack w='50%'>
                                <Center>
                                    <ItemTitleBold>
                                        <>     {monthlySales}%</>
                                    </ItemTitleBold>
                                </Center>

                                <ItemSubitle>
                                    预存分成
                                </ItemSubitle>
                            </Stack>
                        </Flex >
                        <Flex h='' w='20%' margin='0 4px'>
                            <Stack>
                                <ItemTitleBold>
                                    {monthlySales}
                                </ItemTitleBold>
                                <ItemSubitle >
                                    月销
                                </ItemSubitle>
                            </Stack>
                        </Flex>

                    </Flex>
                </CssCart>
            </AvatarCard>
        </CssCart>
    )

}
