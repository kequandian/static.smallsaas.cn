import React, { useState } from 'react';

/**
 * 
 * 
 */


export default function Index(props) {

    const {children } = props;


    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        display: 'flex',
        justifyContent: 'flex-end',
        // border: '1px #ff0000 solid',
        alignItems: 'center',
        fontSize: '13px',
        color: '#b03931',

    }

    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}