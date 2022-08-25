import { Button, Drawer, Radio, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import Buttons from './buttons'
import CreateProduct from '../index'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


export default function index(props) {

    // const queryData = useQuery(props)
    // const appid = queryData.query.appid


    const [visible, setVisible] = useState(false);
    const [onId, setOnClickAppid] = useState([]);

    const showDrawer = (id) => {
        setVisible(true);
        setOnClickAppid(id)
    };

    //关闭按钮
    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <CreateProduct  onIetmClick={(id) => showDrawer(id)} />
            <Drawer
                // title="确定"
                placement='bottom'
                width='89%'
                height='36%'
                onClose={onClose}
                visible={visible}
            >
                <Buttons id={onId} />
            </Drawer>

        </>
    )
}