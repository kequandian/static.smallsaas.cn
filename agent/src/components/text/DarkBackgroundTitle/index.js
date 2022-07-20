import React, { useState } from 'react';

/**
 * 
 * 
 */


export default function Index(props) {

    const {children,fontSize='20px' } = props;


    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        display: 'flex',
        justifyContent: 'flex-end',
        // border: '1px #ff0000 solid',
        alignItems: 'center',
        fontSize:`${fontSize}`,
        color: '#ffffff',

    }

    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}