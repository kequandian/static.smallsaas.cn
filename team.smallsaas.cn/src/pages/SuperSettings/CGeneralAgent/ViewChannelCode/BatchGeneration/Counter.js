import React, { useState } from 'react';
import DotDashButton from 'zero-element-boot/lib/components/presenter/button/DotDashButton'
import DotPlusButton from 'zero-element-boot/lib/components/presenter/button/DotPlusButton'
import { Flex } from "@chakra-ui/react";
import ShowHideIndicator from 'zero-element-boot/lib/components/indicator/ShowHideIndicator';
import NextIndicator from 'zero-element-boot/lib/components/NextIndicator'

/**
 * 
 * 计数器
 * 
 */

export default function Index(props) {

    const { productId, cb } = props

    const [number, setnumber] = React.useState(20)

    function add() {
        const num = number + 1
        setnumber(num)
        cb( num,number)
        // console.log('number ==',number)

    }
    function decrease() {
        const num = number - 1
        if (num <= 0) {
            setnumber(0)
            cb( 0)

        } else {
            setnumber(num)
            cb( num,number)
        }

    }

    const baseStyle = {
        textAlign: 'center',
        padding: '4px ',
        // backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        height: '100%'
    }

    const ShowHide = number > 0 ? NextIndicator : ShowHideIndicator
    // const state = number> 0? show : hide

    return (
        <div style={baseStyle} >
            <Flex gap='2'>
                <ShowHide hide>
                    <DotPlusButton size={60} color='#b03931' borderColor='#b03931' onPlusClick={decrease} />
                </ShowHide>
                <ShowHide hide>
                    <div style={{ fontSize:'26px', margin: '10px 0', padding: '0', width: '56px', height: '76%', backgroundColor: '#ffffff' }} >
                        {number}
                    </div>
                </ShowHide>
                <DotDashButton size={60} color='#ffffff' fill='#b03931' borderColor='#b03931' onDashClick={add} />
            </Flex>

        </div>
    )
}