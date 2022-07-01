import React, { useState } from 'react';

/**
 * 
 * @param {size} size 尺寸
 * 
 */


export default function Index(props) {

    const {backgroundImage } = props;


    const baseStyle = {
        width: '70px',
        height: '60px',
        margin: '12px 4px 12px 8px',
        backgroundSize: '100% 100%',
        borderRadius: '4px',
        backgroundImage:`${backgroundImage}`
    }

    return (
        <div style={baseStyle}  >
          
        </div>
    )
}