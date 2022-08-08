import React from 'react';
import { Flex, Center } from '@chakra-ui/react'
import Item from './item';

/**
 * 
 * @param {options} options 数据
 * @param {size} size 大小（传数字）
 * 
 options={[{ "value": "null", "name": "无效" },{ "value": "SECONDARY_AGENT", "name": "三级" },{...}]}
 * 
 */
export default function index(props) {

    const { defaultValue, defaultStatus, options, callBack, id,size } = props

    return (

        <Center>
            <Flex>
                {
                    options && options.map((item, i) => (
                        <Item id={id} callBack={callBack} defaultValue={defaultValue} defaultStatus={defaultStatus}  {...item} key={i} size={size} />
                    )
                    )
                }
            </Flex>
        </Center>


    )



}