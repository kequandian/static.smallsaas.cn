import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import { Flex, Box, Spacer, Center, ChakraProvider } from '@chakra-ui/react'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import promiseAjax from 'zero-element-boot/lib/components/utils/request';



//--设置修改页面
export default function index(props) {


    const queryData = useQuery(props)
    console.log('queryData==', queryData);

    const [secondaryAgentPoint, setSecondaryAgentPoint] = useState(queryData.query.secondaryAgentPoint)


    function changeValue(e) {
        // console.log('change value = ', e.target.value)
        setSecondaryAgentPoint(e.target.value)
    }

  


    
    function updateLevel(id, query) {
        promiseAjax('/api/u/saasAgent/pointSetting/all', query, { method: "PUT" })
            .then(res => {
                console.log(res, '== 更新')
                if (res && res.code === 200) {
                    getList()
                }
            })
    }

    function cb(id, level) {
        // console.log('id = ', id)
        // console.log('level = ', level)
        if (id && level) {
            updateLevel(id, { level })
        }
    }


    return (
        <TopBar>
            <>
                <Center h='40px'>
                    <ItemTitleBold backgroundColor>
                        设置二级代理团队分成
                    </ItemTitleBold>
                </Center>
                <CssCart margin='20px 20px' boxShadow='0 1px 8px rgba(0, 0, 0, 0.08) ' padding='10px 10px 20px 10px'>
                    <Center w='100%' bg='' margin='10px 0 0 0'>
                        <from style={{ width: '90%' }} >
                            <input type='text' value={secondaryAgentPoint || ''}
                                style={{ border: '0', fontSize: '20px', fontWeight: '', borderBottom: '1px solid #8dd7cf', width: '100%' }}
                                onChange={(e) => changeValue(e)}
                            />
                        </from>
                    </Center>
                </CssCart>
                <Center margin='10px 30px'>
                    <Button solid color='#3ec4a0' navigation={`/my/Set/GeneralAgentSet?secondaryAgentPoint=${secondaryAgentPoint || ''}`}>保存</Button>
                </Center>
            </>
        </TopBar>
    )


}
