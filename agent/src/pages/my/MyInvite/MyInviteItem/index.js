import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Cart from 'zero-element-boot/lib/components/cart/Cart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from '@/components/text/ItemTitleBold';
import ItemTitle from '@/components/text/ItemTitle';
import ItemSubitle from '@/components/text/ItemSubitle';
import Avatar from '@/components/presenter/Avatar'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import Switch from '../../Switch'
import ItemAccent from 'zero-element-boot-plugin-theme/lib/components/text/ItemAccent';
import ItemTag from '@/components/text/ItemTag';
import AvatarCard from '@/components/presenter/card/AvatarCard';


/**
 * 
 * @param {icon} icon 图片
 * 
 */

export default function index(props) {

    const { level, status, icon = '', name = '', space = '16px', phone = '' } = props



    return (
        (!space || name) ? (
            <CssCart backgroundColor='#f7f9fa' height='72px' width='100%' margin='1px 0 0  0 ' padding='2px' >
                <>
                    <Flex  >
                        <AvatarCard size='30px' Avatar={icon} title={name} subtitle={phone} >
                            {/* <Switch status={status} /> */}

                            <Center h='100%' margin='auto'>
                                {level === 'SECONDARY_AGENT' ?
                                    (
                                        <CssCart width='80px' height='30px' backgroundColor=''>
                                            <Flex h='100%'>
                                                <CssCart width='40px' height='40px' margin='2px'>
                                                    <ItemTag solid color='#c0c0c0'>
                                                        <ItemSubitle>
                                                            二级
                                                   </ItemSubitle>
                                                    </ItemTag>
                                                </CssCart>
                                                <CssCart width='40px' margin='2px'>
                                                    <ItemTag outline none color='#2080f0'>
                                                        <ItemSubitle>
                                                            三级
                                            </ItemSubitle>
                                                    </ItemTag>
                                                </CssCart>
                                            </Flex>

                                        </CssCart>

                                    ) : level === 'TERTIARY_AGENT' ? (
                                        <CssCart width='80px' backgroundColor=''>
                                            <Flex>
                                                <CssCart width='40px' margin='2px'>
                                                    <ItemTag outline none color='#e16683'>
                                                        <ItemSubitle>
                                                            二级
                                                </ItemSubitle>
                                                    </ItemTag>
                                                </CssCart>
                                                <CssCart width='40px' margin='2px'>
                                                    <ItemTag outline none color='#c0c0c0'>
                                                        <ItemSubitle>
                                                            三级
                                                    </ItemSubitle>
                                                    </ItemTag>
                                                </CssCart>
                                            </Flex>

                                        </CssCart>
                                    ) :
                                        (<>
                                            <CssCart width='80px' backgroundColor=''>
                                                <Flex>
                                                    <CssCart width='40px' margin='2px'>
                                                        <ItemTag outline none color='#c0c0c0'>
                                                            <ItemSubitle>
                                                                二级
                                                </ItemSubitle>
                                                        </ItemTag>
                                                    </CssCart>
                                                    <CssCart width='40px' margin='2px'>
                                                        <ItemTag outline none color='#c0c0c0'>
                                                            <ItemSubitle>
                                                                三级
                                                    </ItemSubitle>
                                                        </ItemTag>
                                                    </CssCart>
                                                </Flex>

                                            </CssCart>

                                        </>
                                        )
                                }

                            </Center>
                        </AvatarCard>

                    </Flex>
                </>
            </CssCart>
        ) : (
                <>
                </>

            )




    )


}


{/* {level === 'SECONDARY_AGENT' ?
                                    (

                                        < div style={{ borderRadius: '8px', height: '18px', width: '39px', backgroundColor: '#c4bdaf', margin: ' 0 0 0 1px' }} >
                                            <ItemSubitle>
                                                三级
                            </ItemSubitle>
                                        </div>

                                    ) : level === 'TERTIARY_AGENT' ? (
                                        < div style={{ borderRadius: '8px', height: '18px', width: '39px', backgroundColor: '#8dd7cf' }} >
                                            <ItemSubitle>
                                                二级
                            </ItemSubitle>
                                        </div>

                                    ) :
                                        (<> < div style={{ borderRadius: '8px', height: '18px', width: '50px', backgroundColor: '#dfe6ed' }} >
                                            <ItemSubitle>
                                                未授权
                            </ItemSubitle>
                                        </div>

                                        </>
                                        )
                                } */}