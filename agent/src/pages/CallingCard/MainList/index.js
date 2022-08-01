import React, { useState, useEffect } from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Item from './config'
import { Flex, Box, Spacer, ChakraProvider, Text, Center, InputGroup, Input, InputRightElement, CheckIcon } from '@chakra-ui/react'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import ItemCart from '@/components/presenter/ItemCart'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import Search from '@/pages/login/image/Search'

export default function Container(props) {

    const { address = '广东', onNumberClick, } = props;

    // const onHandleNumberClick = (NumberClick) => {
    //     console.log('NumberClick == ', NumberClick)
    // }


    const [max, setMax] = useState(119)
    const [min, setMin] = useState(0)
    const [numList, setNumList] = useState([])


    function ChangeBatch() {
        if (max <= numList.length) {
            setMax( max + 120)
            setMin( min + 120)
        } if (max > numList.length) {
            setMax( max = 119)
            setMin( min = 0)
        }

        console.log('max===', max)
        console.log('min===', min)
    }


    function cb(numList) {
        if (numList) {
            setNumList(numList)
            console.log('numList ==', numList);
        }
    }


    return (
        <ChakraProvider>
            <Cart fill='#465bce' padding='18px 10px 10px 10px'>
                <Text color='#ffffff'>归属地：{address}</Text>
            </Cart>
            <PageModuleContainer>
                <>
                    <Flex>
                        <Text w='100%' fontSize='18px'> 请选择你的心仪号码</Text>
                        <InputGroup size='sm' w='300px'>
                            <Input type='tel' placeholder='请输入你的幸运数字' />
                            <InputRightElement children={<Search color='green.500' />} />
                        </InputGroup>
                    </Flex>

                    <Item cb={cb} onNumberClick={onNumberClick} max={max} min={min} />

                </>
            </PageModuleContainer>

            <Center onClick={() => ChangeBatch()}>
                <CssCart width='100%' padding='0 20px' position='fixed' bottom='8px'>
                    <Button color='#0088cc' solid onAtion >换一批
                        <Center margin='0 0 0 4px' >
                            <svg t="1659145430699" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12765" width="22" height="22"><path d="M230.684444 230.684444a398.222222 398.222222 0 0 1 589.937778 28.444445L682.666667 398.222222h341.333333V56.888889l-122.595556 122.595555A512 512 0 0 0 13.084444 398.222222h116.906667a391.68 391.68 0 0 1 100.693333-167.537778zM793.315556 793.315556a398.222222 398.222222 0 0 1-589.937778-28.444445L341.333333 625.777778H0v341.333333l122.595556-122.595555A512 512 0 0 0 1010.915556 625.777778h-117.475556a395.093333 395.093333 0 0 1-100.124444 167.537778z" fill='#ffffff' p-id="12766"></path></svg>
                        </Center>
                    </Button>
                </CssCart>
            </Center>
        </ChakraProvider>
    )
}