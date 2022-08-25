import React from 'react';
import RouterItem from './Item';


/**
 * 
 * @param {data} items 数据
 * 
 */


export default function index(props) {

    const { items, number, cb, selectedAgentId, SelectList } = props
    // console.log(props, ' == items2222222222222')

    return items && items.map((item, i) => (

        <RouterItem  {...item} key={i} cb={cb} selectedAgentId={selectedAgentId} SelectList={SelectList} />

    )
    )

}