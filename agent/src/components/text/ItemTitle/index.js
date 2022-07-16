import React, { useState } from 'react';

/**
 * 
 * @param {color} color 背景，边框，字体颜色
 * 
 */


export default function Index(props) {

    const { children } = props;


    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        margin: '2px 2px 2px 2px',
        padding: '0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // fontWeight: 'bold',
        fontSize: '18px',
        // border:'1px #ff0000 solid'
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}