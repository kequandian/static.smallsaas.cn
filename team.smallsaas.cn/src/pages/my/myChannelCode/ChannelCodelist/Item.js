import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Box } from '@chakra-ui/react'
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

    const { icon = '', code = '', agentName, navigation, nextIcon = '', ownedAgentID = '', space = '16px', ownedAgentId, chiAgentId, chiAgentName, ownedAgentName } = props

    // console.log('props === ', props)


    // const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)


    function onnextClick() {
        history.push('/my/myChannelCode/AuthorizedAgent')
    }

    // const api = '/api/u/saasAgent/myAgentInfo'
    // const [data] = useTokenRequest({ api });

    return (

        // ownedAgentId ? (
        <CssCart backgroundColor='#ffffff' height='52px' width='100%' margin='1px 0 0  0 ' border='solid 1px #f5f5f5' >
            <Flex padding='12px 8px' h='100%'  >
                <Flex w='90%'  >
                    <ItemTitleBold>
                        {code}
                    </ItemTitleBold>
                </Flex>

                {
                    ownedAgentId && !chiAgentName ? (
                        <Center w='300px' h='100%' padding='' borderRadius='10px' overflow="hidden" >
                            <Flex>
                                <CssCart width='120px' height='25px' display='flex' justifyContent='center' alignContent='center' padding=' 0 4px' margin='4px 0' border='1px #97a4ae solid' borderRadius='4px' color='#97a4ae'>
                                    {ownedAgentName}
                                </CssCart>
                                <ContainerInactiveTitle>
                                    已授权
                                </ContainerInactiveTitle>
                            </Flex>
                        </Center>

                    ) :
                        ownedAgentId && !chiAgentId ? (
                            <Center w='300px' h='100%' padding='' borderRadius='10px' overflow="hidden" >
                                <Flex>
                                    <CssCart height='25px' display='flex' justifyContent='center' alignContent='center' padding=' 0 4px' margin='4px 0' border='1px #97a4ae solid' borderRadius='4px' color='#97a4ae'>
                                        {chiAgentName}
                                    </CssCart>
                                    <ContainerInactiveTitle>
                                        已下发
                                    </ContainerInactiveTitle>
                                </Flex>
                            </Center>

                        ) :
                            (
                                <Center h='100%' w='90px' onClick={onnextClick}>
                                    {/* <TagIndicator solid >
                                        授权代理
                                    </TagIndicator> */}
                                    <CssCart height='25px' display='flex' justifyContent='center' alignContent='center' padding=' 0 4px' margin='4px 0' border='px #97a4ae solid' backgroundColor='#8e72ff' borderRadius='4px' color='#ffffff'>
                                        授权代理
                                    </CssCart>
                                </Center>
                            )
                }
            </Flex>
        </CssCart>
        // ) : <></>


    )


}
