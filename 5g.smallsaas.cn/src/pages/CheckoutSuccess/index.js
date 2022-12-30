import React from 'react'
import { history } from 'umi';
import {
    ChakraProvider, Button
} from '@chakra-ui/react'

require('./index.less')

export default function index(props) {

    const {  } = props
    const vendorCodelValue = window.location.pathname.split('/')[1]

    function goBack(){
        history.push(`/CallingCard?vendorCode=${vendorCodelValue}`)
    }

    return (
        <ChakraProvider>
            <div className='success-container'>
                <div style={{marginBottom:'15px'}}>
                    <svg t="1672371975583" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3126" width="80" height="80"><path d="M512 0C229.668571 0 0 229.668571 0 512s229.668571 512 512 512 512-229.668571 512-512S794.331429 0 512 0z m307.2 343.771429s-267.702857 295.497143-327.68 365.714285c-59.977143 70.217143-106.788571 0-106.788571 0L210.651429 529.554286s-27.794286-42.422857 21.942857-81.92c46.811429-38.034286 84.845714 0 84.845714 0l122.88 128.731428L746.057143 291.108571s29.257143-20.48 59.977143 5.851429c23.405714 21.942857 13.165714 46.811429 13.165714 46.811429z" fill="#68BF7B" p-id="3127"></path></svg>
                </div>
                <div style={{marginBottom:'20px', fontSize: '18px', fontWeight:'bold'}}>下单成功</div>
                <Button width='100px' height='38px' colorScheme='gray' variant='solid' size='sm' onClick={() => goBack()}>
                    返回
                </Button>
            </div>
        </ChakraProvider>
    )
}