import React, { useState } from 'react';


export default function Index(props) {

    const { children } = props;


    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        margin: '6px 2px 0 2px',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '20PX',
        width: '100%',
        color: '#c62922',
        // border:'1px #ff0000 solid'
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}