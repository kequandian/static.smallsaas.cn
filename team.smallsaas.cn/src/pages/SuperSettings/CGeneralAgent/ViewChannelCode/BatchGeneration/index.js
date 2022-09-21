import { Button, Drawer, Radio, Space } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import Number from './Number'
import ViewChannelCode from '../index'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
const promiseAjax = require('zero-element-boot/lib/components/utils/request');

//批量生成渠道码
export default function index(props) {

    // 接收传入的appid,和agendId
    const queryData = useQuery(props)
    const appid = queryData.query.appid
    const agentId = queryData.query.agentId

    const [visible, setVisible] = useState(false);
    const [number, setNumber] = useState('')

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const api = '/api/u/saasAgentInvitationCode/batchGenCode'
    console.log('2222222')
    function getNumber() {
        const values = { "agentId": 1, "genCount": `${number}` }
        promiseAjax(api, values, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
            }
        })
    }

    // 获取数量
    function callBackData(number) {
        setNumber(number)
    }


    return (
        <>
             {/*列表页 */}
            <ViewChannelCode appid={appid} agentId={agentId} onNextClick={(id) => showDrawer(id)} />

            <Drawer
                // title="确定"
                placement='bottom'
                width='89%'
                height='32%'
                onClose={onClose}
                visible={visible}
                padding='0'
            >

             {/*弹出 */}
                <Number  determine={(number) => getNumber(number)} callBackData={(number) => callBackData(number)} />
            </Drawer>

        </>
    )
}