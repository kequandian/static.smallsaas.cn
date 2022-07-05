import React from 'react';

/**
 * 
 * @param {size} size 尺寸
 * @param {url} url 图片链接
 * 
 */


export default function Index(props) {

    const { size = '20', url = '' } = props;

    // url='https://inews.gtimg.com/newsapp_bt/0/14982779315/1000'

    const baseStyle = {
        textAlign: 'center',
        backgroundColor: '',
        width: `${size}px`,
        height: `${size}px`,
        margin: '0 10px auto 10px',
        padding: '0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // border: '1px #ff0000 solid',
        backgroundImage: `url(${url})`,
        borderRadius: '50%',
        backgroundSize: '100% 100%'
    }

    return (
        <div style={baseStyle}  >
            {url ?
                (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="transparent" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>) : (
                    (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="#d8d8d8" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>))

            }

        </div>
    )
}