import React, { useState, useEffect } from 'react';
import GoodHouse from './config';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle';
import { Flex, Box, Spacer, ChakraProvider } from '@chakra-ui/react'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import { getEndpoint } from 'zero-element-boot/lib/components/config/common';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import SetBarTitle from '@/components/setBarTitle'

// import { Helmet } from 'umi'

const endpoint = getEndpoint()

export default function (props) {


    const urlQuery = useQuery(props)

    const api = `/api/u/asset/user/rent/details/${urlQuery.query.id}`

    const [detail] = useTokenRequest({ api });


    function handleVrSnapshotUrl(value) {
        if (value) {

            return endpoint + JSON.parse(value)[0].url
        }
    }

    if (detail === undefined || detail.length == 0) {
        return (<div></div>)
    }

    // console.log(detail, '==detail')


    const { houseType, direction, floor, unitArea, houseTypePicture, rentDescribe } = detail

    const formatHtmlString = rentDescribe.replace(/src="/g, `src="${endpoint}`)

    console.log('formatHtmlString == ', formatHtmlString)


    return (
        <ChakraProvider>

            <SetBarTitle text='房屋详情' />
            <PageModuleContainer>
                {/* <CssCart width='100%' padding=' ' backgroundColor='#f5f5f5'> */}
                <div >
                    <div style={{ backgroundImage: `url(${handleVrSnapshotUrl(detail.vrSnapshot)})`, backgroundSize: '100% 100%', width: '100%', height: '260px' }}>
                    </div>
                    <Cart fill='#ffffff' margin='4px' padding='2px' linewidth='0' corner='2px'  >
                        <>
                            <PageSectionTitle>详情</PageSectionTitle>

                            <Cart fill='#f5f5f560' linewidth='0' margin='10px 0 20px 0' padding='10px 10px 10px 40px'>
                                <Container>
                                    <Gridbox columns='2' >
                                        <ContainerInactiveTitle fontSize='12px'>
                                            <svg t="1657003667123" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7827" width="20" height="20">
                                                <path d="M766.196 352.827H615.439V235.055c0-35.795-25.165-64.869-56.125-64.869h-301.51c-30.995 0-56.092 29.074-56.092 64.869v553.889c0 35.794 25.097 64.869 56.092 64.869h508.392c30.959 0 56.091-29.075 56.091-64.869V417.662c0-35.76-25.132-64.835-56.091-64.835z m20.434 408.037c0 33.326-18.789 54.479-46.285 54.479H281.427c-27.532 0-43.92-23.04-43.92-56.365l-0.103-489.878c0-2.469-5.109-60.343 47.074-60.343l248.607-0.068c27.498 0 46.663 22.389 46.663 55.715v166.835h35.691v-39.874l124.527-0.034c27.496 0 46.663 22.389 46.663 55.714v313.819z" p-id="7828" fill="#949494"></path><path d="M579.611 594.234h35.691v229.372h-35.691zM227.255 524.188h229.373v41.178H227.255zM528.388 419.444h138.104v41.178H528.388z" p-id="7829" fill="#949494"></path></svg>
                                            <ContainerInactiveTitle fontSize='12px'>
                                                {houseType}
                                            </ContainerInactiveTitle>
                                        </ContainerInactiveTitle>
                                        <ContainerInactiveTitle fontSize='12px'>
                                            <svg t="1657004231434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8957" width="20" height="20">
                                                <path d="M469.333333 810.666667v42.666666a42.666667 42.666667 0 0 0 85.333334 0v-42.666666h-85.333334z m170.666667-85.333334v128a128 128 0 0 1-256 0v-128h256z m-170.666667-341.333333v85.333333h85.333334V384h-85.333334z m170.666667-85.333333v256H384V298.666667h256z" p-id="8958" fill="#949494"></path><path d="M248.661333 128l-85.333333 85.333333 85.333333 85.333334H896V128H248.661333zM981.333333 42.666667v341.333333H213.333333L42.666667 213.333333l170.666666-170.666666h768zM860.672 640l-85.333333-85.333333H128v170.666666h647.338667l85.333333-85.333333zM42.666667 469.333333h768l170.666666 170.666667-170.666666 170.666667H42.666667v-341.333334z" p-id="8959" fill="#949494"></path></svg>
                                            <ContainerInactiveTitle fontSize='12px'>
                                                {direction}
                                            </ContainerInactiveTitle>
                                        </ContainerInactiveTitle>
                                        <ContainerInactiveTitle fontSize='12px'>
                                            <svg t="1657004321668" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9575" width="20" height="20">
                                                <path d="M861.76 836.16H249.12V635.04h137.12v-137.12h137.12v-137.12h137.28V224h201.12z m-548.64-64h484.64V288h-73.12v137.12h-137.28v137.12h-137.12v137.12h-137.12z" fill="#949494" p-id="9576"></path><path d="M96 781.28h765.76v54.88H96z" fill="#707000" p-id="9577"></path><path d="M154.08 224H256v27.68h-68.8v43.36h59.04v27.68H187.2v67.36H154.08z" p-id="9578" fill="#949494"></path></svg>
                                            <ContainerInactiveTitle fontSize='12px'>
                                                第 {floor} 层
                                    </ContainerInactiveTitle>
                                        </ContainerInactiveTitle>
                                        <ContainerInactiveTitle fontSize='12px'>
                                            <svg t="1657004365237" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10682" width="20" height="20">
                                                <path d="M898.56 284.672c15.36 0 27.648-12.288 27.648-27.136V126.976c0-15.36-12.288-27.648-27.648-27.648H768c-15.36 0-27.648 12.288-27.648 27.648v29.696H286.208v-29.696c0-15.36-12.288-27.648-27.648-27.648H128c-15.36 0-27.648 12.288-27.648 27.648v130.048c0 15.36 12.288 27.648 27.648 27.648h31.744v452.096H128c-15.36 0-27.648 12.288-27.648 27.648v130.56c0 15.36 12.288 27.648 27.648 27.648h130.56c14.848 0 27.136-12.288 27.648-27.648v-33.28h454.144v33.28c0 15.36 12.288 27.648 27.648 27.648h130.56c15.36 0 27.648-12.288 27.648-27.648v-130.56c0-15.36-12.288-27.648-27.648-27.648H865.28V284.672h33.28zM155.648 229.376V154.112h75.264v75.264H155.648z m75.264 637.952H155.648v-75.264h75.264v75.264z m509.44-102.912v33.28H286.208v-33.28c0-15.36-12.288-27.648-27.648-27.648h-34.816V284.672h34.816c14.848 0 27.136-12.288 27.648-27.136v-36.864h454.144v36.352c0 15.36 12.288 27.648 27.648 27.648h33.28v452.096H768c-15.36 0-27.648 12.288-27.648 27.648z m130.56 27.648v75.264h-75.264v-75.264h75.264zM795.648 229.376V154.112h75.264v75.264h-75.264z" fill="#949494" p-id="10683"></path><path d="M680.96 383.488c17.92-8.192 47.616-21.504 56.832-50.176 4.608-14.336 2.56-30.72-5.632-44.544-8.192-13.824-20.992-23.552-35.84-26.624-27.648-6.144-54.784 8.704-68.096 35.84-4.608 9.728-1.024 20.992 8.704 25.6 9.728 4.608 20.992 1.024 25.6-8.704 5.632-11.776 15.36-17.408 25.6-15.36 5.632 1.536 9.216 6.144 10.752 8.704 3.072 4.608 3.584 10.24 2.56 13.824-3.584 11.264-20.48 19.968-35.84 26.624-32.256 14.336-35.328 57.344-35.328 61.952-0.512 5.12 1.536 10.24 5.12 13.824 3.584 4.096 8.704 6.144 13.824 6.144h70.656c10.24 0 18.944-9.216 18.944-19.456s-8.192-18.944-18.944-18.944h-46.592c2.048-3.584 4.608-7.168 7.68-8.704zM516.096 377.344H355.328c-13.824 0-24.576 11.264-24.576 24.576v242.688c0 13.824 11.264 24.576 24.576 24.576 13.824 0 24.576-11.264 24.576-24.576V426.496h70.144v217.6c0 13.824 11.264 24.576 24.576 24.576 13.824 0 24.576-10.752 24.576-24.576V426.496h16.896c16.896 0 29.184 3.584 36.352 10.752 10.24 10.24 10.24 29.184 10.24 40.448v166.4c0 13.824 11.264 24.576 24.576 24.576 13.312 0 24.576-10.752 24.576-25.088V477.696c0-16.384 0-50.176-24.576-75.264-16.896-16.384-40.448-25.088-71.168-25.088z" fill="#949494" p-id="10684"></path></svg>
                                            <ContainerInactiveTitle fontSize='12px'>
                                                {unitArea}m²
                                    </ContainerInactiveTitle>
                                        </ContainerInactiveTitle>
                                    </Gridbox>
                                </Container>
                            </Cart>
                            <Spacer />
                            <PageSectionTitle>户型图</PageSectionTitle>
                            <div style={{ backgroundImage: `url(${handleVrSnapshotUrl(houseTypePicture)})`, backgroundSize: '100% 100%', width: '100%', height: '250px', margin: "10px 0 20px 0" }}>
                            </div>
                            {/* <GoodHouse list={detail.productList} /> */}
                            <CssCart width='100%'>
                                <div dangerouslySetInnerHTML={{ __html: `${formatHtmlString}` }}></div>
                            </CssCart>
                        </>
                    </Cart>
                </div>
                {/* </CssCart> */}
            </PageModuleContainer>

        </ChakraProvider>
    )
}