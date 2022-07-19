import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';

/**
 * 
 * @param {icon} icon 图片
 * @param {title} title 标题
 * @param {navigation} navigation 外部链接
 * @param {value} value 数值
 * 
 */

export default function index(props) {

    const { icon = '', value = '', title = '', navigation } = props

    // console.log('props === ', props)


    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)

    const path = () => {
        history.push(queryData)
    }

    const onnextClick = navigation ? path : null

    return (
        <CssCart>
            <Center h='100%' w='100%' >
                <Stack padding='13px 2px' >
                    {(icon && !value) ?
                        (
                            <Center h='60px' w='100%' bg='' >
                                <img src={icon} width='36px' height='36px' onClick={onnextClick} />
                            </Center>
                        ) : (!icon && value) ? (
                            <Center h='20px' w='100%' bg='' >
                                <ItemTitleBold>
                                    {value}
                                </ItemTitleBold>

                            </Center>
                        ) : (icon && value) ? (
                            <Flex>
                                <Center h='60px' w='100%' bg='' margin='0 4px' >
                                    <img src={icon} width='36px' height='36px' onClick={onnextClick} />
                                </Center>
                                <Center h='60px' w='100%' bg='' >
                                    {value}
                                </Center>
                            </Flex>
                        ) : (<></>)
                    }

                    <Center h='' w='100%' bg='' >
                        <ItemTitle>
                            {title}
                        </ItemTitle>
                    </Center>

                </Stack>
            </Center>

        </CssCart>

    )


}
