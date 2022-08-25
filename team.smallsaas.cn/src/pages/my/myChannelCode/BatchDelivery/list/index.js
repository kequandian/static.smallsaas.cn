import React from 'react';
import Item from './Item';


/**
 * 
 * @param {data} items 数据
 * 
 */


export default function index(props) {

    const { items ,number ,cb,nextStatus} = props
   
    return items && items.map((item, i) => (

        <Item  {...item} key={i} cb={cb} nextStatus={nextStatus}/>


    )


    )

}