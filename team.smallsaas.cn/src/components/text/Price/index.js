import React, { useState } from 'react';


export default function Index(props) {

    const { children } = props;


    const baseStyle = {
        backgroundColor: '',
        padding: '0',
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#ff0202',
        // border:'1px #ff0000 solid'
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}