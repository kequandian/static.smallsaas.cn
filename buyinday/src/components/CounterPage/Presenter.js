import React from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box } from '@chakra-ui/react'
import Counter from 'zero-element-boot/lib/components/presenter/Counter'
import { getEndpoint } from 'zero-element-boot/lib/components/config/common';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ItemSubitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemSubitle';
import ItemAccent from 'zero-element-boot-plugin-theme/lib/components/text/ItemAccent';
import BackgroundImage from '@/components/presenter/backgroundImage';

const endpoint = getEndpoint()

/**
 *
 * @returns 
 * 
 */


export default function index(props) {

    const { onRemark, id, viewCount, name = '【烧卖：原味】', suggestedPrice = '14.9', unit = '包', weight, cover, callBackData } = props

    return (
        <Flex w='100%' h='100%' bg='' >
            <BackgroundImage backgroundImage={`url(${endpoint}${cover})`} />
            <Box w='100%' >
                <Flex w='100%' padding='0'>
                    <ItemTitle fontSize='14px'>
                        <>
                            {name} 约{weight}g
                        </>
                    </ItemTitle>

                    <ItemAccent fontSize='16px' width='30%' margin='12px 14px auto 14px' >
                        <>
                            已团{viewCount}
                        </>
                    </ItemAccent>
                </Flex>
                <Flex>

                    <ItemAccent  fontSize='18px' width='56%' justifyContent='flex-start' >
                        <>
                            ￥{suggestedPrice}/{unit}
                        </>
                    </ItemAccent>

                    <div onClick={onRemark} style={{
                        display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '6px 0 0 4px',
                        fontSize: '14px', height: '26px', width: '100%',
                    }}><Counter productId={id} callBackData={callBackData} /></div>

                </Flex>
            </Box>
        </Flex>
    )
}