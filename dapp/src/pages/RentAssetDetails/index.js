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


export default function RentAssetDetails(props) {
  const endpoint = getEndpoint()
  const urlQuery = useQuery(props)
  const api = `/api/u/house/rent/rentCommon/userRentAssetDetails/${urlQuery.query.id}`

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState({})

  // const [detail] = useTokenRequest({ api })
  // if (detail === undefined || detail.length === 0) {
  //   return <div></div>
  // }

  useEffect(_ => {
    getDetail()
  }, [])

  function getDetail() {
    promiseAjax(api)
      .then(res => {
        setLoading(false)
        if (res.code == 200) {
          console.log('res == ', res)
          setDetail(res.data)
        }
      })
  }

  const { title = '', price = 0, area = 0, houseAssetModel = {}, rentDescribe = '', serverAvatar = '', serverName = '', serverPhone = '' } = detail
  const { houseType = '', floor = 0, direction = '', communityName = '', address } = houseAssetModel

  // // 需要转换的数据
  // const { cover = '', extra = '', houseTypePicture = '', introducePicture = '', slide = '', } = detail
  // // console.log('detail==', detail);
  // const { cadPicture = '' } = houseAssetModel
  // // 已转换的数据
  // let convertedExtra = convertStrToObj(extra)
  // let convertedSlidesArr = convertStrToImgUrlArr(introducePicture, endpoint)
  // let convertedCadPicture = convertStrToImgUrlArr(cadPicture, endpoint)

  //图片格式转化为url
  function handleVrSnapshotUrl(value) {
    if (value) {
      return endpoint + JSON.parse(value)[0].url
    }
  }

  //拿数据
  const facilitiesData = detail.facilities
  const homeData = detail.supportFacilities
 
  return (
    detail && JSON.stringify(detail) != '{}' ? (
      <ChakraProvider>
        {/* <div className='Global' /> */}
        <SetBarTitle text='房屋详情' />
        <div style={{ backgroundImage: `url(${handleVrSnapshotUrl(detail.houseAssetModel.vrPicture)})`, backgroundSize: '100% 100%', width: '100%', height: '260px' }}>
        </div>
        <PageModuleContainer fill='transparent'>
          <Stack spacing='2'>
            {/* {
          convertedSlidesArr && convertedSlidesArr.map((item, index) => <div key={index}>
          <img src={item} style={{
            width: '100%',
            height: '200px'
          }}/>
        </div>)
        } */}
            <ContainerSubtitle>{title}</ContainerSubtitle>
            <Flex>
              <Center w='' h=''>
                <ItemTitle>参考价格：</ItemTitle>
              </Center>
              <Flex gap='2px'>
                <Center h='14px' >
                  <Price>{parseInt(price)}</Price>
                </Center>
                <ItemTitleBold>元/月</ItemTitleBold>
              </Flex>
            </Flex>
            <Flex>
              <Box w='30px' h='30px'>
                <svg t="1659672225263" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34319" width="30" height="30"><path d="M778.24 260.608m-20.48 0a20.48 20.48 0 1 0 40.96 0 20.48 20.48 0 1 0-40.96 0Z" p-id="34320" fill="#8a8a8a"></path><path d="M479.232 904.704c7.68 10.752 19.968 16.896 32.768 16.896 13.312 0 25.088-6.144 32.768-16.896 27.648-37.376 98.816-135.68 162.304-241.152C784.896 532.992 824.32 435.2 824.32 372.736c0-11.264-9.216-20.48-20.48-20.48s-20.48 9.216-20.48 20.48c0 68.608-71.168 237.568-271.36 507.392-200.192-269.312-271.36-438.784-271.36-507.392 0-149.504 121.856-270.848 271.36-270.848 79.36 0 154.624 34.816 206.848 95.232 7.168 8.704 20.48 9.728 28.672 2.048 8.704-7.168 9.728-20.48 2.048-28.672-59.904-69.632-146.432-109.568-237.568-109.568-172.032 0-312.32 139.776-312.32 311.808 0 62.464 39.424 160.256 117.248 290.816 63.488 105.472 134.656 203.776 162.304 241.152zM688.64 936.448h-353.28c-11.264 0-20.48 9.216-20.48 20.48s9.216 20.48 20.48 20.48h353.28c11.264 0 20.48-9.216 20.48-20.48s-9.216-20.48-20.48-20.48z" p-id="34321" fill="#8a8a8a"></path><path d="M343.04 368.128c0 93.184 75.776 168.96 168.96 168.96s168.96-75.776 168.96-168.96-75.776-168.96-168.96-168.96-168.96 75.776-168.96 168.96z m296.96 0c0 70.656-57.344 128-128 128s-128-57.344-128-128 57.344-128 128-128 128 57.344 128 128z" p-id="34322" fill="#8a8a8a"></path></svg>
              </Box>
              <Center>
                <ItemTitle> {address}</ItemTitle>
              </Center>
            </Flex>
            <Spacer borderBottom='1px dashed #d6d3d3' />

            <PageSectionTitle>房源简介</PageSectionTitle>
            <Flex w=''>
              <Flex w='50%'>
                <Center>
                  <ContainerInactiveTitle>面积：</ContainerInactiveTitle>
                </Center>
                <PageSection> {area} m²</PageSection>
              </Flex>
              <Flex>
                <Center>
                  <ContainerInactiveTitle>房型：</ContainerInactiveTitle>
                </Center>
                <PageSection> {houseType}</PageSection>
              </Flex>
            </Flex>
            <Flex>
              <Flex w='50%'>
                <Center>
                  <ContainerInactiveTitle>楼层：</ContainerInactiveTitle>
                </Center>
                <PageSection>  {floor}</PageSection>
              </Flex>
              <Flex>
                <Center>
                  <ContainerInactiveTitle>朝向：</ContainerInactiveTitle>
                </Center>
                <PageSection>  {direction}</PageSection>
              </Flex>
            </Flex>

            <Spacer borderBottom='1px dashed #d6d3d3' />
            <Spacer />

            <PageSectionTitle>家具家电</PageSectionTitle>
            <ConditionalIem columns='3' homeData={homeData} />

            <Spacer />
            {/* <Container>
              {
                convertedExtra && convertedExtra.tags.map((item, index) => <Tag key={index}>{item.tagName}</Tag>
                )
              }
            </Container> */}
            <Spacer borderBottom='1px dashed #d6d3d3' />

            <PageSectionTitle>周边配套</PageSectionTitle>

            <SurroundingCconstruction detail={facilitiesData} />

            <Spacer />
            <Spacer borderBottom='1px dashed #d6d3d3' />

            <PageSectionTitle> 置业顾问 </PageSectionTitle>
            {/* 
            <AvatarCard title={serverName} subtitle={serverPhone} avatar={serverAvatar} navigation={''}>
              {''}
            </AvatarCard> */}
            <Flex boxShadow='0 0px 8px rgba(0, 0, 0, 0.08) ' padding='8px 0' >
              <Avatar size='70px' url={serverAvatar} />
              <Stack spacing='1'>
                <ItemTitleBold>
                  <>
                    {serverName}
                  </>
                </ItemTitleBold>
                <ItemTitle>
                  <>
                    手机号： {serverPhone}
                  </>
                </ItemTitle>
                <ItemTitle>
                  <>
                    微信号： {serverPhone}
                  </>
                </ItemTitle>
              </Stack>
            </Flex>
            <Spacer />
            <Spacer />
            <PageSectionTitle>照片展示</PageSectionTitle>
            {/* <div style={{ backgroundImage: `url(${handleVrSnapshotUrl(detail.houseAssetModel.houseTypePicture)})`, backgroundSize: '100% 100%', width: '100%', height: '260px' }}>
          </div> */}

            <Spacer borderBottom='1px dashed #d6d3d3' />
            <Spacer />

          </Stack>
        </PageModuleContainer>
      </ChakraProvider>
    ) : (
      <Center h='500px'>
        <Spin spinning={loading}></Spin>
      </Center>
    )
  )
}

// const convertStrToObj = str => {
//   if (str) {
//     let newObj = JSON.parse(str)
//     return newObj
//   }
// }

// const handleUrl = (str, endpoint) => endpoint + str

// // 将图片字段的字符串转成Url
// const convertStrToImgUrl = (str, endpoint) => {
//   if (str) {
//     let trimmed = str.slice(1, -1)
//     return endpoint + trimmed
//   }
// }
// // 将图片字段的字符串转成Url数组
// const convertStrToImgUrlArr = (str, endpoint) => {
//   if (str) {
//     let trimmed = str.slice(1, -1)
//     let arr = trimmed.split(',')
//     let objArr = arr.map(item => JSON.parse(item))
//     return objArr.map(item => endpoint + item.url)
//   }
// }