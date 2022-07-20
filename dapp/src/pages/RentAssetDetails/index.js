import React from 'react'
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
import Tags from '@/components/tags/Tags'

export default function RentAssetDetails(props) {
  const endpoint = getEndpoint()
  const urlQuery = useQuery(props)
  const api = `/api/u/house/rent/rentCommon/userRentAssetDetails/${urlQuery.query.id}`

  const [detail] = useTokenRequest({ api })
  // if (detail === undefined || detail.length === 0) {
  //   return <div></div>
  // }

  const { title = '', price = 0, area = 0, houseAssetModel = {} } = detail
  const { houseType ='', floor = 0, direction = '' } = houseAssetModel
  const { cover = '', extra = '', cadPicture = '', houseTypePicture = '', introducePicture = '', slide= '' } = detail

  return (
    <PageModuleContainer>
      <Container>
        <div>{title}</div>
      </Container>
      <Container>
        <div>{parseInt(price)}元/月</div>
      </Container>
      <Cart>
        <Container>
          <Gridbox columns='4'>
            <ContainerInactiveTitle>
              <ContainerInactiveTitle>{houseType}</ContainerInactiveTitle>
              <ContainerInactiveTitle>房型</ContainerInactiveTitle>
            </ContainerInactiveTitle>
            <ContainerInactiveTitle>
              <ContainerInactiveTitle>{area}</ContainerInactiveTitle>
              <ContainerInactiveTitle>面积</ContainerInactiveTitle>
            </ContainerInactiveTitle>
            <ContainerInactiveTitle>
              <ContainerInactiveTitle>{floor}</ContainerInactiveTitle>
              <ContainerInactiveTitle>楼层</ContainerInactiveTitle>
            </ContainerInactiveTitle>
            <ContainerInactiveTitle>
              <ContainerInactiveTitle>{direction}</ContainerInactiveTitle>
              <ContainerInactiveTitle>朝向</ContainerInactiveTitle>
            </ContainerInactiveTitle>
          </Gridbox>
        </Container>
      </Cart>
      <Spacer/>
      {/* <Container>
        <Tags tagList={JSON.parse(extra).tags} />
      </Container> */}
    </PageModuleContainer>
    // <div>
    //   <button onClick={() => {
    //     console.log(detail)
    //     console.log(houseAssetModel)
    //   }}>测试</button>
    // </div>
  )
}
