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
  // if (detail === undefined || detail.length === 0) {
  //   return <div></div>
  // }

  const { title = '', price = 0, area = 0, houseAssetModel = {},
    rentDescribe = ''
  } = detail
  const { houseType ='', floor = 0, direction = '', communityName = ''
  } = houseAssetModel

  // 需要先转换
  const { cover = '', extra = '', cadPicture = '', houseTypePicture = '',
  introducePicture = '', slide= '' 
  } = detail
  // 已转换的数据
  let convertedExtra = convertStrToObj(extra)
  let convertedSlides = convertStrToImgUrlArr(slide)


  return (
    <PageModuleContainer>
      <Carousel>
        {
          // convertStrToImgUrlArr(detail.slice).map((item, index) => {
          //   return (
          //     <div>
          //       {/* <image src={item.url}/> */}
          //       <h3>{item.url}</h3>
          //     </div>
          //   )
          // })
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
      <Spacer/>
      <PageSectionTitle>房屋情况</PageSectionTitle>
      <Container>
        {/* <div>
          小区：{communityName}
        </div> */}
        <div>
          介绍：{rentDescribe}
        </div>
      </Container>
      <PageSectionTitle>户型图</PageSectionTitle>
      <Container>
        <div style={{ backgroundImage: `url(${handleUrl(houseTypePicture)})`, width: '100%', height: '250px', margin: "10px 0 20px 0" }}>
        </div>
      </Container>
      <PageSectionTitle>小区·{communityName}</PageSectionTitle>
    </PageModuleContainer>
    // <div>
    //   <button onClick={() => {
    //     console.log(detail)
    //     console.log(houseAssetModel)
    //   }}>测试</button>
    // </div>
  )
}


const convertStrToObj = str => {
  if (str) {
    let newObj = JSON.parse(str)
    return newObj
  }
}

const handleUrl = str => {
  if (str) {
    return endpoint + JSON.parse(str)[0].url
  }
}

const convertStrToImgUrlArr = str => {
  if (str) {
    let url = JSON.parse
    return url
  }
}