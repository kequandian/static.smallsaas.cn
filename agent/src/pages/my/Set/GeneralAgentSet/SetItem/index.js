import React from 'react';
import RouterItem from '@/components/presenter/card/RouterItem';


/**
 * 
 * @param {data} items 数据
 * 
 */


export default function index(props) {

    const { items } = props
    console.log(items, ' == items')

    return items && items.map((item, i) => (

        <RouterItem  {...item} key={i} />


    )


    )

}