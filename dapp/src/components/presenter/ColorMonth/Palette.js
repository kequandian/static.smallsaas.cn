import React from 'react';
import PageCart from 'zero-element-boot/lib/components/cart/PageCart';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Text, VStack, Spacer, ChakraProvider, Center } from '@chakra-ui/react'

// import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import { history } from 'umi';

/**
 * 
 * 
 */


export default function Index(props) {

    const { hightlight, light, red1,red2,red3,red4,red, dark,
         name, orange, DarkGreen, Green, DarkGrey } = props;




    return (
        <ChakraProvider>
            <Flex margin='20px 0'>
                < Center w='120px' h='76%'>
                    <Text fontSize='3xl'>{name}</Text>
                </Center>
                <VStack >
                    <Box w='80px' h='80px' bg={hightlight} margin='' />
                    < Center w='120px'>
                        <Text fontSize='xl'>{hightlight}</Text>
                    </Center>
                </VStack>
                <VStack >
                    <Box w='80px' h='80px' bg={light} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{light}</Text>
                    </Center>
                </VStack>
                <VStack >
                    <Box w='80px' h='80px' bg={orange} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{orange}</Text>
                    </Center>
                </VStack>
                <VStack >
                    <Box w='80px' h='80px' bg={DarkGreen} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{DarkGreen}</Text>
                    </Center>
                </VStack>

                <VStack >
                    <Box w='80px' h='80px' bg={Green} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{Green}</Text>
                    </Center>
                </VStack>

                <VStack >
                    <Box w='80px' h='80px' bg={DarkGrey} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{DarkGrey}</Text>
                    </Center>
                </VStack>
             
                <VStack >
                    <Box w='80px' h='80px' bg={red1} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{red1}</Text>
                    </Center>
                </VStack>
                
                <VStack >
                    <Box w='80px' h='80px' bg={red2} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{red2}</Text>
                    </Center>
                </VStack>
                
                <VStack >
                    <Box w='80px' h='80px' bg={red3} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{red3}</Text>
                    </Center>
                </VStack>
                
                <VStack >
                    <Box w='80px' h='80px' bg={red4} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{red4}</Text>
                    </Center>
                </VStack>
                
                <VStack >
                    <Box w='80px' h='80px' bg={red} />
                    < Center w='120px'>
                        <Text fontSize='xl'>{red}</Text>
                    </Center>
                </VStack>


            </Flex>

        </ChakraProvider>
    )
}