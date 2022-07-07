import React from 'react';
import PageCart from 'zero-element-boot/lib/components/cart/PageCart';
import { Flex, Box, Text, VStack, Spacer, ChakraProvider, Center } from '@chakra-ui/react'

import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import { history } from 'umi';

/**
 * 
 * 
 */


export default function Index(props) {

    const { palette } = props;

    const hightlight = palette[0]
    const light = palette[1][0]
    const lightdark = palette[1][1]
    const dark = palette[1][2]




    return (
        <ChakraProvider>
            <PageCart  >
                <VStack >
                    <Flex >
                        <Box w='150px' h='150px' bg={hightlight} margin=''/>
               

                        < Center w='150px'>
                            <Text fontSize='3xl'>{hightlight}</Text>
                        </Center>
                    </Flex>

                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Spacer />
                    <Spacer />

                    <Flex >
                        <Box w='150px' h='150px' bg={light} />
                        < Center w='150px'>
                            <Text fontSize='3xl'>{light}</Text>
                        </Center>
                    </Flex>
                    <Flex >
                        <Box w='150px' h='150px' bg={lightdark} />
                        < Center w='150px'>
                            <Text fontSize='3xl'>{lightdark}</Text>
                        </Center>
                    </Flex>
                    <Flex>
                        <Box w='150px' h='150px' bg={dark} />
                        < Center w='150px'>
                            <Text fontSize='3xl'>{dark}</Text>
                        </Center>
                    </Flex>

                </VStack>
            </PageCart>
        </ChakraProvider>
    )
}