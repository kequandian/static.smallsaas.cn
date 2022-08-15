import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import { Flex, Button, Text, Box, Spacer, Center, ChakraProvider } from '@chakra-ui/react'
// import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import promiseAjax from 'zero-element-boot/lib/components/utils/request';
import ReviseInput from '@/components/presenter/ReviseInput';
import { history } from 'umi';



//--设置修改页面
export default function index(props) {


    const queryData = useQuery(props)

    // console.log('queryData==', queryData);

    const [coChannel, setcoChannel] = useState(queryData.query.coChannel)
    const [coUserId, setcoUserId] = useState(queryData.query.coUserId)
    const id = queryData.query.id
    const title = '修改渠道编码'


    function changeValue() {
        const queryDatas = {
            coChannel, coUserId,
        }
        console.log('queryDatas ==', queryDatas)
        promiseAjax(`/api/u/saasAgent/channel/${id}`, queryDatas, { method: "PUT" })
            .then(res => {
                if (res && res.code === 200) {
                    history.go(-1)
                }
            })
    }
    function changCoChannel(e) {
        setcoChannel(e.target.value)
        console.log('value ==', e.target.value)
    }
    function changCoUserId(e) {
        setcoUserId(e.target.value)
        console.log('value ==', e.target.value)

    }

    return (
        <ChakraProvider>
            <TopBar>
                {title}
            </TopBar>
            <div className='Global' />


            <Center w='100%' bg='' margin=' 0' padding='0 '>
                <from style={{ width: '90%' }} >
                    <Flex margin='40px 0 0 0' w='100%'>
                        <Center w='90px'>
                            <ItemTitleBold>订单来源</ItemTitleBold>
                        </Center>
                        <CssCart background='#ffffff' boxShadow='0 1px 8px rgba(0, 0, 0, 0.08) ' padding='10px 10px 14px 10px' width='100%'>
                            <input type='text' value={coChannel || ''}
                                style={{ border: '0', fontSize: '20px', width: '100%' }}
                                onChange={(e) => changCoChannel(e)}
                            />
                        </CssCart>
                    </Flex>
                    <Flex margin='0' w='100%'>
                        <Center w='90px'>
                            <ItemTitleBold>用户id</ItemTitleBold>
                        </Center>
                        <CssCart background='#ffffff' margin='20px 0' boxShadow='0 1px 8px rgba(0, 0, 0, 0.08) ' padding='10px 10px 14px 10px ' width='100%'>
                            <input type='text' value={coUserId || ''}
                                style={{ border: '0', fontSize: '20px', width: '100%' }}
                                onChange={(e) => changCoUserId(e)}
                            />
                        </CssCart>
                    </Flex>
                    <Center position='absolute' left='' bottom='20px' w='100%'>
                        <Button w='200px' margin='auto' height='40px' colorScheme='telegram' variant='solid' onClick={() => changeValue()} type='submit' size='sm' >
                            保存
                        </Button>
                    </Center>

                </from>
            </Center>

        </ChakraProvider>
    )


}
