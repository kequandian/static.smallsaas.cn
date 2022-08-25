import { Button, Drawer, Radio, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import Buttons from './buttons'
import ManageApp from '../index'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';


export default function index(props) {

    const queryData = useQuery(props)
    const agentId = queryData.query.agentId


    const [visible, setVisible] = useState(false);
    const [onId, setOnClickAppid] = useState([]);

    const showDrawer = (id) => {
        setVisible(true);
        setOnClickAppid(id)
        console.log('id==', id)
    };

    //关闭按钮
    const onClose = () => {
        setVisible(false);
    };

    function onCreateApp() {
        history.push(`/SuperSettings/manageApp/createApp?agentId=${agentId}&id=${onId}$`)

    }

    return (
        <>
            <ManageApp onIetmClick={(id) => showDrawer(id)} onCreateApp={onCreateApp} />
            <Drawer
                // title="确定"
                placement='bottom'
                width='89%'
                height='26%'
                onClose={onClose}
                visible={visible}
            >
                <Buttons id={onId} agentId={agentId} />
            </Drawer>

        </>
    )
}