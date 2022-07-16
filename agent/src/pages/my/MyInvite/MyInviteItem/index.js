import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import Cart from 'zero-element-boot/lib/components/cart/Cart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from '@/components/text/ItemTitleBold';
import ItemTitle from '@/components/text/ItemTitle';
import ItemSubitle from '@/components/text/ItemSubitle';
import Avatar from '@/components/presenter/Avatar'
import Button from 'zero-element-boot/lib/components/presenter/button/Button'
import Switch from '../../Switch'

/**
 * 
 * @param {icon} icon 图片
 * 
 */

export default function index(props) {

    const { level,status, icon = '', name = '', navigation, nextIcon = '', space = '16px', phone = '' } = props

    const queryData = useQuery(props.navigation)
    // console.log('queryData === ', queryData)

    const path = () => {
        history.push(queryData)
    }

    
    // <Text fontSize='16px' color='#33333340' onClick={() => swtichClick(false)}>账号密码登录</Text>
    return (
        // {/* <h1>11</h1> */}
        (!space || name) ? (
            <CssCart backgroundColor='#f7f9fa' height='52px' width='100%' margin='1px 0 0  0 ' padding='2px' >
                <Flex padding='2px' >
                    <Flex w='100%' h='100%' bg='' >
                        <CssCart height='' width='' margin='auto 1px ' padding='' >
                            <Avatar url={icon} size='36px' />
                        </CssCart >
                        <Stack >
                            <ItemSubitle>
                                {name}
                            </ItemSubitle>
                            <ItemSubitle>
                                {phone}
                            </ItemSubitle>
                        </Stack>
                    </Flex >

                    <Flex h='100%' margin='auto'>
                        {level==='SECONDARY_AGENT'?
                        (
                            <> < div style={{ height: '25px', width: '39px', backgroundColor: '#dfe6ed' }} onClick={() => swtichClick(true)}>
                            <ItemSubitle>
                                二级
                            </ItemSubitle>
                        </div>
                         < div style={{ height: '25px', width: '39px', backgroundColor: '#c4bdaf' ,margin:' 0 0 0 1px' }} onClick={() => swtichClick(true)}>
                         <ItemSubitle>
                             三级
                         </ItemSubitle>
                         </div>
                       </>
          
                     ):level==='TERTIARY_AGENT'?(
                        <> < div style={{ height: '25px', width: '39px', backgroundColor: '#8dd7cf' }} >
                        <ItemSubitle>
                            二级
                        </ItemSubitle>
                      </div>
                     < div style={{ height: '25px', width: '39px', backgroundColor: '#dfe6ed',margin:' 0 0 0 1px'  }} >
                     <ItemSubitle>
                         三级
                     </ItemSubitle>
                    </div>
                    </>
                      ):
                        (   <> < div style={{ height: '25px', width: '39px', backgroundColor: '#dfe6ed' }} >
                            <ItemSubitle>
                                二级
                            </ItemSubitle>
                        </div>
                        < div style={{ height: '25px', width: '39px', backgroundColor: '#dfe6ed',margin:' 0 0 0 1px' }} >
                        <ItemSubitle>
                            三级
                        </ItemSubitle>
                    </div>
                    </>
                      )
                      }
                    </Flex>
                        {/* <CssCart margin='7px 2px auto 4px'>
                        <>
                            {status ==='Authorized'?
                                (
                                    <div onClick={() => swtichClick(true)}>
                                        <svg t="1657878856170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="63718" width="32" height="32"><path d="M764.867148 249.793136 259.0735 249.793136c-143.070486 0-259.052011 115.984594-259.052011 259.052011 0 143.07151 115.982548 259.050987 259.052011 259.050987l505.793648 0c143.067416 0 259.050987-115.979478 259.050987-259.050987C1023.917112 365.778754 907.933541 249.793136 764.867148 249.793136zM259.0735 745.516428c-130.501216 0-236.671281-106.172111-236.671281-236.671281 0-130.501216 106.170065-236.671281 236.671281-236.671281S495.744781 378.344954 495.744781 508.84617C495.744781 639.34534 389.574716 745.516428 259.0735 745.516428z" p-id="63719" fill="#1296db"></path></svg>
                                    </div>
                                ):(
                                    <div onClick={() => swtichClick(false)}>
                                        <svg t="1657878893746" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="64065" width="32" height="32"><path d="M764.928 251.392H259.072C116.224 251.392 0 367.616 0 510.464c0 142.848 116.224 259.072 259.072 259.072h505.856c142.848 0 259.072-116.224 259.072-259.072 0-142.848-116.224-259.072-259.072-259.072z m0 495.616c-130.56 0-236.544-105.984-236.544-236.544s105.984-236.544 236.544-236.544 236.544 105.984 236.544 236.544-105.984 236.544-236.544 236.544z" fill="#cdcdcd" p-id="64066"></path></svg> 
                                    </div>
                                )}
                        </>
                        
                    </CssCart> */}
                <Switch status={status} />
                </Flex>
           
            </CssCart>
        ) : (
                <CssCart height={space} width='100%' >
                    <>
                         </>

                </CssCart>
            )




    )


}
