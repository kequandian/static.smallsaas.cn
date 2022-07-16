import React from 'react';

/**
 * 
 * @param {fontSize} fontSize 字号
 * @param {margin} margin 边距
 * 
 */


export default function Index(props) {

    const { children, fontSize = '8px', margin = '2px' } = props;


    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        margin: `${margin}`,
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: `${fontSize}`,
        color: '#949494',
        // border:'1px #ff0000 solid'
    }



    return React.Children.map(children, child => {
        return <div style={baseStyle} >
            {child}
        </div>
    })
}