import React from 'react';
import Detail from './Detail';
import { Center, Flex, Spacer } from '@chakra-ui/layout';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';


/**
 * 周边工建整个item
 * 
 * @param {items} items 数据
 * 
 */


export default function index(props) {

    const { detail } = props
    // console.log('props ==', props);

    return detail && detail.map((item, i) => (
        <>
           
            <Flex h='100%'>
                <Center bg='#f0f0f0' borderRadius='50%' padding='2px' w='32px' h='32px' marginRight='4px'>
                    <img src={detail[i].icon} width='20px' />
                </Center>
                <Center>
                    <Detail  {...item} key={i} />
                </Center>
            </Flex>
            {/* <Spacer borderBottom='1px dashed #d6d3d3' /> */}
        </>

    )


    )

}