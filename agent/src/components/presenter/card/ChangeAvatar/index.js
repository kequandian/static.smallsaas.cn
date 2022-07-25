import React, { Component, useState, useEffect } from 'react'

import { WingBlank, NavBar, ImagePicker } from 'antd-mobile'

// 引入自己修改的样式
import './index.less'

// 引入默认的图片
// import logo from '../../../assets/edit.svg'

export default function index(props) {

    const { logo='https://static.smallsaas.cn/house/2022/image/dealSquare/DefaultCell.svg', }=props
    let [avator, setAvator] = useState([])

    // 选择图片
    const change = (files, type, index) => {
        setAvator(
            files
        )
        console.log('avator=', avator);
        console.log('files=', files);
    }
    const avatorImg = () => {
        // 如果选择了图片就用选择后的图作为头像
        if (avator[0]) {
            return <img className='user-avatar' src={avator[0].url} alt="" />
        } else {
            // 没有选择图片则默认显示引入的 logo
            return <img className='user-avatar' src={logo} alt="" />
        }
    }


    return (
        <div className=''>
            {/* <NavBar>聊天</NavBar> */}
            <WingBlank className='user-avatar-upload'>
                {avatorImg()}
                <ImagePicker
                    onChange={change}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </WingBlank>
        </div>
    )
}

