import { Button, Drawer, Radio, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import Buttons from './buttons'
import CGeneralAgent from './CGeneralAgent'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


export default function index(props) {
    
    const queryData = useQuery(props)
    const appid = queryData.query.appid
   

    const [visible, setVisible] = useState(false);
    const [onId, setOnClickAppid] = useState([]);

    const showDrawer = (id) => {
        setVisible(true);
        setOnClickAppid(id)
        // console.log('11111111111')
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <CGeneralAgent  appid={appid} onIetmClick={(id)=>showDrawer(id)}/> 
            <Drawer
                // title="确定"
                placement='bottom'
                width='89%'
                height='46%'
                onClose={onClose}
                visible={visible}
            >
                <Buttons  id={onId}   />
            </Drawer>
           
        </>
    )
}