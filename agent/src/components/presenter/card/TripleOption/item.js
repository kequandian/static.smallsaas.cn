import React, { useState } from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import { Flex, Box, Center } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
require('./index.less');

const colorMap = {
    'TERTIARY_AGENT': 'TertiaryAgent',
    'SECONDARY_AGENT': 'SecomdaryAgent',
    "null": 'Unauthorized',
}

/**
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { id, defaultValue, callBack, name = '',  value = '',bg='', color = '', size = 30 } = props
    // const [names, setNames] = useState(value)

    let ref = React.createRef()

    function onClick(e) {
        // setNames(e.target.name)
        // console.log('onClickName = ', e.target.name)
        if(callBack){
            callBack(id, e.target.name)
        }
        // ref.current.style.backgroundColor = '#ffffff'
    }
    return (

        <CssCart padding='' margin='0 1px' linewidth='0'  background='#ffffff'>
             {/* <Center padding='4px 20px' bg={bg} >{name} </Center> */}
            <input className={defaultValue == value ? `${colorMap[defaultValue]}`: 'default'}
            //   ref={ref}
              type='button' 
              value={name}
              name={value}
              style={{ 
                    // color: `${color}`,
                    padding: '4px 10px', 
                    fontSize: `${0.4 * size}px`,
                    width: `${3 * size} px`, 
                    height: `${size} px` ,
                    background:`${bg}`
                }} 
              onClick={(e) => onClick(e)} />
         </CssCart>


    )



}