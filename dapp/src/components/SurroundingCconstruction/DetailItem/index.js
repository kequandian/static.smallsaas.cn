import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center,Box } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';

/**
 * 
 * @param {icon} icon 图片
 * @param {title} title 标题
 * @param {navigation} navigation 外部链接
 * @param {nextIcon} nextIcon "下一个"指示图标
 * @param {像素} space 间距
 * 
 * 
 */

export default function index(props) {

    const { icon = '', title = '', navigation, nextIcon = '', text = '', space = '16px' } = props

    // console.log('props === ', props)


    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)

    const path = () => {
        history.push(queryData)
    }

    const onnextClick = navigation ? path : null

    return (

        (!space || title) ? (
            <CssCart backgroundColor='#ffffff' height='24px' width='100%' margin='1px 0 0  0 ' >
                <Flex padding='4px 8px'h='100%' >
                    <Flex w='90%'  >
                        {
                            icon ? (
                                <>
                                    <Center h='100%' w='46px' bg='' >
                                        <img src={icon} width='24px' height='24px' />
                                    </Center>
                                    <ItemTitle>
                                        {title}
                                    </ItemTitle>
                                </>
                            ) : (
                                    <ItemTitle>
                                        {title}
                                    </ItemTitle>
                                )
                        }
                    </Flex>
                    {
                        nextIcon ? (
                            <Flex h='100%' onClick={onnextClick} bg='' w='300px'>
                                <ContainerInactiveTitle>
                                    {text || ''}
                                </ContainerInactiveTitle>
                                <Center h='100%' w='12px' bg=''>
                                    <div style={{ width: '12px', height: '', background: '' }} onClick={onnextClick}>
                                        <img src={nextIcon || ''} width='12px' />
                                    </div>
                                </Center>

                            </Flex>

                        ) : (
                                <Center onClick={onnextClick} w='100px'>
                                    <ContainerInactiveTitle>
                                        {text || ''}
                                    </ContainerInactiveTitle>
                                </Center>
                            )
                    }

                </Flex>
            </CssCart>
        ) : (
                <CssCart height={space} width='100%' >
                    <></>
                </CssCart>
            )




    )


}
