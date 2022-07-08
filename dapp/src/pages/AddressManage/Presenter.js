import React from 'react';
import CssCart from 'zero-element-boot/lib/components/Cart/CssCart';
import { Flex } from '@chakra-ui/react'
import NamedCart from 'zero-element-boot/lib/components/NamedCart'


export default function index(props) {
    const { communityName , roomNumber ,buildingCode, address  } = props

    return (
        <CssCart linewidth='0' width='100%' >

            <NamedCart cart={{ xname: 'Cart', props: { margin: '0',padding: '14px',  linewidth: '1px', fill:'#ffffff' ,lineColor: '#e9eef4', shadow: '0 2px 2px rgba(0, 0, 0, 0.03) ' } }}
                defaultIndicator='OnDeleteIndicator' defaultIndicatorProps={{ margin: '0',padding: '0',  }}
                indicator='Cart' hoverIndicatorProps={{ margin: '0', linewidth: '0', padding: '0', }}
            >
                <>
                    <Flex>
                        <div style={{ fontSize: '12.5px', fontWeight: '', margin: '9px 6px 0 0' }}> {communityName} </div>
                        <div style={{ fontSize: '17px', fontWeight: 'bold', margin: '5px 0 0 0 ' }}>{buildingCode}-</div>
                        <div style={{ fontSize: '17px', fontWeight: 'bold', margin: '5px 0 0 0 ' }}>{roomNumber}</div>
                        <CssCart width='16px' height='100%' padding='0' margin='0 0 auto auto'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#d2d0d0" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </CssCart>
                    </Flex>
                    <div style={{ fontSize: '12px', fontWeight: '', margin: '10px 0 2px 0 ', color: '#a6a6a6' }}>{address}</div>
                </>
            </NamedCart>
        </CssCart>


    )

}