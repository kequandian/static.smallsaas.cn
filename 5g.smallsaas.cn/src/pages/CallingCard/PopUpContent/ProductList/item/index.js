import React, { useState, useEffect } from 'react';
import { Flex, Box, Spacer, ChakraProvider, Text, Center, Stack } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';

export default function index(props) {

    const { onProductClick, numList = [], cb, pageList, name, goodsId, selectGoodsId, flow,url } = props;

    useEffect(_ => {
        // callBackData()
    }, [])

    return (
        name ?
            <Stack border='1px solid #33333320' spacing='0' w='100%' >
                <Flex onClick={() => onProductClick(goodsId)}>
                    <Center h='36px' w='280px' margin=' 0 ' >
                        <Text fontSize='16px'> {name}</Text>
                    </Center>
                    <Center w='50px' >
                        {selectGoodsId == goodsId ?
                            (
                            <svg t="1660731214614" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="101115" width="26" height="26"><path d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z" fill='#6558f5' p-id="101116"></path></svg>
                            ) : (
                                <svg t="1663741429093" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2573" width="26" height="26"><path d="M510.44304 940.315042c-237.326197 0-430.396447-193.21249-430.396447-430.695253 0-237.502206 193.07025-430.717765 430.396447-430.717765 237.303684 0 430.40668 193.236026 430.40668 430.717765C940.84972 747.101529 747.791749 940.315042 510.44304 940.315042zM510.44304 124.414591c-212.213239 0-384.861368 172.782182-384.861368 385.182686 0 212.403574 172.647105 385.161197 384.861368 385.161197 212.224496 0 384.870578-172.782182 384.870578-385.161197C895.314641 297.196773 722.667535 124.414591 510.44304 124.414591z" p-id="2574" fill="#bfbfbf"></path></svg>
                            )
                        }
                    </Center>
                </Flex>

                {selectGoodsId == goodsId ?
                    (
                        <Flex w='100%' >
                            <Center h='' w='100%' margin=' 0 ' padding='0 10px ' >
                                <a href={url} target='_blank' style={{fontSize:'18px' ,color:'#ff0704'}} >
                                    {flow}
                                </a>
                            </Center>
                        </Flex>

                    ) : (
                        <></>
                    )
                }
            </Stack>


            : <></>

    )
}