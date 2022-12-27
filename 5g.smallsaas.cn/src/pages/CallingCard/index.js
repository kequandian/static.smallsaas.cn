import { Button, Drawer, Radio, Space } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import PopUpContent from '@/pages/CallingCard/PopUpContent/index'
import MainList from '@/pages/CallingCard/MainList'
import promiseAjax from 'zero-element-boot/lib/components/utils/request';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'


export default function index(props) {

    // const appid = window.location.pathname.substring(1, window.location.pathname.length)

    const { vendorCodeData } = props

    // //接收扫码跳转带过来的参数
    // const reference = props.location.query.channel
    // const coChannel = props.location.query.coChannel
    // const coUserid = props.location.query.coUserid

    const vendorCodelValue = window.location.pathname.split('/')[1]

    const vendorCode = vendorCodeData || vendorCodelValue
    // console.log('vendorCode =', vendorCode)

    const [selectGoodsId, setSelectGoodsId] = useState('');
    const [visible, setVisible] = useState(false);
    const [isClose, setClose] = useState(false);
    const [onClickList, setOnClickList] = useState([]);

    const showDrawer = (item) => {
        setVisible(true);
        setOnClickList(item)
        setClose(false)
        // resetValue()
    };

    const onClose = () => {
        setVisible(false);
        // resetValue()
        setClose(true)

    };

    const [infoData, SetInfoData] = useState([])
    // console.log('infoData==', infoData)

    // 根据渠道码获取邀请人的信息
    function info() {
        const query = {
        }
        promiseAjax(`/api/u/saasAgent/agentInfo/${vendorCode}`, query, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let data = resp.data
                SetInfoData(data)
            }
        })
    }

    useEffect(_ => {
        info()
    }, [])

    function cb(selectGoodsId){
        setSelectGoodsId(selectGoodsId)
    }
    return (
        <>
            <MainList onNumberClick={showDrawer} cbId={(selectGoodsId) =>cb(selectGoodsId)} />
            <Drawer
                title="下单"
                placement='bottom'
                width='89%'
                height='86%'
                onClose={onClose}
                visible={visible}
                maskClosable={false}
            >
                <PopUpContent onClickList={onClickList} vendorCode={vendorCode} infoData={infoData} isClose={isClose} selectGoodsId={selectGoodsId}
                />
            </Drawer>
        </>
    )
}