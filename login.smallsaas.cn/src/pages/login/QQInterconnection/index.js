import React, { useState, useEffect } from 'react';
import { } from 'antd'
import {
    Stack, Flex, Text, Center, Input, InputRightAddon, Spacer, CheckIcon,
    InputGroup, Box,
    InputLeftAddon,
    ChakraProvider
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import { Toast } from 'antd-mobile'
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import QRCode from 'qrcode.react';


// --登录页面
export default function index(props) {



    return (
        <>

            <Center padding='20px'>

                <Stack w='100%'>
                    <Center>
                        <Flex padding='' w='300px'>
                            <svg t="1662106912565" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="77511" width="38" height="38"><path d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z" fill="#FAAD08" p-id="77512"></path><path d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z" fill="#FAAD08" p-id="77513"></path><path d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z" fill="#000000" p-id="77514"></path><path d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017" fill="#000000" p-id="77515"></path><path d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453" fill="#FFFFFF" p-id="77516"></path><path d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498" fill="#FAAD08" p-id="77517"></path><path d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135" fill="#000000" p-id="77518"></path><path d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927" fill="#FFFFFF" p-id="77519"></path><path d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574" fill="#EB1C26" p-id="77520"></path><path d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z" fill="#EB1C26" p-id="77521"></path></svg>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' ,lineHeight:'48px'}}>
                                QQ
                            </div>
                        </Flex>
                    </Center>
                    <Spacer borderBottom=' 1px #dbdbdb solid' />
                    <Center>
                        <PageSectionTitle>
                            快捷登录
                        </PageSectionTitle>
                    </Center>
                    <Center>
                        <ItemTitle>
                            使用QQ手机版扫码登录，或点击头像授权登录。
                        </ItemTitle>
                    </Center>
                    <Center>
                        <Flex>
                            <Box boxShadow='0 0px 12px rgba(0, 0, 0, 0.08)' margin='20px' padding='4px' borderRadius='4px'>
                                <QRCode value={`https://team.smallsaas.cn/#/my/myInvitationCode/LoadPage`} />
                            </Box>
                            <Box boxShadow='0 0px 12px rgba(0, 0, 0, 0.08)' margin='20px' padding='4px' borderRadius='4px'>
                                <div style={{
                                    backgroundImage: 'url(https://static.smallsaas.cn/house/2022/image/xiaojiangcheng.png)',
                                    backgroundSize: '100% 100%', width: '130px', height: '130px'
                                }} />
                            </Box>

                        </Flex>
                    </Center>

                    <Center>
                        <p >
                            授权即同意<a href="https://ti.qq.com/agreement/index.html" target="_blank">服务协议</a>和<a href="https://rule.tencent.com/rule/preview/3fd52bde-6555-453b-9ab8-c5f1f3d22c62" target="_blank">QQ隐私保护指引</a>
                        </p>
                    </Center>
                </Stack>
            </Center>
        </>

    )


}
