import React, { useState } from 'react';

/**
 * 
 * 
 */


export default function Index(props) {

    const { children } = props;


    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        margin: '2px',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // fontWeight: 'bold',
        fontSize: '12px',
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}