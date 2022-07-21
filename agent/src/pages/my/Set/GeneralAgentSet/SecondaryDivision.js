import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { Flex, Box, Spacer,Center, ChakraProvider } from '@chakra-ui/react'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'



//--设置修改页面
export default function index(props) {

    const {title, navigation, percentage} =props

    const queryData = useQuery(props)

    const [ secondaryAgentPoint, setSecondaryAgentPoint] = useState(queryData.query.secondaryAgentPoint)


    function changeValue(e){
        // console.log('change value = ', e.target.value)
        setSecondaryAgentPoint(e.target.value)
    }   

    function onOk(){
        //TODO

    }

    return (
        <>
        <CssCart margin='20px' boxShadow='0 2px 8px rgba(0, 0, 0, 0.04) ' padding= '10px 10px 20px 10px'>
            <>
                <Center>
                    <ItemTitle backgroundColor>
                        设置二级代理团队分成
                    </ItemTitle>
                </Center>
                <Center w='100%' bg='' margin='10px 0 0 0'> 
                    <from   style={{width:'90%'}} >
                        <input type='text' value={secondaryAgentPoint}
                         style={{border:'0' ,fontSize:'20px', fontWeight:'', borderBottom:'1px solid #8dd7cf',width:'100%'}}  
                         onChange={(e)=>changeValue(e)}
                         />
                    </from>
                </Center>
              
            </>
       </CssCart>
        <Center margin='10px 30px'>
          <Button solid color='#3ec4a0' navigation={`/my/Set/GeneralAgentSet?secondaryAgentPoint=${secondaryAgentPoint}`}>保存</Button>
        </Center>
</>
    )


}
