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
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}