import React, { useState, useEffect } from 'react';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import MyInvite from './config';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';


export default function index(props) {

    const api = `/api/u/saasAgent/myInvitationList`
    const [items, setItems] = useState([])

    //获取列表数据
    useEffect(_ => {
        getList(api)
    }, [])

    // const [data] = useTokenRequest({ api });
    // console.log(data, '==data11111111111');


    // const items = data.records
    // console.log(items, '=======================items');

    // const { avatar, name, preStoragePoint } = items


    function getList() {
        promiseAjax(api)
            .then(res => {
                // console.log(res, '== 列表')
                if (res && res.code === 200) {
                    let items = res.data.records;
                    setItems(items)
                }
            })
    }


    function updateLevel(id, query) {
        promiseAjax(`/api/u/saasAgent/level/${id}`, query, { method: "PUT" })
            .then(res => {
                console.log(res, '== 更新')
                if (res && res.code === 200) {
                    getList()
                }
            })
    }

    function cb(id, level) {
        // console.log('id = ', id)
        // console.log('level = ', level)
        if (id && level) {
            updateLevel(id, { level })
        }
    }

    return (
        <>
            <PageModuleContainer >
                <ContainerSubtitle>
                    代理授权（我的新邀请）
                </ContainerSubtitle>
            </PageModuleContainer>

            {items && Array.isArray(items) && items.length > 0 ? (
                <MyInvite items={items} cb={cb} />
            ) : <></>}
        </>
    )


}
