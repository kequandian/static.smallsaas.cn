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

    const { icon = '', title = '', navigation, nextIcon = '' } = props

    // console.log('props === ', props)

    return (

        <Center margin='0 2px' h='' borderRadius='18px' color='#555555' border='#dddddd 1px solid' padding='4px 8px' bg='#f9f9f9'>
            <Center w=''>
                {title}
            </Center>
        </Center>



    )


}
