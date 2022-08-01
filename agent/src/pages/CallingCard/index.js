import { Button, Drawer, Radio, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import PopUpContent from '@/pages/CallingCard/PopUpContent/index'
import CallingCard from '@/pages/CallingCard/MainList'


export default function index(props) {
    const { } = props

    const [visible, setVisible] = useState(false);
    const [onClickList, setOnClickList] = useState([]);

    const showDrawer = (item) => {
        setVisible(true);
        setOnClickList(item)
    };

    const onClose = () => {
        setVisible(false);
    };


    return (
        <>
            <CallingCard onNumberClick={showDrawer} />
            <Drawer
                title="下单"
                placement='bottom'
                width='89%'
                height='86%'
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
                <PopUpContent onClickList={onClickList} />
            </Drawer>
        </>
    )
}