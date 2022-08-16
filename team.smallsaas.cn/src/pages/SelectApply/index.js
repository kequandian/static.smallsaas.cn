import React, { useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Box, Spacer, Center, ChakraProvider, Text, Stack } from '@chakra-ui/react'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import QRCode from 'qrcode.react';
import { history } from 'umi';
import DarkBackgroundTitle from 'zero-element-boot-plugin-theme/lib/components/text/DarkBackgroundTitle';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import RouterBox from 'zero-element-boot-presenter/lib/components/presenter/card/RouterBox';
import AppList from './appList'
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import TopBar from '@/components/presenter/TopBar'
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';


// --我的邀请码页面
export default function index(props) {


    const { level='1'  } = props

    const apiInfo = '/api/u/saasAgent/myAgentInfo'
    const [dataInfo] = useTokenRequest({ api: apiInfo });
    // console.log('dataInfo ==', dataInfo)
    // ${dataInfo.agentId
    const api = `/api/u/agentApp/list/1`
    // const api = (dataInfo && dataInfo.length > 0) ? `/api/u/agentApp/list/1` : ''
    // const api = '/api/u/saasAgent/invite?inviteCode=(G-15475197476990115851234)'
    const [data] = useTokenRequest({ api });
    // console.log('data==', data)
    // console.log('data.length==', data.length)

    // function PassData() {
    //     pass(data)
    // }

    // useEffect(_ => {
    //     PassData()
    // }, [])

    return (
        <ChakraProvider>
            <TopBar>
                选择你的APP
            </TopBar>
            {level ?
                (
                    (data && data.length > 0) ?
                        (
                            <PageModuleContainer>
                                <ItemTitleBold>
                                    请选择如下应用
                                </ItemTitleBold>
                                < AppList columns={data.length} items={data} />
                            </PageModuleContainer>

                        ) : <></>
                ) : (
                    <>
                        <Center h='300px' padding='200px 0 120px 0'>
                            <svg t="1660381239763" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16441" width="108" height="108"><path d="M507.605333 981.376c-138.581333 0-213.333333-241.834667-213.333333-469.333333h85.333333c0 234.410667 75.818667 384 128 384 29.013333 0 73.472-51.584 102.485334-164.864l82.688 21.205333c-37.290667 145.536-104.789333 228.992-185.173334 228.992zM184.533333 529.408C93.354667 431.701333 63.701333 342.186667 101.12 277.333333c32.128-55.594667 107.221333-77.994667 211.626667-62.976 91.136 13.184 198.229333 53.248 301.525333 112.853334l-42.666667 73.941333c-94.122667-54.357333-190.378667-90.666667-271.061333-102.314667-63.573333-9.173333-112.853333-0.853333-125.525333 21.162667-13.141333 22.784 3.968 78.336 71.936 151.125333l-62.421334 58.24z m429.738667 167.381333l-42.666667-73.941333c203.008-117.162667 294.656-257.621333 268.544-302.848-13.525333-23.466667-75.52-36.693333-179.370666-10.24l-21.034667-82.730667c135.978667-34.56 235.946667-16.213333 274.346667 50.346667 69.248 119.978667-102.784 305.621333-299.818667 419.413333z" fill="#1768E4" p-id="16442"></path><path d="M507.605333 42.666667c138.538667 0 213.333333 241.834667 213.333334 469.333333h-85.333334c0-234.410667-75.818667-384-128-384-23.68 0-58.282667 35.285333-86.186666 112.341333a696.149333 696.149333 0 0 0-83.2-21.418666C377.6 105.130667 437.248 42.666667 507.605333 42.666667z m278.144 529.962666c21.973333-19.968 42.112-40.448 60.032-61.141333 78.336 90.282667 103.338667 174.506667 68.266667 235.221333-25.6 44.288-78.464 67.456-151.68 67.498667a419.413333 419.413333 0 0 1-59.904-4.608c-91.178667-13.098667-198.272-53.205333-301.525333-112.810667l42.666666-73.941333c94.08 54.357333 190.336 90.666667 271.018667 102.314667 63.573333 9.130667 112.853333 0.853333 125.525333-21.12 12.032-20.821333-1.536-68.821333-54.4-131.413334z m-469.76 149.845334c6.314667 29.013333 13.952 56.704 22.912 82.517333-30.976 5.973333-59.904 9.173333-86.101333 9.173333-72.96 0-125.952-22.912-151.68-67.413333-69.290667-120.064 102.741333-305.706667 299.776-419.456l42.666667 73.898667C240.64 518.4 148.906667 658.858667 175.018667 704c11.904 20.608 60.458667 32.853333 140.970666 18.432z" fill="#8BB3F1" p-id="16443"></path></svg>
                        </Center>
                        <Center padding=' 0' >
                            <ItemTitle>
                                你还没有授权的应用
                            </ItemTitle>
                        </Center>
                    </>
                )
            }
        </ChakraProvider>
    )

}
