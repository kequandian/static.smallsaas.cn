import { Button, Drawer, Radio, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import Buttons from './buttons'
import CGeneralAgent from './CGeneralAgent'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


export default function index(props) {
    
    const queryData = useQuery(props)
    const appid = queryData.query.appid
   
    // const { channel} = props
    // console.log('props==',props)
    // const channel = props.location.query.channel

    const [visible, setVisible] = useState(false);
    const [onId, setOnClickAppid] = useState([]);

    const showDrawer = (id) => {
        setVisible(true);
        setOnClickAppid(id)
    };
    // function showDrawer(){
    //     console.log('1111111111')
    // }

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
            // extra={
            //   <Space>
            //     <Button onClick={onClose}>Cancel</Button>
            //     <Button type="primary" onClick={onClose}>
            //       OK
            //     </Button>
            //   </Space>
            // }
            >
                <Buttons  id={onId}   />
            </Drawer>
           
        </>
    )
}