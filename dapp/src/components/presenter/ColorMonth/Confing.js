
import React from 'react';
import { ChakraProvider, Center, Flex } from "@chakra-ui/react";
import { AutoLayout } from 'zero-element-boot';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import ColorMonthPalette from '@/components/presenter/ColorMonth/Palette'

/**
 * 
 * 
 */

export default function Index(props) {

    const api =  '/api/ColorFruitData'

    const [data] = useTokenRequest({ api });

    // const { data = [] } = props;

    /**
     * 页面配置
     */
    const config = {
        items: data.length > 0 ? data : [],
        layout: {
            xname: 'Gridbox',
            props: {
                columns: 1,
                justify: 'end'
            },

            container: 'PlainList',
        }
    };


    return (
        <ChakraProvider>
            <Center bg=''>
                <AutoLayout {...config} >
                    <ColorMonthPalette />
                </AutoLayout>
            </Center>
        </ChakraProvider>

    )
}