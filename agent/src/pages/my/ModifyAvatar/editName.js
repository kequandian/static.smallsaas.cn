import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import { Flex, Button, Box, Spacer, Center, ChakraProvider } from '@chakra-ui/react'
// import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import promiseAjax from 'zero-element-boot/lib/components/utils/request';
import ReviseInput from '@/components/presenter/ReviseInput';
import { history } from 'umi';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';



//--设置修改页面
export default function index(props) {


    const api = '/api/u/saasAgent/myAgentInfo'

    const [data] = useTokenRequest({ api });
    const queryData = useQuery(props)


    const names = (data && !Array.isArray(data)) ? data.name : ''


    const [name, setKeyValues] = useState()

    useEffect(_ => {
        setKeyValues(names)
    }, [names])

    const title = (queryData.query.text) ? ('修改名字') : ('')

    function changeValue(e) {
        // console.log('change value = ', e.target.value)
        setKeyValues(e.target.value)
    }

    function back() {
        window.history.back()
    }

    function updateName(query) {
        promiseAjax('/api/u/user/accounts/updateUserInfo', query, { method: "PUT" })
            // promiseAjax('/api/u/fs/uploadfile', query, { method: "PUT" })
            .then(res => {
                console.log(res, '== 更新')
                if (res && res.code === 200) {
                    back()
                }
            })
    }

    function changName() {
        if (name) {
            updateName({ name })

        }
    }
    // console.log(data && !Array.isArray(data))

    return (
        (data && !Array.isArray(data)) ?
            (<ChakraProvider>
                <TopBar>
                    {title}
                </TopBar>
                <div className='Global' />


                <Center w='100%' bg='' margin=' 0' padding='0 20px'>
                    <from style={{ width: '90%' }} >
                        <CssCart background='#ffffff' margin='20px 0' boxShadow='0 1px 8px rgba(0, 0, 0, 0.08) ' padding='10px 10px 14px 10px'>
                            <input type='text' value={name || ''}
                                style={{ border: '0', fontSize: '20px', width: '100%' }}
                                onChange={(e) => changeValue(e)}
                            />
                        </CssCart>
                        <Button w='100%' margin='' height='40px' colorScheme='telegram' variant='solid' onClick={() => changName()} type='submit' size='sm' >
                            保存
                         </Button>
                    </from>
                </Center>

            </ChakraProvider>) : <></>
    )


}
