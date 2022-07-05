import React from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box } from '@chakra-ui/react'
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';

/**
 *
 * @returns 
 */


export default function index(props) {

    const { TotalAmount = '124', time = '2022-06-29', productCount = '4', OrderNumber = 'AXPFDS4532466540009' } = props

    return (
        <Box w='100%' border='' >
            <Cart fill='#ffffff' linewidth='0' margin='2px 10px' >
                <>
                    <div style={{ borderBottom: '1px #f5f5f5 solid', margin: '0 0 8px 0', padding: '0 0 6px 0' }}>
                        <ItemTitle fontSize='18px' width='56%' justifyContent='flex-start' >
                            订单编号
                    </ItemTitle>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        // borderTop: '1px #f5f5f5 solid',
                    }}>
                        <ContainerInactiveTitle><>订单编号：{OrderNumber}</></ContainerInactiveTitle>
                    </div>
                    <Flex>
                        <div style={{
                            // border: '1px #f5f5f5 solid',
                            width: '260px',
                            height:'20px',
                            margin:'12px 0',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                            <ContainerInactiveTitle margin='0' fontSize='12px'><>购买时间：{time}</></ContainerInactiveTitle>
                        </div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                            <Flex>
                                <PrimarySubtitle color='#000000' fontSize='12px' margin='12px 0 14px 24px'><>共{productCount}件，合计</></PrimarySubtitle>
                                <PrimaryTitle fontSize='12px' margin='12px 0 14px 4px'>
                                    ￥
                                  </PrimaryTitle>

                                <PrimaryTitle fontSize='20px' margin='6px 0 14px 0px'>
                                    {TotalAmount}
                                </PrimaryTitle>
                            </Flex>
                        </div>
                    </Flex>
                </>
            </Cart>
        </Box>
    )
}