import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
require('./index.less');

const colorMap = {
    'TERTIARY_AGENT': 'TertiaryAgent',
    'SECONDARY_AGENT': 'SecomdaryAgent',
    'UNAUTHORIZED_LEVEL': 'default',
}

/**
 * 
 * @param {name} name 前端样式内容
 * @param {value} value 字段名
 * @param {size} size 大小(传数字)
 * 
 */

export default function index(props) {

    const { id, defaultValue, defaultStatus, callBack, name = '', value = '',  size = 30 } = props

    let ref = React.createRef()

    function onClick(e) {
        // setNames(e.target.name)
        // console.log('onClickName = ', e.target.name)
        if (callBack) {
            callBack(id, e.target.name)
            if (value == null) {
                callBack(defaultStatus == 'Unauthorized')
                // ref.current.style.backgroundColor = '#e9e9ea'
            }
        }
    }
    return (

        <CssCart padding='' margin='0 1px' linewidth='0' background='#ffffff'>
            <input className={defaultValue == value ? `${colorMap[defaultValue]}` : 'default'}
                //   ref={ref}
                type='button'
                value={name}
                name={value}
                style={{
                    padding: '4px 10px',
                    fontSize: `${0.4 * size}px`,
                    width: `${3 * size} px`,
                    height: `${size} px`,
                }}
                onClick={(e) => onClick(e)} />
        </CssCart>


    )



}