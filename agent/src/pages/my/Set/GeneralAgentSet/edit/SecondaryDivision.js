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



//--设置修改页面
export default function index(props) {


    const queryData = useQuery(props)

    // console.log('queryData==', queryData);

    const [secondaryAgentPoint, setKeyValues] = useState(queryData.query.secondaryAgentPoint)

    const title = (queryData.query.text) ? ('设置二级代理团队预存款分成') : ('')

    function changeValue(e) {
        // console.log('change value = ', e.target.value)
        setKeyValues(e.target.value)
    }

    function updateName(query) {
        promiseAjax('/api/u/saasAgent/pointSetting/all', query, { method: "PUT" })
            .then(res => {
                // console.log(res, '== 更新222')
                if (res && res.code === 200) {
                    // getList()
                    // history.push('/my/ModifyAvatar')
                    // window.location.replace(document.referrer) 
                    history.go(-1)
                }
            })
    }
    function changName() {
        if (secondaryAgentPoint) {
            updateName({ secondaryAgentPoint })
        }
    }

    return (
        <ChakraProvider>
            <TopBar>
                {title}
            </TopBar>
            <div className='Global' />


            <Center w='100%' bg='' margin=' 0' padding='0 20px'>
                <from style={{ width: '90%' }} >
                    <CssCart background='#ffffff' margin='20px 0' boxShadow='0 1px 8px rgba(0, 0, 0, 0.08) ' padding='10px 10px 14px 10px'>
                        <input type='text' value={secondaryAgentPoint || ''}
                            style={{ border: '0', fontSize: '20px', width: '100%' }}
                            onChange={(e) => changeValue(e)}
                        />
                    </CssCart>
                    <Button w='100%' margin='' height='40px' colorScheme='telegram' variant='solid' onClick={() => changName()} type='submit' size='sm' >
                        保存
                    </Button>
                </from>
            </Center>

        </ChakraProvider>
    )


}
