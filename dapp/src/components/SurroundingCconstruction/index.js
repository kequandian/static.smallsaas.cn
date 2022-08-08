import React from 'react';
import Detail from './Detail';
import { Center, Spacer } from '@chakra-ui/layout';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';


/**
 * 周边工建整个item
 * 
 * @param {items} items 数据
 * 
 */


export default function index(props) {

    const { detail } = props
    console.log('props ==', props);

    return detail && detail.map((item, i) => (
        <>
            <Center w='50px'>
                <ItemTitleBold>
                    {detail[i].cnName}
                </ItemTitleBold>
            </Center>
            <Detail  {...item} key={i} />
            <Spacer borderBottom='0px dashed #d6d3d3' />
        </>

    )


    )

}