import React, { useState } from 'react';

/**
 * 
 * @param {color} color 背景，边框，字体颜色
 * @param {fontSize} fontSize 字号
 * @param {margin} margin 外边距
 * 
 */


export default function Index(props) {

    const { color = '',  children, } = props;


    const baseStyle = {
        // textAlign: 'center',
        fontSize: '14px',
        lineHeight:'100%',
        color: `${color}`,
        // border:'1px #ff0000 solid'
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}