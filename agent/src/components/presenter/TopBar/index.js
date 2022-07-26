import React, { useState } from 'react';

/**
 * 标题栏容器，有一个返回键，页面作为子组件
 * 
 * 
 * @param {children} children 子组件(页面)
 * @param {fill} fill 页面背景
 * 
 */


export default function Index(props) {

    const { children,fill='#F4F6F8' } = props;

    function goBack() {
        window.history.back()

    }
    return React.Children.map(children, child => {

        return (
            <div >
                <div style={{ position: "absolute", left: '0%', zIndex: 20, margin: '8px' }}>
                    <svg onClick={() => goBack()} t="1658717944661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12442" width="24" height="24"><path d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z" fill='#33333390' p-id="12443"></path></svg>
                </div>

                <div style={{ width: '100%', height: '100%', position: "absolute", left: '0%', zIndex: 10 , background:`${fill}`}}>
                    {child}
                </div>
            </div>
        )
    })
}