import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, ChakraProvider, Center, Progress } from '@chakra-ui/react'
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { history } from 'umi';

/**
 * 
 */

// --话费分成设置item
export default function index(props) {

    const { children, name = '', point = '', id = '' } = props

    function onClick() {
        history.push(`/my/Set/GeneralAgentSet/edit/pointSetting?point=${point}&title=${name}&id=${id}`)

    }

    return (
        <CssCart backgroundColor='#ffffff' height='40px' width='100%' padding='8px 20px' margin='0' >
            <>
                <Flex>
                    <Flex w='100%' bg=''>
                        <ItemTitle>
                            {name}
                        </ItemTitle>
                    </Flex>
                    <Center>
                        <Progress h='10px' w='200px' size='md' value={point} />
                    </Center>
                    <Flex w='30px' margin='0 0 0 2px' onClick={() => {onClick()}}>
                        <ItemTitle>
                            {point || '0'}%
                        </ItemTitle>
                    </Flex>
                </Flex>
            </>
        </CssCart>
    )

}




