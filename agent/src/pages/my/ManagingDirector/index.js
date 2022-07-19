import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text, Center } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PageModuleContainer from '@/components/Container/PageModuleContainer';
import UserInformation from '../UserInformation.js';
import Head from './head/config';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import Router from '@/components/presenter/card/Router';
import AvatarCard from '@/components/presenter/card/AvatarCard';

import { history } from 'umi';


export default function index(props) {

    function myInvitationCode() {
        history.push('/my/myInvitationCode')
    }

    const api = '/api/u/saasAgent/myAgentInfo'
    // const api = '/api/u/saasAgent/myAgentInfo'


    const [data] = useTokenRequest({ api });
    console.log(data, '===data')
    return (
        <>
            {data ? (
                // <PageModuleContainer>
                    <CssCart backgroundColor='' >
                        <CssCart padding='20px 20px 0 20px ' backgroundColor='#78d2c1' height='120px'>
                            <AvatarCard title={data.name} subtitle={data.status} avatar='http://static.smallsaas.cn/house/2022/svg/Router/invite.svg' >
                                <div onClick={myInvitationCode}>
                                    <svg t="1657852777276" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="39101" width="34" height="34"><path d="M39.733 2.713c134.546 0 269.093 0 403.64 0 41.046 4.065 31.153 76.317 31.153 123.259 0 84.316 0 139.888 0 223.491 0 48.574 9.147 108.108-23.027 121.904-20.952 8.986-77.185 2.71-104.296 2.71-74.433 0-134.937 0-214.01 0-49.472 0-117.022 11.808-124.613-31.154 0-136.352 0-272.704 0-409.056C14.111 18.63 23.842 7.592 39.733 2.713zM95.268 94.818c0 97.073 0 194.144 0 291.216 97.073 0 194.143 0 291.215 0 0-98.427 0-196.853 0-295.28-96.62 0-193.241 0-289.861 0C95.044 90.982 95.151 92.896 95.268 94.818zM581.531 2.713c134.545 0 269.093 0 403.638 0 16.466 6.109 27.779 17.371 31.153 36.571 0 132.74 0 265.482 0 398.221-3.693 16.548-12.334 30.684-28.444 35.217-26.328 7.408-70.075 1.354-101.586 1.354-74.243 0-135.119 0-207.238 0-31.253 0-77.568 6.584-102.941-1.354-35.816-11.206-25.735-81.123-25.735-130.032 0-64.966 0-140.801 0-208.592C550.377 77.629 537.982 10.603 581.531 2.713zM637.064 94.818c0 97.073 0 194.144 0 291.216 97.072 0 194.144 0 291.216 0 0-98.427 0-196.853 0-295.28-96.619 0-193.24 0-289.86 0C636.841 90.982 636.948 92.896 637.064 94.818zM228.008 180.151c40.558-7.654 72.453 19.75 73.143 56.889 0.909 48.975-49.112 75.88-88.042 55.534C168.571 269.297 171.502 190.815 228.008 180.151zM769.806 180.151c95.534-17.848 93.701 133.448 0 117.841C710.174 288.062 708.249 191.652 769.806 180.151zM440.664 1024c-133.191 0-266.383 0-399.576 0-16.588-5.083-27.793-15.549-32.507-32.507 0-135.9 0-271.803 0-407.703 3.945-11.931 13.053-25.849 27.089-29.798 26.514-7.461 69.824-1.354 101.587-1.354 73.001 0 139.132 0 207.238 0 30.627 0 75.201-6.836 102.94 1.354 37.529 11.08 27.091 79.862 27.091 128.676 0 75.039 0 139.05 0 215.364C474.526 950.718 485.871 1019.297 440.664 1024zM95.268 644.743c0 97.073 0 194.144 0 291.215 97.073 0 194.143 0 291.215 0 0-98.427 0-196.852 0-295.279-96.62 0-193.241 0-289.861 0C95.044 640.907 95.151 642.82 95.268 644.743zM1016.322 589.209c0 37.925 0 75.852 0 113.777-3.16 38.378-0.452 82.622-1.354 123.258-96.168 0-192.337 0-288.507 0 0-22.122 0-44.247 0-66.37-27.09-3.157-60.047-0.451-89.396-1.354-3.16 85.785-0.451 177.438-1.354 265.48-17.608 0-35.217 0-52.826 0-45.421-9.103-32.508-77.259-32.508-131.387 0-75.5 0-137.62 0-209.945 0-31.567-6.389-78.892 1.355-104.295 9.238-30.309 49.304-25.735 89.396-25.735 67.778 0 128.163 0 196.4 0 0 60.048 0 120.099 0 180.147 30.25 0 60.501 0 90.751 0 0.902-59.599-1.806-122.808 1.355-180.147C973.306 550.053 1013.757 550.689 1016.322 589.209zM234.78 728.722c43.307-4.794 79.106 36.827 62.306 82.623C273.8 874.822 162.46 850.966 183.31 770.711 189.073 748.526 205.72 731.938 234.78 728.722zM823.985 1024c-32.508 0-65.017 0-97.524 0 0.903-34.766-1.805-73.141 1.355-105.651 32.056 0 64.112 0 96.169 0C823.985 953.566 823.985 988.783 823.985 1024zM1016.322 918.349c0 23.027 0 46.054 0 69.08-3.766 19.262-15.028 31.024-32.509 36.571-23.025 0-46.052 0-69.078 0 0.903-34.766-1.805-73.141 1.355-105.651C949.502 918.349 982.911 918.349 1016.322 918.349z" p-id="39102" fill="#4b5c6b"></path></svg>
                                </div>
                            </AvatarCard>
                        </CssCart>

                        <CssCart backgroundColor='#f2f2f6' height='100%' width='100%' position='fixed' padding='10px'>
                            <>
                                <Head list={data} />
                                <CssCart padding=' 0'  boxShadow='0 2px 4px rgba(0, 0, 0, 0.08)' borderRadius='10px' margin='8px 0 16px 0' overflow='hidden'>
                                    <Router items={[
                                        { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/invite.svg", "title": "我的邀请", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/MyInvite?level=2" },
                                        { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/ThreeLevelAgent.svg", "title": "三级代理", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/MyTeam?level=2" },
                                        { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/history.svg", "title": "二级代理", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/proxyDetails?level=2" },
                                        ]} />
                                </CssCart>
                                <CssCart padding=' 0'  boxShadow='0 2px 4px rgba(0, 0, 0, 0.08)' borderRadius='10px' margin='8px 0 10px 0' overflow='hidden'>
                                    <Router items={[
                                        { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/report.svg", "title": "结算报表", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/SettlementStatements?level=2" },
                                        { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/history.svg", "title": "历史", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/agent?level=2" },
                                        { "icon": "http://static.smallsaas.cn/house/2022/svg/Router/SetUp.svg", "title": "设置", "nextIcon": "http://static.smallsaas.cn/house/2022/svg/Router/enter.svg", "navigation": "/my/Set/GeneralAgentSet?level=2" },
                                    ]} />
                                </CssCart>
                            </>
                        </CssCart>

                    </CssCart>
                // </PageModuleContainer>
            ) :
                <></>}

        </>
    )


}
