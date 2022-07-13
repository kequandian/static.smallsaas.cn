import React, { useState } from 'react';

/**
 * 
 * @param {backgroundImage} backgroundImage 图片链接
 * 
 */


export default function Index(props) {

    const {backgroundImage,width='70px',height='60px' } = props;


    const baseStyle = {
        width: `${width}`,
        height: `${height}`,
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