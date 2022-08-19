import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Box, Text } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import TagIndicator from 'zero-element-boot/lib/components/indicator/TagIndicator'

/**
 * 

 * 
 */

export default function index(props) {

    const { icon = '', code = '',  ownedAgentId, chiAgentId, chiAgentName, ownedAgentName } = props

   
    return (

        // ownedAgentId ? (
        <CssCart backgroundColor='#ffffff' height='50px' width='100%' margin='1px 0 0  0 ' border='solid 1px #f5f5f5' >
            <Flex padding='12px 8px' h='100%'  >
                <Flex w='90%'  >
                    <ItemTitleBold>
                        {code}
                    </ItemTitleBold>
                </Flex>

                {
                    ownedAgentId && !chiAgentName ? (
                        <Flex w='320px'>
                            <Center w=''>
                                <CssCart overflow='hidden' width='120px' height='25px' display='flex' justifyContent='center' alignContent='center' padding='1px 4px' margin='4px 0' border='1px #97a4ae solid' borderRadius='4px' color='#97a4ae'>
                                    {ownedAgentName}
                                </CssCart>
                            </Center>
                            <Center w='70px'>
                                <Text color='#949494'>
                                    已授权
                                </Text>
                            </Center>
                        </Flex>


                    ) :
                        ownedAgentId && !chiAgentId ? (
                            <Flex w='320px'>
                                <Center w=''>
                                    <CssCart overflow='hidden' width='120px' height='25px' display='flex' justifyContent='center' alignContent='center' padding='1px 4px' margin='4px 0' border='1px #97a4ae solid' borderRadius='4px' color='#97a4ae'>
                                        {chiAgentName}
                                    </CssCart>
                                </Center>
                                <Center w='70px'>
                                    <Text color='#949494'>
                                        已下发
                                    </Text>
                                </Center>
                            </Flex>
                        ) :
                            (
                                <Center h='100%' w='90px' >
                                    <Text color='#949494'>
                                        未使用
                                    </Text>
                                </Center>
                            )
                }
            </Flex>
        </CssCart>
        // ) : <></>


    )


}
