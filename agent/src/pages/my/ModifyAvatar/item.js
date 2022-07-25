import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack, Flex, Center } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import Container from 'zero-element-boot/lib/components/container/Container'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import ChangeAvatar from '@/components/presenter/card/ChangeAvatar'

/**
 * 
 * @param {title} title 标题、名字
 * @param {subtitle} subtitle 副标题
 * @param {avatar} avatar 头像
 * 
 */


export default function index(props) {

    const { title = '名字', content = 'ff', icon, onnextClick } = props
    // function ChangeAvatar() {
    //     // console.log('aa')
    // }


    return (
            <Container>
                <Flexbox align='start-with-last-end' direction='row' >
                    <ItemTitleBold>
                        {title}
                    </ItemTitleBold>

                    {icon ? (
                        <Flex>

                            {/* <Center h='60px' w='100%' bg='' onClick={() => ChangeAvatar()} >
                                <img src={icon} width='36px' height='36px' />
                            </Center> */}
                            <CssCart width='80px' height='70px' background=''>
                                <ChangeAvatar />

                            </CssCart>

                            <Center h='100%' w='22px' bg='' >
                                <img src='http://static.smallsaas.cn/house/2022/svg/Router/enter.svg' width='12px' height='16px' />
                            </Center>
                        </Flex>
                    ) : (
                            <Flex>
                                <ContainerInactiveTitle>
                                    {content}
                                </ContainerInactiveTitle>
                                <Center h='100%' w='' bg='' >
                                    <img src='http://static.smallsaas.cn/house/2022/svg/Router/enter.svg' width='12px' height='16px' />
                                </Center>
                            </Flex>
                        )}

                </Flexbox>
            </Container>

    )

}
