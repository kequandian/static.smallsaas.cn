import React from 'react';
import Item from './Item';


/**
 * 
 * @param {data} items 数据
 * 
 */

//渠道码列表
export default function index(props) {

    const { items ,number} = props
   
    return items && items.map((item, i) => (

        <Item  {...item} key={i} />


    )


    )

}