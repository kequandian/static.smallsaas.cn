import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Progress } from '@chakra-ui/react'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';

/**
 * 
 */

 // --话费分成设置item
export default function index(props) {

    const { children, name = '', point = '' } = props


    return (
        <CssCart backgroundColor='#f7f9fa' height='30px' width='100%' padding='4px' margin='1px 0 0  0 ' >
            <>
                <Flex>
                    <Flex w='100%' bg=''>
                        <PrimarySubtitle>
                            {name}
                        </PrimarySubtitle>
                    </Flex>
                    <Center>
                        <Progress h='10px' w='200px'  size='md' value={point} />
                    </Center>
                    <Flex w='30px' margin='0 0 0 2px'>
                        <PrimarySubtitle>
                            {point}%
                </PrimarySubtitle>
                    </Flex>
                </Flex>
            </>
        </CssCart>

    )

}




