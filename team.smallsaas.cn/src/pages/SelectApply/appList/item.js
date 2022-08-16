import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';

/**
 * 
 * @param {icon} icon 图片
 * @param {title} title 标题
 * @param {navigation} navigation 外部链接
 * @param {value} value 数值
 * 
 */

export default function index(props) {

    const { icon = '', value = '', appName = '', navigation, appid } = props

    // console.log('props === ', props)


    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)


    //点击路由到新的app
    function onnextClick() {
        if (getToken()) {
            history.push(`/Orders?appid=${appid}`)
            // history.push(`https://team.smallsaas.cn/${appid}`)
        } else {
            history.push(`/login?appid=${appid}`)
        }
    }

    return (
        <Center h='120px' w='120px' boxShadow='0 0px 4px rgba(0, 0, 0, 0.08) ' margin='10px' onClick={() => onnextClick()} padding='8px' >
            <Stack padding='8px ' bg=''>
                <Center h='50px' w='100%' bg='' margin='0 0 10px 0' >
                    {/* <img src={icon} width='36px' height='36px' /> */}
                    <svg t="1660385039276" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17694" width="50" height="50"><path d="M304.93 527.84c-14.91-17.04-14.91-42.61 2.13-59.65 55.39-51.13 127.82-80.96 204.52-80.96 76.7 0 149.13 29.83 206.65 83.09 17.04 14.91 19.17 42.61 2.13 59.65-8.52 8.52-21.3 12.79-31.96 12.79-10.65 0-21.3-4.26-29.82-12.79-40.48-36.21-91.61-57.52-147-57.52s-106.52 21.3-147 57.52c-17.04 14.91-42.61 14.91-59.65-2.13zM863.11 334.8c-95.87-91.61-219.44-140.61-351.52-140.61-132.09 0-255.65 49-351.52 140.61-17.04 17.04-17.04 42.61-2.13 59.65 17.05 17.04 42.61 17.04 59.66 2.13 80.95-76.7 185.35-117.17 294-117.17s213.04 40.48 294 117.17c6.39 6.39 17.04 10.65 27.7 10.65 10.65 0 23.44-4.26 31.95-12.78 17.03-17.04 14.9-44.74-2.14-59.65z m146.99-135.53C873.76 71.45 696.93 1.15 511.58 1.15c-185.35 0-362.17 70.3-498.52 198.13-17.04 17.05-17.04 42.61-2.13 59.66 17.04 17.04 44.74 19.17 61.78 2.13 119.31-112.91 274.83-174.7 438.87-174.7s319.56 61.79 438.87 174.7c8.52 8.52 19.17 10.65 29.82 10.65 10.65 0 23.43-4.26 31.96-12.78 17.05-17.06 14.92-44.75-2.13-59.67zM344.48 783.72c-13.44 0-24 1.92-36.96 7.2l5.28-60.48H440V659.4H239.36l-9.12 176.64 37.44 24.48c21.12-13.44 30.72-17.28 50.4-17.28 30.72 0 52.32 19.2 52.32 55.2 0 36.96-21.6 55.68-56.16 55.68-28.32 0-53.28-14.88-73.44-34.08l-38.88 53.76c28.32 27.84 67.68 49.44 124.8 49.44 68.64 0 129.12-46.56 129.12-126.72 0-77.28-50.88-112.8-111.36-112.8zM670.4 882.6h56.64v57.6c-7.68 5.76-21.12 9.12-34.08 9.12-66.24 0-97.92-41.28-97.92-112.32 0-69.6 37.92-110.88 90.72-110.88 29.76 0 48.48 12 65.76 27.84l45.6-54.72c-24.48-24.48-61.92-46.56-114.24-46.56-95.52 0-175.68 68.16-175.68 187.2 0 120.96 77.76 183.36 177.12 183.36 49.92 0 94.08-19.68 119.04-43.68V812.52H670.4v70.08z" p-id="17695" fill="#ad2419"></path></svg>
                </Center>
                <Center h='' w='100%' bg='' >
                    <ItemTitle>
                        {appName}
                    </ItemTitle>
                </Center>
            </Stack>
        </Center>

    )


}
