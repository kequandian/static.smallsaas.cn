import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text,Center } from '@chakra-ui/react'
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


export default function index(props) {
  
    const api ='/api/MyDirectorData'


    const [data] = useTokenRequest({ api });
  

    const {san='2' } = props
    return (
        <PageModuleContainer>
            <>
                <CssCart padding='20px 20px 0 20px ' backgroundColor='#8dd7cf' height='90px'>
                 <Center>
                    <UserInformation />
                    </Center>
                    <Head list={data}  />
                </CssCart>
                <CssCart backgroundColor='#ffffff' padding='0 20px 0 20px ' margin='10px'>
                    <Container>
                        <Flex margin='0 10px'>
                            二级
                            <Spacer />
                            三级
                            <Spacer />
                            直推
                            <Spacer />
                            二级贡献
                            <Spacer />
                            三级贡献
                        </Flex>
                    </Container>
                </CssCart>
                <CssCart padding='10px ' margin='4px 0 0 0 ' backgroundColor='#f7f9fa' height=''>
                    <Flex>
                        <Flex w='100%'>
                            <svg t="1657593269043" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19197" width="30" height="30"><path d="M878.592 420.352l-65.024-23.552V157.184c0-35.328-28.672-64-64-64h-471.04c-35.328 0-64 28.672-64 64v239.616l-64.512 23.552c-30.208 5.12-53.76 31.232-53.76 62.976v384.512c0 35.328 28.672 64 64 64h706.56c35.328 0 64-28.672 64-64V483.328c0-31.232-22.528-57.344-52.224-62.976z m-131.584-260.608v308.736l-233.472 101.376-232.448-101.376V159.744h465.92zM864.256 865.28h-701.44V489.984l350.72 152.576 350.72-152.576V865.28z" fill="#4b5c6b" p-id="19198"></path><path d="M372.224 375.296H655.36c18.432 0 33.28-14.848 33.28-33.28s-14.848-33.28-33.28-33.28H372.224c-18.432 0-33.28 14.848-33.28 33.28s15.36 33.28 33.28 33.28z" fill="#4b5c6b" p-id="19199"></path></svg>
                            <PrimarySubtitle fontSize='17px'>
                                我的邀请
                            </PrimarySubtitle>
                            

                        </Flex>
                        <svg t="1657593620636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21118" width="24" height="24"><path d="M625.664 512l-380.416 380.416c-28.16 28.16-28.16 73.216 0 101.376s73.216 28.16 101.376 0l420.864-420.864c4.096-2.56 7.68-5.632 11.264-9.216 14.336-14.336 21.504-32.768 20.992-51.712 0-18.432-6.656-37.376-20.992-51.712-3.584-3.584-7.168-6.656-11.264-9.216L346.624 30.208c-13.824-13.824-32.256-20.992-50.688-20.992-18.432 0-36.864 7.168-50.688 20.992-28.16 28.16-28.16 73.216 0 101.376l380.416 380.416z" fill="#c3cfd9" p-id="21119"></path></svg>
                    </Flex>
                </CssCart>
                <CssCart padding='10px ' margin=' 0 ' backgroundColor='#f7f9fa' height=''>
                    <Flex>
                        <Flex w='100%'>
                            <svg t="1657593740775" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25183" width="30" height="30"><path d="M475.20256 36.79744h432.76288c31.93856 0 60.928 13.056 81.92 34.11456A115.59936 115.59936 0 0 1 1024 153.02144v267.136c0 32-12.99456 61.06112-34.048 82.11456-20.992 21.05344-49.98656 34.048-81.92 34.048h-70.528l-73.728 91.97056-15.93856 19.968-22.84544-11.45856-24.51456-12.288-22.33344-11.19744 5.56544-24.192 12.16-52.736H521.472c7.552-9.02656 13.62944-19.39456 18.10944-30.65856 4.224-10.496 7.04-21.632 8.89856-32.896H775.68l-8.96 38.85056-3.84 16.384 34.816-43.392 9.53344-11.904h100.736c14.464 0 27.52-5.95456 37.05856-15.488 9.472-9.53856 15.42144-22.656 15.42144-37.12V153.02656c0-14.464-5.94944-27.58656-15.42144-37.12-9.53856-9.53856-22.656-15.488-37.05856-15.488H475.19744c-14.464 0-27.52 5.888-37.05344 15.488-9.472 9.53344-15.488 22.71744-15.488 37.12v33.792c-19.968-7.424-41.472-12.416-63.42656-14.72v-19.072c0-32 13.056-61.056 34.048-82.11456 20.992-21.05344 49.98656-34.10944 81.92-34.10944zM93.568 653.952C15.93856 721.73056 1.60256 855.10656 0 933.18656c75.84256 74.04544 558.65344 69.94944 658.944 0 9.66144-88.96512-29.44-225.21856-90.56256-283.07456-23.552 0-45.50144 0.06656-66.23744 0.128-17.98656 1.34656-33.152-0.128-44.61056-5.95456-13.056-13.62944-21.248-36.352-26.42944-64.44544 16.384-18.62144 29.37344-41.472 37.18144-67.13344 9.92256-5.376 17.28-14.53056 22.272-26.81856 5.376-13.312 7.808-30.72 7.49056-51.2l-0.06656-6.656-5.43744-3.77856a73.6 73.6 0 0 0-6.4-3.84c10.94144-80.50688-3.84-134.20544-44.99456-164.352-60.60544-44.47744-174.26944-44.09344-234.112 4.992-38.46144 31.616-48.70144 72.51456-36.48 161.21856-1.08544 0.57344-2.10944 1.34656-3.2 2.048l-5.504 3.712-0.06144 6.656c-0.32256 20.864 2.23744 38.528 7.74144 51.968 5.248 12.416 12.86656 21.44256 23.168 26.69056 8.448 27.392 22.85056 51.64544 41.02656 70.77888-4.352 21.76-10.624 40.06912-19.712 53.05856-11.392 13.50144-28.032 18.56-48.96256 16.64-22.272 0.06144-45.952 0.128-71.48544 0.128z m0 0" fill="#4b5c6b" p-id="25184"></path></svg>
                            <PrimarySubtitle fontSize='17px'>
                                三级代理（{san}）
                    </PrimarySubtitle>
                        </Flex>
                        <svg t="1657593620636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21118" width="24" height="24"><path d="M625.664 512l-380.416 380.416c-28.16 28.16-28.16 73.216 0 101.376s73.216 28.16 101.376 0l420.864-420.864c4.096-2.56 7.68-5.632 11.264-9.216 14.336-14.336 21.504-32.768 20.992-51.712 0-18.432-6.656-37.376-20.992-51.712-3.584-3.584-7.168-6.656-11.264-9.216L346.624 30.208c-13.824-13.824-32.256-20.992-50.688-20.992-18.432 0-36.864 7.168-50.688 20.992-28.16 28.16-28.16 73.216 0 101.376l380.416 380.416z" fill="#c3cfd9" p-id="21119"></path></svg>
                    </Flex>
                </CssCart>
                <CssCart padding='10px ' margin='4px 0 0 0 ' backgroundColor='#f7f9fa' height=''>
                    <Flex>
                        <Flex w='100%'>
                            <svg t="1657593782175" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25482" width="30" height="30"><path d="M332.8 243.2a179.2 179.2 0 1 0 358.4 0 179.2 179.2 0 1 0-358.4 0zM911.9 900.3L769 494.6c-6.8-16.5-23.3-27.4-41.6-27.4H296.6c-18.3 0-34.8 10.8-41.6 27.4L112.1 900.3c-11.8 28.6 9.9 59.7 41.6 59.7h716.7c31.6 0 53.3-31.1 41.5-59.7z m-344.8-45.4c3.4 30.4-18.4 57.9-48.8 61.3-30.4 3.4-57.8-18.4-61.3-48.8-0.5-4.1-0.4-8.5 0-12.4l30.8-273h-9.4c-18 0-28.6-20.2-18.4-35l33.6-48.7c8.9-12.9 27.9-12.9 36.7 0l33.6 48.7c10.2 14.8-0.4 35-18.4 35h-9.4l31 272.9z" fill="#4b5c6b" p-id="25483"></path></svg>
                            <PrimarySubtitle fontSize='17px'>
                                二级代理（{san}）
                            </PrimarySubtitle>
                        </Flex>
                        <svg t="1657593620636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21118" width="24" height="24"><path d="M625.664 512l-380.416 380.416c-28.16 28.16-28.16 73.216 0 101.376s73.216 28.16 101.376 0l420.864-420.864c4.096-2.56 7.68-5.632 11.264-9.216 14.336-14.336 21.504-32.768 20.992-51.712 0-18.432-6.656-37.376-20.992-51.712-3.584-3.584-7.168-6.656-11.264-9.216L346.624 30.208c-13.824-13.824-32.256-20.992-50.688-20.992-18.432 0-36.864 7.168-50.688 20.992-28.16 28.16-28.16 73.216 0 101.376l380.416 380.416z" fill="#c3cfd9" p-id="21119"></path></svg>
                    </Flex>
                    <Flex>

                        <Flex w='100%'>
                            <svg t="1657594307158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29680" width="30" height="30"><path d="M979.2 1017.6H89.6c-44.8 0-83.2-38.4-83.2-83.2V51.2C6.4 32 25.6 12.8 44.8 12.8s38.4 19.2 38.4 38.4v889.6l896 6.4c19.2 0 38.4 19.2 38.4 38.4s-19.2 32-38.4 32z" p-id="29681" fill="#4b5c6b"></path><path d="M179.2 832v-128c0-19.2 19.2-38.4 38.4-38.4s38.4 19.2 38.4 38.4v128c0 19.2-19.2 38.4-38.4 38.4s-38.4-12.8-38.4-38.4zM377.6 832V601.6c0-19.2 19.2-38.4 38.4-38.4s38.4 19.2 38.4 38.4V832c0 19.2-19.2 38.4-38.4 38.4-25.6 0-38.4-12.8-38.4-38.4zM569.6 832v-128c0-19.2 19.2-38.4 38.4-38.4s38.4 19.2 38.4 38.4v128c0 19.2-19.2 38.4-38.4 38.4s-38.4-12.8-38.4-38.4zM768 832v-192c0-19.2 19.2-38.4 38.4-38.4s38.4 19.2 38.4 38.4v192c0 19.2-19.2 38.4-38.4 38.4s-38.4-12.8-38.4-38.4zM800 102.4h-140.8c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h57.6L531.2 364.8 460.8 294.4c-12.8-19.2-38.4-19.2-57.6-6.4L192 505.6c-12.8 12.8-12.8 38.4 0 51.2 12.8 19.2 38.4 19.2 51.2 0l185.6-185.6 64 64 6.4 6.4V448c12.8 12.8 38.4 12.8 51.2 0L768 236.8v57.6c0 19.2 19.2 38.4 38.4 38.4s38.4-19.2 38.4-38.4V147.2c0-19.2-19.2-44.8-44.8-44.8z" p-id="29682" fill="#4b5c6b"></path></svg>
                            <PrimarySubtitle fontSize='17px'>
                                结算报表
                                  </PrimarySubtitle>
                        </Flex>

                        <svg t="1657593620636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21118" width="24" height="24"><path d="M625.664 512l-380.416 380.416c-28.16 28.16-28.16 73.216 0 101.376s73.216 28.16 101.376 0l420.864-420.864c4.096-2.56 7.68-5.632 11.264-9.216 14.336-14.336 21.504-32.768 20.992-51.712 0-18.432-6.656-37.376-20.992-51.712-3.584-3.584-7.168-6.656-11.264-9.216L346.624 30.208c-13.824-13.824-32.256-20.992-50.688-20.992-18.432 0-36.864 7.168-50.688 20.992-28.16 28.16-28.16 73.216 0 101.376l380.416 380.416z" fill="#c3cfd9" p-id="21119"></path></svg>
                    </Flex>
                    <Flex>
                        <Flex w='100%'>
                            <svg t="1657594234975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27787" width="30" height="30"><path d="M512 938.666667c235.648 0 426.666667-191.018667 426.666667-426.666667S747.648 85.333333 512 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667z m0 85.333333C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m42.666667-486.869333V298.538667C554.666667 275.328 535.552 256 512 256c-23.722667 0-42.666667 19.029333-42.666667 42.538667v256.256a41.984 41.984 0 0 0 12.202667 29.866666l121.258667 121.258667a42.368 42.368 0 0 0 60.032-0.298667 42.666667 42.666667 0 0 0 0.298666-60.032L554.666667 537.130667z" fill="#4b5c6b" p-id="27788"></path></svg>
                            <PrimarySubtitle fontSize='17px'>
                                历史
                         </PrimarySubtitle>
                        </Flex>

                        <svg t="1657593620636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21118" width="24" height="24"><path d="M625.664 512l-380.416 380.416c-28.16 28.16-28.16 73.216 0 101.376s73.216 28.16 101.376 0l420.864-420.864c4.096-2.56 7.68-5.632 11.264-9.216 14.336-14.336 21.504-32.768 20.992-51.712 0-18.432-6.656-37.376-20.992-51.712-3.584-3.584-7.168-6.656-11.264-9.216L346.624 30.208c-13.824-13.824-32.256-20.992-50.688-20.992-18.432 0-36.864 7.168-50.688 20.992-28.16 28.16-28.16 73.216 0 101.376l380.416 380.416z" fill="#c3cfd9" p-id="21119"></path></svg>
                    </Flex>

                </CssCart>
                <CssCart padding='10px ' margin='10px 0 0 0 ' backgroundColor='#f7f9fa' height=''>
                    <Flex>
                        <Flex w='100%'>
                            <svg t="1657594133622" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26520" width="30" height="30"><path d="M991.078 575.465l-101.71 0c-10.154 57.873-33.486 111.084-66.409 157.07l72.873 72.873c12.488 12.488 12.488 32.725 0 45.212l-45.212 45.212c-12.488 12.488-32.725 12.488-45.212 0l-73.186-73.186c-46.069 32.52-98.801 56.3-156.757 66.076l0 102.356c0 17.654-14.316 31.97-31.97 31.97l-63.941 0c-17.654 0-31.97-14.316-31.97-31.97L447.584 888.722c-58.02-9.789-111.346-32.853-157.377-65.456l-72.566 72.566c-12.488 12.488-32.725 12.488-45.212 0l-45.212-45.212c-12.488-12.488-12.488-32.725 0-45.212l72.361-72.361c-32.859-46.031-56.082-99.434-65.897-157.581L31.97 575.466c-17.654 0-31.97-14.316-31.97-31.97l0-63.94c0-17.654 14.316-31.97 31.97-31.97l101.71 0c10.154-57.873 33.486-111.084 66.409-157.07l-72.873-72.873c-12.488-12.488-12.488-32.725 0-45.212l45.212-45.212c12.488-12.488 32.725-12.488 45.212 0l73.186 73.186c46.069-32.52 98.801-56.3 156.757-66.076L447.583 31.97C447.584 14.316 461.9 0 479.554 0l63.941 0c17.654 0 31.97 14.316 31.97 31.97l0 102.356c58.02 9.789 111.346 32.853 157.377 65.456l72.566-72.566c12.488-12.488 32.725-12.488 45.212 0l45.212 45.212c12.488 12.488 12.488 32.725 0 45.212l-72.362 72.361c32.859 46.031 56.082 99.434 65.897 157.581l101.71 0c17.654 0 31.97 14.316 31.97 31.97l0 63.94C1023.048 561.148 1008.732 575.465 991.078 575.465zM511.524 255.762c-141.251 0-255.762 114.511-255.762 255.762s114.511 255.762 255.762 255.762 255.762-114.511 255.762-255.762S652.775 255.762 511.524 255.762z" p-id="26521" fill="#4b5c6b"></path></svg>
                            <PrimarySubtitle fontSize='17px'>
                                设置
                            </PrimarySubtitle>
                        </Flex>
                        <svg t="1657593620636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21118" width="24" height="24"><path d="M625.664 512l-380.416 380.416c-28.16 28.16-28.16 73.216 0 101.376s73.216 28.16 101.376 0l420.864-420.864c4.096-2.56 7.68-5.632 11.264-9.216 14.336-14.336 21.504-32.768 20.992-51.712 0-18.432-6.656-37.376-20.992-51.712-3.584-3.584-7.168-6.656-11.264-9.216L346.624 30.208c-13.824-13.824-32.256-20.992-50.688-20.992-18.432 0-36.864 7.168-50.688 20.992-28.16 28.16-28.16 73.216 0 101.376l380.416 380.416z" fill="#c3cfd9" p-id="21119"></path></svg>
                    </Flex>
                </CssCart>


            </>
        </PageModuleContainer>
    )


}
