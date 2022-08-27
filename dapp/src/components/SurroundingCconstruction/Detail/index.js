import React from 'react';
import DetailItem from '../DetailItem';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import { Center } from '@chakra-ui/layout';

/**
 * 
 * @param {items} items 数据
 * 
 */

export default function index(props) {

    const { items } = props

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,148px)" }} >
            {items && items.map((item, i) => (
                <DetailItem  {...item} key={i} />
            ))}
        </div>
    )

}