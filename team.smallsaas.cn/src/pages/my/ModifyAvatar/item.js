import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack, Flex, Center, Box } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import Container from 'zero-element-boot/lib/components/container/Container'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import ChangeAvatar from '@/components/presenter/card/ChangeAvatar'
import { history } from 'umi';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'

import { getEndpoint, getToken } from 'zero-element-boot/lib/components/config/common';

/**
 * 
 * @param {title} title 标题、名字
 * @param {subtitle} subtitle 副标题
 * @param {avatar} avatar 头像
 * 
 */


export default function index(props) {

    const { title = '名字', content = '', icon, callBack } = props

    // function ChangName() {
    //     history.push(`/my/ModifyAvatar/editName?name=${content}&text=name`)
    // }

    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)

    const path = () => {
        history.push(queryData)
    }

    const ChangName = navigation ? path : null

    const endpoint = getEndpoint()
    const url = endpoint + icon
    return (
        <Box onClick={() => { ChangName() }}>
            <Container>
                <Flexbox align='start-with-last-end' direction='row' >

                    <Center h='100%' w='' margin='0 0 0 8px'>
                        <ItemTitleBold>
                            {title}
                        </ItemTitleBold>
                    </Center>

                    {icon ? (
                        <Flex>

                            {/* <Center h='60px' w='100%' bg='' onClick={() => ChangeAvatar()} >
                                <img src={icon} width='36px' height='36px' />
                            </Center> */}
                            <CssCart width='70px' height='60px' background=''>
                                <ChangeAvatar logo={url} callBack={callBack} />
                            </CssCart>

                            <Center h='100%' w='' bg='' margin='0 0 0 8px'>
                                <img src='http://static.smallsaas.cn/house/2022/svg/Router/enter.svg' width='12px' height='16px' />
                            </Center>
                        </Flex>
                    ) : (
                        <Flex>
                            <ContainerInactiveTitle>
                                {content || ''}
                            </ContainerInactiveTitle>
                            <Center h='100%' w='' bg='' margin='0 0 0 8px'>
                                <img src='http://static.smallsaas.cn/house/2022/svg/Router/enter.svg' width='12px' height='16px' />
                            </Center>
                        </Flex>
                    )}

                </Flexbox>
            </Container>
        </Box>

    )

}
