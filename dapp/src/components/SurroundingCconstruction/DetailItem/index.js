import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Box } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import TagIndicator from 'zero-element-boot/lib/components/indicator/TagIndicator'
import Stack from 'zero-element-boot/lib/components/layout/Stack';

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

        <Flex margin='0 8px' >
            <Center>
                <CssCart borderRadius='18px' color='#555555' border='#999999 1px solid' padding='4px 6px' background='#f9f9f9'>
                    {title}
                </CssCart>
            </Center>
        </Flex>



    )


}
