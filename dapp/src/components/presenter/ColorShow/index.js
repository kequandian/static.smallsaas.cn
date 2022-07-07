import React from 'react';
import Palette from './Palette'
import SetBarTitle from '@/components/setBarTitle'

/**
 * 
 * 
 */


export default function Index(props) {
    
    const palette = ["#78eaa5", ["#5178ff", "#2150f2", "#2145c3"]]

    return (
        <>
            <SetBarTitle text='demo'/>
            <Palette  palette = {palette} />
        </>
    )

}