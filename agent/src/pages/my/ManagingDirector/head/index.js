import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import HCenter from 'zero-element-boot/lib/components/cart/HCenter';
import RouterBox from '@/components/presenter/card/RouterBox';



export default function index(props) {
    const { list } = props
// console.log(props,'==props');

    return (
        <RouterBox columns='5' items={[
            { "title": "二级", "value": `${list.secondaryAgentCount}` },
            { "title": "三级", "value": `${list.tertiaryAgentAmount}` },
            { "title": "直推", "value": `￥${list.point}` },
            { "title": "二级贡献", "value": `￥${list.secondaryAgentAmount}` },
            { "title": "三级贡献", "value": `￥${list.tertiaryAgentAmount}` },
        ]} />

    )


}
