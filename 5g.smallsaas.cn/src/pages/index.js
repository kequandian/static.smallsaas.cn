import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
// import CallingCard from '@/pages/CallingCard'
import CallingCard from '@/pages/CallingCard'
import SignOffAddress from '@/pages/CallingCard/PopUpContent/SelectAddress'
import ProductList from '@/pages/CallingCard/PopUpContent'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { Center, Stack } from '@chakra-ui/layout';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';

import _ from 'lodash'
// const jweixin = require('../plugins/jweixin-module/lib')

export default function index(props) {

  //获取路由带过来的 渠道码
  // const vendorCodelValue = window.location.pathname.substring(1, window.location.pathname.length)
  const vendorCodelValue = window.location.pathname.split('/')[1]

  const vendorCode = vendorCodelValue ? vendorCodelValue : null
  // console.log('vendorCode==', vendorCode)

  //接收扫码跳转带过来的参数,
  const queryData = useQuery(window.location.href)
  // const reference = queryData.query ? queryData.query.phone : 0
  // const appid = queryData.query ? queryData.query.appid : 0
  // const coUserid = queryData.query ? queryData.query.coUserid : 0

  // const [infoData, SetInfoData] = useState([])
  // // console.log('infoData==', infoData)

  // // 根据渠道码获取邀请人的信息
  // function info() {
  //   const query = {
  //   }
  //   promiseAjax(`/api/u/saasAgent/agentInfo/${vendorCode}`, query, { method: 'GET' }).then(resp => {
  //     if (resp && resp.code === 200) {
  //       let data = resp.data
  //       SetInfoData(data)
  //     }
  //   })
  // }

  
  var imgUrl = "https://static.smallsaas.cn/house/2022/svg/group/moerdeng/detailedDiagram/moerdeng2.png";
  var lineLink = "https://5g.smallsaas.cn";
  var descContent = "分享到朋友圈只显示标题"; //分享给好友的时候显示标题和描述，分享到朋友圈只显示标题
  var shareTitle = '联通5G分享';

  useEffect(_=>{
    // getWXConfig()
  },[])

  function getWXConfig() {
    const query = {
    }
    promiseAjax(`/api/oauth/sign?appid=4&url=https://5g.smallsaas.cn`, query, {}).then(resp => {
      if (resp && resp.code === 200) {
        let data = resp.data
        // console.log('data == ', data)

        if (jweixin) {
          jweixin.checkJsApi({
              jsApiList: ['updateAppMessageShareData'],
              success: (res) => {
                  console.log('检测分享', res)
                  if (_.get(res, 'checkResult.updateAppMessageShareData') === false) {
                    alert('当前设备版本暂不支持分享')
                  }
              }
          })
        }

        // const wxConfig = {
        //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //   appId: data.appid, // 必填，公众号的唯一标识
        //   timestamp: data.timestamp, // 必填，生成签名的时间戳
        //   nonceStr: data.nonceStr, // 必填，生成签名的随机串
        //   signature: data.signature, // 必填，签名，见附录1
        //   jsApiList: [
        //     'updateAppMessageShareData',
        //     'updateTimelineShareData'
        //   ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // }

        const wxConfig = {
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxe6c9f3e8447a3e35', // 必填，公众号的唯一标识
          timestamp: '1672309264', // 必填，生成签名的时间戳
          nonceStr: 'NwfjniHoVP', // 必填，生成签名的随机串
          signature: '9c3d215ca3bceaec8a7f3572902487a70406f433', // 必填，签名，见附录1
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData'
          ]  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        }
    
        jweixin.config(wxConfig);
        jweixin.error(err => {
          alert(`jweixin.error = ${JSON.stringify(err)}`)
        });
    
        jweixin.ready((e) => {
          alert(`分享初始化 == ${JSON.stringify(e)}`)
          //分享给朋友
          jweixin.updateAppMessageShareData({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              alert('分享成功')
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              alert('分享失败')
            },
          })
        
          //分享到朋友圈
          jweixin.updateTimelineShareData({
            title: shareTitle, // 分享标题
            link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })

      }
    })
  }

  

  return (
    !vendorCode ? (
      // vendorCode ? (
      <Stack h='400px' margin='100px 0'>
        <Center h='200px'>
          <svg t="1661242975784" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="280444" width="128" height="128"><path d="M910.222222 375.466667c0-153.6-122.311111-278.755556-275.911111-278.755556-108.088889 0-199.111111 62.577778-244.622222 153.6-22.755556-8.533333-45.511111-14.222222-71.111111-14.222222-113.777778 0-204.8 93.866667-204.8 210.488889 0 110.933333 85.333333 201.955556 193.422222 207.644444h358.4c136.533333-14.222222 244.622222-133.688889 244.622222-278.755555z" fill="#D5E0F7" p-id="280445"></path><path d="M256 853.333333c-17.066667 0-28.444444-11.377778-28.444444-28.444444v-85.333333c0-17.066667 11.377778-28.444444 28.444444-28.444445s28.444444 11.377778 28.444444 28.444445v85.333333c0 17.066667-11.377778 28.444444-28.444444 28.444444zM597.333333 853.333333c-17.066667 0-28.444444-11.377778-28.444444-28.444444v-85.333333c0-17.066667 11.377778-28.444444 28.444444-28.444445 14.222222 0 28.444444 11.377778 28.444445 28.444445v85.333333c0 17.066667-11.377778 28.444444-28.444445 28.444444zM426.666667 938.666667c-17.066667 0-28.444444-14.222222-28.444445-28.444445v-170.666666c0-17.066667 11.377778-28.444444 28.444445-28.444445s28.444444 11.377778 28.444444 28.444445v170.666666c0 17.066667-11.377778 28.444444-28.444444 28.444445zM768 938.666667c-17.066667 0-28.444444-14.222222-28.444444-28.444445v-170.666666c0-17.066667 11.377778-28.444444 28.444444-28.444445 14.222222 0 28.444444 11.377778 28.444444 28.444445v170.666666c0 17.066667-11.377778 28.444444-28.444444 28.444445z" fill="#88CDFB" p-id="280446"></path></svg>
        </Center>
        <Center h=''>
          <PrimaryTitle>
            未识别到您的渠道码，请从正确的渠道进入进行下单
          </PrimaryTitle>
        </Center>
      </Stack>
    ) : (
      <CallingCard
        vendorCodeData={vendorCode}
      // infoData={infoData}
      // coUserid={coUserid}
      />
    )

    // <ProductList  />
  )
}
