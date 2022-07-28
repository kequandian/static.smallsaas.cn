import React, { Component, useState, useEffect } from 'react'

import { WingBlank, NavBar, ImagePicker } from 'antd-mobile'
import { getEndpoint, getToken } from 'zero-element-boot/lib/components/config/common';

// 引入自己修改的样式
import './index.less'

// 引入默认的图片
// import logo from '../../../assets/edit.svg'

export default function index(props) {

    const { logo = 'https://static.smallsaas.cn/house/2022/image/dealSquare/DefaultCell.svg', callBack } = props
    let [avator, setAvator] = useState([])

    // 选择图片
    const change = (files, type, index) => {

        // console.log('files.file=', files[0].file);
        uploadImage('/api/u/fs/uploadfile', files[0].file).then(resp => {
            if (resp && resp.code === 200) {
                callBack(resp.data.url)
                console.log('url',resp.data.url)

            }
        });

        


        setAvator(files)


        // if (callBack) {
        //     callBack(url)
        //     console.log('url=', url);

        // }

        // console.log('avator=', avator);
        // console.log('files=', files);
    }
    // console.log('callBack=', callBack);

    const avatorImg = () => {
        // 如果选择了图片就用选择后的图作为头像
        if (avator[0]) {
            return <img className='user-avatar' src={avator[0].url} alt="" />
        } else {
            // 没有选择图片则默认显示引入的 logo
            return <img className='user-avatar' src={logo} alt="" />
        }
    }

    /** 
  * 使用fetch实现图片上传
  * @param {string} url  接口地址
  * @param {JSON} params body的请求参数
  * @return 返回Promise 
  */
    function uploadImage(url, file) {

        let payload = new FormData();
        payload.append('file', file);
        // console.log('payload=', payload);
        return new Promise(function (resolve, reject) {

            const async = true

            let xhr = new XMLHttpRequest();

            xhr.open('POST', `${getEndpoint()}${url}`, async);

            if (getToken()) {
                xhr.setRequestHeader("Authorization", `Bearer ${getToken()}`);
            }

            //xhr.setRequestHeader("Content-Type", "multipart/form-data");

            xhr.responseType = 'JSON';

            xhr.onreadystatechange = () => {

                if (xhr.readyState !== 4) {
                    return;
                }

                if (xhr.readyState === 4 && xhr.status === 200) {
                    let result
                    try {
                        result = JSON.parse(xhr.responseText);
                        resolve(result);

                    } catch (error) {
                        reject("返回的数据非 json 格式");
                    }
                } else {
                    reject(xhr.statusText);
                }
            }


            xhr.onerror = (err) => {
                reject(err);
            }

            xhr.send(payload);
        });
    }


    // function onClick() {

    // }

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

