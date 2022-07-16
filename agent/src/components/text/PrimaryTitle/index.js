import React, { useState } from 'react';

/**
 * 
 * @param {color} color 背景，边框，字体颜色
 * @param {fontSize} fontSize 字号
 * @param {margin} margin 外边距
 * 
 */

export default function Index(props) {

    const { margin, color = '', fontSize = '12px', children, } = props;


    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        margin: `${margin}`,
        padding: '0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: `${fontSize}`,
        color: `${color}`,
        // border:'1px #ff0000 solid'
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}