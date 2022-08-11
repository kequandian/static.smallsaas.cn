import React, { useState, useEffect } from 'react';
import { Flex, Box, Spacer, ChakraProvider, Text, Center } from '@chakra-ui/react'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import ItemCart from '@/components/presenter/ItemCart'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';

export default function index(props) {

    const { onNumberClick, numList = [], cb, pageList, resetPageList } = props;

    let newList = [], newItem = [];

    numList.map((num, index) => {
        newItem.push(num)
        if (index % 12 == 11) {
            newList.push(newItem)
            newItem = []
        }
    });

    let showList = [];
    newList.map((item, index) =>{
        if(pageList.includes(index)){
            showList.push(item)
        }
    })

    if(showList.length == 0){
        resetPageList()
    }

    // console.log('showList == ', showList)

    // function callBackData() {
    //     if (cb) {
    //         cb(numList)
    //     }
    // }

    // console.log('numList ==', numList);
    // console.log('newList ==', newList);

    useEffect(_ => {
        // callBackData()
    }, [])

    return (
        <div style={{
            overflow: "hidden", display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridRowgap: '2px', gridColumnGap: '2px',
            width: '100%', height: '', padding: '0'
        }}>
            {
                showList && showList.length > 0 && showList.map((item, index) => (
                    (<>
                        <CssCart border='0 solid #f5f5f5' padding='10px 4px' margin='8px 2px' boxShadow='0 0px 4px rgba(0, 0, 0, 0.12)' key={index}>
                            <>
                                <div style={{ width: '', border: '0px solid #ff0000', height: '30px', margin: '6px ' }} onClick={() => onNumberClick(item)} >
                                    <Text fontSize='24px'> {item[0]}</Text>
                                </div>
                                <Container>
                                    <Flexbox direction='row' align='start-with-last-end' w='100%'>
                                        <Text fontSize='14px' color='#aaaaaa' as='del'>￥99</Text>
                                        <Text fontSize='14px' color='#ff0704' onClick={() => onNumberClick(item)}>免费领取</Text>
                                    </Flexbox>
                                </Container>
                            </>
                        </CssCart>
                    </>)
                ))
            }
        </div>

    )
}