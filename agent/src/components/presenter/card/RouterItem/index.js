import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from '@/components/text/ItemTitleBold';
import ItemTitle from '@/components/text/ItemTitle';

/**
 * 
 * @param {icon} icon 图片
 * @param {title} title 标题
 * @param {navigation} navigation 外部链接
 * @param {nextIcon} nextIcon "下一个"指示图标
 * @param {像素} space 间距
 * 
 */

export default function index(props) {

    const { icon = '', title = '', navigation, nextIcon = '',text='', space = '16px' } = props

    // console.log('props === ', props)


    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)

    const path = () => {
        history.push(queryData)
    }

    const onnextClick = navigation ? path : null

    return (

        (!space || title) ? (
            <CssCart backgroundColor='#f7f9fa' height='52px' width='100%' margin='1px 0 0  0 ' >
                <Flex padding='13px 8px' >
                    <Flex w='100%'  >
                        {
                            icon ? (
                                <>
                                    <Center h='100%' w='32px' bg='' >
                                        <img src={icon} width='16px' height='16px' />
                                    </Center>
                                    <ItemTitleBold>
                                        {title}
                                    </ItemTitleBold>
                                </>
                            ) : (
                                    <ItemTitleBold>
                                        {title}
                                    </ItemTitleBold>
                                )
                        }

                    </Flex>


                    {
                        nextIcon ? (
                            <>
                                <div style={{ width: '36px' }} onClick={onnextClick}>
                                    <img src={nextIcon} width='16px' height='16px' />
                                </div>
                            </>
                        ) : (
                                <ItemTitle>
                                    {text}
                                </ItemTitle>
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
