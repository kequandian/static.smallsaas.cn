import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack,Center } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Avatar from 'zero-element-boot/lib/components/presenter/Avatar'
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ItemSubitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemSubitle';
import Container from 'zero-element-boot/lib/components/container/Container'

/**
 * 
 * @param {title} title 标题、名字
 * @param {subtitle} subtitle 副标题
 * @param {avatar} avatar 头像
 * 
 */
export default function index(props) {

    const { children, title='', subtitle='', avatar ,size='60px'  } = props

    return React.Children.map(children, child => {
        return (
            <CssCart width='' height='' backgroundColor='' padding=''>
               <Container>
                <Flexbox direction='row'  align='start-with-last-end' >
                    <Flexbox justify='center' direction='row' align='center' >
                        <Stack>
                            <Avatar size={size} url={avatar} />
                        </Stack>
                        <Stack>
                            <ItemTitle>
                                {title}
                            </ItemTitle>
                            <ItemSubitle>
                                {subtitle}
                            </ItemSubitle>
                        </Stack>
                    </Flexbox>

                    <Center h='100%' w='100%'>
                        {child}
                    </Center>
                </Flexbox>
                </Container>
            </CssCart>
        )

    })
}
