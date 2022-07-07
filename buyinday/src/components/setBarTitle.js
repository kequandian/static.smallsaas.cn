import React from 'react';
import { Helmet } from 'umi';

/**
 * 
 * 
 */


export default function Index(props) {

    const { text } = props
    
    return (
        <div className="application">
            <Helmet  encodeSpecialCharacters={false}>
                <meta charSet="utf-8" />
                <title>{text}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    )

}