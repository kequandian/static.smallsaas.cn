import React, { useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import TopBar from '@/components/presenter/TopBar'
import logo from '@/assets/logo.jpg'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import { getEndpoint } from 'zero-element-boot/lib/components/config/common';


// --我的邀请码页面
export default function index(props) {

    const queryData = useQuery(props)
    const appid = queryData.query.appid

    const { pass } = props
    // console.log('queryData===', queryData)
    const api = '/api/u/saasAgent/myAgentInfo'


    const [data] = useTokenRequest({ api });

    // console.log(data, '=== data');
    // const channel = (data && data.length > 0) ? (data.name + '' + data.phone) : ''
    // console.log('channel==', channel)

    // 获取logo
    const endpoint = getEndpoint()
    const src = endpoint + data.logo

    // function SetHomeowner() {
    //     history.push(`/my/ModifyAvatar?id=${id}`)
    // }

    const clickDownLoad = () => {
        let Qr = document.getElementById('qrcode');
        console.log('Qr=', Qr)
        downLoadCanver(Qr)
    }
    function downLoadCanver(canvas) {
        downLoad(saveAsPNG(canvas));
    }
    //模拟a标签href下载
    function downLoad(url) {
        let a = document.createElement("a");
        a.download = 'LinkOrder';// 设置下载的文件名，默认是'下载'
        a.href = url;
        document.body.appendChild(a);
        a.click();
        a.remove(); // 下载之后把创建的元素删除
    }
    // 保存成png格式的图片
    function saveAsPNG(canvas) {
        return canvas.toDataURL("image/png");
    }

    return (
        // data && data.length > 0 ? (
        <ChakraProvider>
            <TopBar>
                下单链接
            </TopBar>

            {/* {data.postCityCode || data.postDistrictCode || data.postProvinceCode ? */}
            <CssCart backgroundColor='' margin='80px 30px' padding='80px  0px'  borderRadius='10px' boxShadow='0 0px 8px rgba(0, 0, 0, 0.18)'>
                <>
                    <Stack bg='#' margin='0 0 20px 0'>
                        <Center margin=' 0 20px  20px 20px ' borderRadius='2px'>
                            <ContainerSubtitle>
                                扫下面的二维码进入下单页面
                            </ContainerSubtitle>
                        </Center>

                        <Center onClick={clickDownLoad}>
                            <QRCode
                                id={'qrcode'}
                                style={{ padding: '10px', boxShadow: '0 0px 2px rgba(0, 0, 0, 0.1)', borderRadius: '2px' }}
                                value={`http://test.5g.smallsaas.cn/${data.vendorCode}`}
                                size={180} //二维码的宽高尺寸
                                fgColor="#222"  //二维码的颜色
                                imageSettings={{ // 配置二维码中间出现的logo信息
                                    // src: `${src}`,// logo的地址 可以是在线图片也可以是本地图片 没有默认值 类型为string
                                    src: `${logo}`,
                                    width: 38, // logo的宽度 默认值是整个二维码的10% 类型为number
                                    height: 38, // logo的高度 默认值是整个二维码的10% 类型为number
                                    excavate: true, // 是否是镂空状态 默认值false 类型为boolean
                                }}
                            />
                        </Center>
                    </Stack>
                    <ContainerInactiveTitle fontSize='14px'>
                        这是您的专属下单二维码
                    </ContainerInactiveTitle>
                    <ContainerInactiveTitle fontSize='14px'>
                        点击可以下载到本地进一步设计与打印
                    </ContainerInactiveTitle>
                </>
            </CssCart>
            {/* : <>
                    <Center border='0px #3156bd solid' padding='4px 10px' margin='20px 40px ' borderRadius='2px'>
                        <ItemTitle>
                            您未设置归属地，无法邀请客户下单
                        </ItemTitle>
                    </Center>
                    <Center padding='4px 10px' margin='20px 40px ' borderRadius='2px' onClick={() => SetHomeowner()}>
                        <Button solid>
                            点击设置
                        </Button>
                    </Center>
                </>

            } */}
        </ChakraProvider>

        // ) : <></>

    )


}
