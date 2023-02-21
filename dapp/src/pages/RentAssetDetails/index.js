import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { getEndpoint } from 'zero-element-boot/lib/components/config/common'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer'
import Cart from 'zero-element-boot/lib/components/cart/Cart'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'
import { Flex, Center, Spacer, Stack, Box, Text, ChakraProvider } from '@chakra-ui/react'
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import Price from 'zero-element-boot-plugin-theme/lib/components/text/Price';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import PageSection from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSection';
import ItemCart from 'zero-element-boot-plugin-theme/lib/components/cart/ItemCart';
import SurroundingCconstruction from '@/components/SurroundingCconstruction';
import promiseAjax from 'zero-element-boot/lib/components/utils/request';
import ConditionalIem from '@/components/ConditionalDisplay';
import Avatar from 'zero-element-boot/lib/components/presenter/Avatar'
import SetBarTitle from '@/components/setBarTitle'
// const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
import Toast from 'antd-mobile/es/components/toast'
import ImageViewer from 'antd-mobile/es/components/image-viewer'
import RouterBox from 'zero-element-boot-presenter/lib/components/presenter/card/RouterBox';
import Images from './images'
import { history } from 'umi';

export default function RentAssetDetails(props) {
  const endpoint = getEndpoint()
  const urlQuery = useQuery(props)
  const userId = urlQuery.query.userId || ''


  const api = `/api/u/house/rent/rentCommon/userRentAssetDetails/${urlQuery.query.id}?userId=${userId}`

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState('')
  const [loginStatus, setLoginStatus] = useState(true)


  function getDetail() {
    promiseAjax(api).then(res => {
      setLoading(false)
      if (res.code == 200) {
        let detailData = res.data
        setDetail(detailData)
      }
    })
  }

  //判断登录状态，未登录无法使用关注功能
  useEffect(_ => {
    getDetail()
    if (!urlQuery.query.userId) {
      setLoginStatus(false)
    }
  }, [])


  console.log('11111111', detail)

  const houseType = detail.houseType || ' -'
  const toward = detail.toward || ' -'
  const communityName = detail.communityName || ' -'
  const address = detail.address || ' -'
  const price = detail.price || '0'
  const area = detail.area || '0'
  const rentDescribe = detail.rentDescribe || ' -'
  const serverAvatar = detail.serverAvatar || ' -'
  const serverName = detail.serverName || ' -'
  const serverPhone = detail.serverPhone || ' -'
  const contact = detail.contact || ' -'
  const userAppointment =detail.userAppointment || ''
  //图片格式转化为url
  function handleVrSnapshotUrl(value) {
    let url = (value.indexOf('[') == -1) ? value : value.split('"')['3']
    if ((url.indexOf('http') == -1) || (url.indexOf('https') == -1)) {
      return endpoint + url
    } else {
      return url
    }
  }

  //周边配套和家具家电数据
  const facilitiesData = detail.facilities || []
  const homeData = detail.supportFacilities

  //照片展示的数据 转化格式
  let introducePicture = detail.introducePicture

  if (introducePicture) {
    introducePicture = JSON.parse(introducePicture)
  }


  //关注房屋
  const subscribeStatus = detail.subscribeStatus

  function onConcern() {
    const query = {
      "subscribeId": `${urlQuery.query.id}`
    }
    promiseAjax(`/api/u/house/rent/subscribe/subscribeSwitch?userId=${userId}`, query, { method: "POST" })
      .then(res => {
        // console.log(res, '== 更新')
        if (res && res.code === 200) {
          if (!subscribeStatus) {
            Toast.show(
              '已关注',
              1
            )
          } else {
            Toast.show(
              '已取消关注',

              1
            )
          }
          getDetail()
        }
      })
  }

  function handleViewVr() {
    const url = detail.houseAssetModel.vrLink
    if (url) {
      window.location.href = `${url}`
    } else {
      Toast.show(
        'VR链接跳转错误',
        1
      )
    }
  }
  // 图片展示状态
  const [visible, setVisible] = useState(false)
  return (
    detail && JSON.stringify(detail) != '{}' ? (
      <ChakraProvider>
        <SetBarTitle text='房屋详情' />
        {/* <div onClick={() => setVisible(true)} style={{
          backgroundImage: `url(${handleVrSnapshotUrl(detail.cover)})`,
          backgroundRepeat: " no-repeat",
          backgroundPosition: "center",
          backgroundSize: 'cover',
          width: '100%',
          height: '260px'
        }}
        /> */}
        <div onClick={handleViewVr}
          style={{
            backgroundImage: `url(${handleVrSnapshotUrl(detail.cover)})`,
            backgroundRepeat: " no-repeat",
            backgroundPosition: "center",
            backgroundSize: 'cover',
            width: '100%',
            height: '260px'
          }}
        />
        {/* <ImageViewer
          image={handleVrSnapshotUrl(detail.cover)}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
          /> */}

        <Stack spacing='2' padding='10px  10px 0 10px '>
          <ContainerSubtitle>{rentDescribe}</ContainerSubtitle>
          <Flex W='100%'>
            <Flex w='88%'>
              <Center w='' h=''>
                <ItemTitle>参考价格：</ItemTitle>
              </Center>
              <Flex gap='2px' W=''>
                <Center h='14px' >
                  <Price>{parseInt(price)}</Price>
                </Center>
                <ItemTitleBold>元/月</ItemTitleBold>
              </Flex>
            </Flex>
            <Center h='14px' onClick={() => onConcern()}>
              {/* //判断登录状态，未登录无法使用关注功能 */}
              {loginStatus ?
                (subscribeStatus ?
                  <svg t="1661393805451" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16279" width="28" height="28"><path d="M1020.85564 385.279248c-8.427984-26.487948-30.099941-45.751911-57.189888-49.965902l-83.075838-12.641975-171.569665-29.497942c-10.23398-1.805996-19.263962-8.427984-24.079953-18.059965l0-0.601999c-0.601999-2.407995-0.601999-4.213992-1.805996-6.621987L575.978509 41.537919c-3.009994-6.621987-7.223986-12.641975-11.437978-17.457966l0 0 0 0C550.694558 9.029982 532.634593 0 512.768632 0c-27.089947 0-51.1699 15.651969-63.209877 40.93592L329.158991 294.979424 60.667515 335.915344c-27.089947 4.213992-48.761905 22.875955-57.189888 49.965902-8.427984 27.089947-1.203998 55.985891 18.059965 75.249853l194.44562 197.455614-45.751911 278.725456c-4.815991 27.691946 6.019988 55.383892 28.293945 71.63786 21.671958 16.855967 50.567901 18.661964 74.045855 5.417989l240.197531-131.837743 240.197531 131.837743c10.23398 6.019988 21.671958 8.427984 32.507937 8.427984 14.447972 0 28.895944-4.815991 41.537919-14.447972 21.671958-16.855967 32.507937-43.945914 28.293945-71.63786l-45.751911-278.725456 194.44562-197.455614C1022.661636 441.265138 1029.283623 412.369195 1020.85564 385.279248z" p-id="16280" fill="#fcee21"></path></svg>
                  :
                  <svg t="1661394278887" class="icon" viewBox="0 0 1059 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18105" width="28" height="28"><path d="M253.488042 1024c-16.9 0-33.2875-5.1125-47.6125-15.3625-26.625-18.425-39.425-49.6625-34.3125-81.925l40.9625-251.9c1.5375-10.2375-1.5375-20.475-8.7-27.65L28.213042 466.4375c-22.0125-22.525-29.1875-55.3-19.45-84.9875 9.725-29.7 35.325-51.2 66.05-55.8125l237.575-36.35c10.75-1.5375 19.4625-8.1875 24.0625-17.925L441.388042 48.125c13.825-29.7 42.5-48.125 75.2625-48.125s61.4375 18.4375 75.2625 48.125l104.45 223.2375c4.6125 9.725 13.825 16.375 24.0625 17.925L958.000542 325.625a82.355 82.355 0 0 1 66.05 55.8125c10.2375 29.7 2.5625 62.4625-19.45 84.9875l-175.625 180.7375c-7.1625 7.175-10.2375 17.925-8.7 27.65l40.9625 251.9c5.125 31.75-8.1875 63.4875-34.3 81.925-26.1125 18.4375-59.9 20.4875-88.0625 4.6125l-206.85-114.6875c-9.725-5.1125-20.9875-5.1125-30.7125 0l-207.3625 115.2c-12.8125 6.65-26.6375 10.2375-40.4625 10.2375zM516.650542 51.2c-12.8 0-23.55 7.1625-29.1875 18.4375L383.525542 292.875c-11.775 25.0875-35.325 43.0125-62.975 47.1l-237.575 36.35c-12.2875 2.05-21.5 9.7375-25.6 21.5-4.1 11.775-1.025 24.0625 7.675 32.775L240.688042 611.325c18.4375 18.95 26.625 45.5625 22.525 71.675L222.250542 934.9125c-2.05 12.8 3.075 24.575 13.3125 31.7375 10.2375 7.175 23.0375 7.6875 33.7875 1.5375l207.3625-115.2c25.0875-13.825 55.3-13.825 80.3875 0l207.3625 115.2c10.75 6.1375 23.55 5.625 33.8-1.5375 10.2375-7.1625 15.3625-18.95 13.3125-31.7375L770.625542 683.0125c-4.1-26.1125 4.1-52.7375 22.525-71.675l175.625-180.7375c8.7-8.7 11.2625-20.9875 7.675-32.775-4.0875-11.775-13.3125-19.9625-25.6-21.5l-237.5625-36.35c-27.65-4.0875-51.2-22.0125-62.975-47.1L545.838042 69.6375c-5.625-11.2625-16.375-18.4375-29.1875-18.4375z m0 0" p-id="18106" fill="#8a8a8a"></path></svg>
                )
                : <></>
              }
            </Center>
          </Flex>
          <Flex>
            <Box w='30px' h='40px'>
              <svg t="1659672225263" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34319" width="30" height="30"><path d="M778.24 260.608m-20.48 0a20.48 20.48 0 1 0 40.96 0 20.48 20.48 0 1 0-40.96 0Z" p-id="34320" fill="#8a8a8a"></path><path d="M479.232 904.704c7.68 10.752 19.968 16.896 32.768 16.896 13.312 0 25.088-6.144 32.768-16.896 27.648-37.376 98.816-135.68 162.304-241.152C784.896 532.992 824.32 435.2 824.32 372.736c0-11.264-9.216-20.48-20.48-20.48s-20.48 9.216-20.48 20.48c0 68.608-71.168 237.568-271.36 507.392-200.192-269.312-271.36-438.784-271.36-507.392 0-149.504 121.856-270.848 271.36-270.848 79.36 0 154.624 34.816 206.848 95.232 7.168 8.704 20.48 9.728 28.672 2.048 8.704-7.168 9.728-20.48 2.048-28.672-59.904-69.632-146.432-109.568-237.568-109.568-172.032 0-312.32 139.776-312.32 311.808 0 62.464 39.424 160.256 117.248 290.816 63.488 105.472 134.656 203.776 162.304 241.152zM688.64 936.448h-353.28c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h353.28c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48z" p-id="34321" fill="#8a8a8a"></path><path d="M343.04 368.128c0 93.184 75.776 168.96 168.96 168.96s168.96-75.776 168.96-168.96-75.776-168.96-168.96-168.96-168.96 75.776-168.96 168.96z m296.96 0c0 70.656-57.344 128-128 128s-128-57.344-128-128 57.344-128 128-128 128 57.344 128 128z" p-id="34322" fill="#8a8a8a"></path></svg>
            </Box>
            <Center h='66px' >
              <p style={{ fontSize: '14px', lineHeight: '26px' }}> 位于 {communityName} {address || '-'}</p>
            </Center>
          </Flex>
          <Spacer borderBottom='1px dashed #d6d3d3' />
          <PageSectionTitle>简介</PageSectionTitle>
        </Stack>
        <Flex display="flex" padding='0 30px' justifyContent='center' fontWeight='bold' >
          <Box w='30%' display="flex" justifyContent='center'>面积</Box>
          <Box w='30%' display="flex" justifyContent='center'>房型</Box>
          <Box w='30%' display="flex" justifyContent='center'>朝向</Box>
        </Flex>
        <Flex display="flex" padding='0 30px' justifyContent='center' color='#8a8a8a' margin='10px 0'>
          <Box w='30%' display="flex" justifyContent='center'>{area || '0'}m²</Box>
          <Box w='30%' display="flex" justifyContent='center'>{houseType || '-'}</Box>
          <Box w='30%' display="flex" justifyContent='center'>{toward || '-'}</Box>
        </Flex>
        {/* 
        <RouterBox columns='3' items={[
          { "title": "面积", "value": `${area || '0'}` },
          { "title": "房型", "value": `${houseType || '0'}` },
          // { "title": "楼层", "value": `${floor || '0'}` },
          { "title": "朝向", "value": `${direction || '0'}` },
        ]} /> */}
        <Stack spacing='2' padding='0 10px 10px 10px'>
          <Spacer borderBottom='1px dashed #d6d3d3' />
          <Spacer />
          <PageSectionTitle>家具家电</PageSectionTitle>
          <ConditionalIem columns='3' homeData={homeData} />

          <PageSectionTitle>房子描述</PageSectionTitle>
          <CssCart background='#' border='1px dotted  #d0cdcd' height='' borderRadius='4px' padding='8px'>
            <p>
              <span style={{ fontSize: '14px' }} >{detail.rentDescribe}</span>
            </p>
          </CssCart>
          <Spacer />

          <Spacer borderBottom='1px dashed #d6d3d3' />

          <PageSectionTitle>周边配套</PageSectionTitle>

          <SurroundingCconstruction detail={facilitiesData} />

          <Spacer />
          <Spacer borderBottom='1px dashed #d6d3d3' />
          <PageSectionTitle> 置业顾问 </PageSectionTitle>


          <Flex boxShadow='0 0px 8px rgba(0, 0, 0, 0.08) ' padding='8px 0' >
            <Avatar size='70px' url={handleVrSnapshotUrl(serverAvatar)} />
            <Stack spacing='1'>
              <ItemTitleBold>
                <>
                  {serverName}
                </>
              </ItemTitleBold>
              {
                userAppointment ?
                  <>
                    <ItemTitle>
                      <>
                        手机号： {contact}
                      </>
                    </ItemTitle>
                    <ItemTitle>
                      <>
                        微信号： {serverPhone}
                      </>
                    </ItemTitle>
                  </>
                  :
                  <Center bg='' h='100%'>
                     <ItemTitle>
                      <>
                      预约可查看置业顾问的联系方式
                      </>
                    </ItemTitle>
                  </Center>
              }

            </Stack>
          </Flex>
          <Spacer />
          <Spacer />
          {
            Array.isArray(introducePicture) && introducePicture.map((item, index) => (
              <Images item={item} key={index} />
            ))
          }
          <Spacer />
        </Stack>
      </ChakraProvider>
    ) : (
      <Center h='500px'>
        <Spin spinning={loading}></Spin>
      </Center>
    )
  )
}
