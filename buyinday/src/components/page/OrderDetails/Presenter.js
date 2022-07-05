import React from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box } from '@chakra-ui/react'
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';

/**
 *
 * @returns 
 */


export default function index(props) {

    const { productCount = '2', suggestedPrice = '344', name = '针织衫', OrderNumber = 'AXPFDS4532466540009' } = props

    return (
        <Box w='100%' bg='#' >
            <Cart fill='' linewidth='0' margin='2px 10px' >
                <Flex>
                    <Box w='50%'  borderBottom='1px #f5f5f5 solid'>
                        <div style={{ margin: '-20px 0 0 0', padding: '0 0 6px 0' }}>
                            <ItemTitle fontSize='14px' width='56%'  >
                                {name}
                            </ItemTitle>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            // borderBottom: '1px #f5f5f5 solid',
                            margin: '0',
                            padding: '0 4px 10px 0'
                        }}>
                            <ContainerInactiveTitle><>订单编号：{OrderNumber}</></ContainerInactiveTitle>
                        </div>

                    </Box>

                    <Box w='50%'   borderBottom='1px #f5f5f5 solid'>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            margin: '-10px 0 0 0',
                            padding: '0 0 6px 0'
                        }}>
                            <ItemTitle fontSize='14px' width='56%'  >
                                ￥{suggestedPrice}
                            </ItemTitle>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            // borderBottom: '1px #f5f5f5 solid',
                            padding: '0 6px 10px 0'

                        }}>
                            <ContainerInactiveTitle>
                                x{productCount}
                            </ContainerInactiveTitle>
                        </div>

                    </Box>
                </Flex>
            </Cart>
        </Box>
    )
}