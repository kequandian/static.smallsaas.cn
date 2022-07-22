import React from 'react'
import { Carousel, Tag } from 'antd'
import { Spacer } from '@chakra-ui/layout'
import { getEndpoint } from 'zero-element-boot/lib/components/config/common'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer'
import Cart from 'zero-element-boot/lib/components/cart/Cart'
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Container from 'zero-element-boot/lib/components/container/Container'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox'
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox'
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle'

export default function RentAssetDetails(props) {
  const endpoint = getEndpoint()
  const urlQuery = useQuery(props)
  const api = `/api/u/house/rent/rentCommon/userRentAssetDetails/${urlQuery.query.id}`

  const [detail] = useTokenRequest({ api })
  if (detail === undefined || detail.length === 0) {
    return <div></div>
  }

  const { title = '', price = 0, area = 0, houseAssetModel = {},
    rentDescribe = '', serverAvatar = '', serverName = '', serverPhone = ''
  } = detail
  const { houseType ='', floor = 0, direction = '', communityName = ''
  } = houseAssetModel

  // 需要转换的数据
  const { cover = '', extra = '', houseTypePicture = '',
    introducePicture = '', slide= '' 
  } = detail
  const { cadPicture = '' } = houseAssetModel
  // 已转换的数据
  let convertedExtra = convertStrToObj(extra)
  let convertedSlidesArr = convertStrToImgUrlArr(slide, endpoint)
  let convertedCadPicture = convertStrToImgUrlArr(cadPicture, endpoint)

  return (
    <PageModuleContainer>
      <Carousel>
        {
          convertedSlidesArr && convertedSlidesArr.map((item, index) => <div key={index}>
          <img src={item} style={{
            width: '100%',
            height: '200px'
          }}/>
        </div>)
        }
      </Carousel>
      <Container>
        <div style={{fontSize: '20px'}}>{title}</div>
      </Container>
      <Container>
        <div style={{fontSize: '18px', color: '#ec613e'}}>{parseInt(price)}元/月</div>
      </Container>
      <Cart>
        <Container>
          <Gridbox columns='4'>
            <div style={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}>
              <div>{houseType}</div>
              <div>房型</div>
            </div>
            <div style={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}>
              <div>{area}m²</div>
              <div>面积</div>
            </div>
            <div style={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}>
              <div>{floor}</div>
              <div>楼层</div>
            </div>
            <div style={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}>
              <div>{direction}</div>
              <div>朝向</div>
            </div>
          </Gridbox>
        </Container>
      </Cart>
      <Container>
        {
          convertedExtra && convertedExtra.tags.map((item, index) => <Tag key={index}>{item.tagName}</Tag>)
        }
      </Container>
      <PageSectionTitle>房屋情况</PageSectionTitle>
      <Container>
        <div>
          介绍：{rentDescribe}
        </div>
      </Container>
      {/* <PageSectionTitle>户型图</PageSectionTitle>
      <Container>
        <div>
          <img src={convertedCadPicture[0]} style={{
            width: '150px',
            height: '150px'
          }}/>
        </div>
        {
          console.log('convertedCadPicture' + convertedCadPicture)
        }
      </Container> */}
      <PageSectionTitle>
        <div>置业顾问</div>
      </PageSectionTitle>
      <Container>
        <div style={{
          display: 'flex'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden'
          }}>
            <img src={serverAvatar}/>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px'
          }}>
            <div style={{
              fontSize: '14px'
            }}>{serverName}</div>
            <div style={{
              fontSize: '12px'
            }}>{serverPhone}</div>
          </div>
        </div>
      </Container>
      <PageSectionTitle>
        <div>小区·{communityName}</div>
      </PageSectionTitle>
    </PageModuleContainer>
  )
}


const convertStrToObj = str => {
  if (str) {
    let newObj = JSON.parse(str)
    return newObj
  }
}

const handleUrl = (str, endpoint) => endpoint + str

// 将图片字段的字符串转成Url
const convertStrToImgUrl = (str, endpoint) => {
  if (str) {
    let trimmed = str.slice(1, -1)
    return endpoint + trimmed
  }
}
// 将图片字段的字符串转成Url数组
const convertStrToImgUrlArr = (str, endpoint) => {
  if (str) {
    let trimmed = str.slice(1, -1)
    let arr = trimmed.split(',')
    let objArr = arr.map(item => JSON.parse(item))
    return objArr.map(item => endpoint + item.url)
  }
}