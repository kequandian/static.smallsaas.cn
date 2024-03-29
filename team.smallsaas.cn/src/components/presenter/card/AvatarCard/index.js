import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack,Center } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Avatar from 'zero-element-boot/lib/components/presenter/Avatar'
import Round from 'zero-element-boot/lib/components/layout/Round';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import Container from 'zero-element-boot/lib/components/container/Container'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import { getEndpoint, getToken } from 'zero-element-boot/lib/components/config/common';


/**
 * 
 * @param {title} title 标题、名字
 * @param {subtitle} subtitle 副标题
 * @param {avatar} avatar 头像
 * 
 */



export default function index(props) {

    const { children, title='', subtitle='', avatar ,size='60px' ,navigation } = props


    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)

    const path = () => {
        history.push(queryData)
        
    }

    const endpoint = getEndpoint()
    
    const urls= avatar? (endpoint+avatar):''

    const onnextClick = navigation ? path : null

    return React.Children.map(children, child => {
        return (
            <CssCart width='100%' height='' backgroundColor='' padding='6px'>
               <Container>
                <Flexbox direction='row'  align='start-with-last-end' >
                    <Flexbox justify='center' direction='row' align='center' >
                        <Stack onClick={()=>{onnextClick()}} >
                            <Avatar size={size} url= {urls} />
                        </Stack>
                        <Stack  onClick={()=>{onnextClick()}} >
                            <ItemTitleBold>
                                {title}
                            </ItemTitleBold>
                            <ItemTitle>
                                {subtitle}
                            </ItemTitle>
                        </Stack>
                    </Flexbox>

                    <Center h='100%' w=''>
                        {child}
                    </Center>
                </Flexbox>
                </Container>
            </CssCart>
        )

    })
}
