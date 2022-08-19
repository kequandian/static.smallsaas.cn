import React from 'react';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import { Flex, Center, Stack } from '@chakra-ui/react'
import Container from 'zero-element-boot/lib/components/container/Container'
import Item from './Item';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import TopBar from '@/components/presenter/TopBar'
import { Button, Drawer, Radio, Space } from 'antd';
import Buttons from '../buttons'

/**
 * 
 * @param {data} items 数据
 * 
 */
export default function index(props) {

    const { columns = '2', appid,onIetmClick } = props
    let api = `/api/u/agentApp/agentList/Unicom5G`
    const [data] = useTokenRequest({ api });
    const items = data
    console.log('items ==', items)

    
    return (
        <>
            <Center >
                <Container>
                    <Gridbox columns={columns}>
                        {
                            items && items.map((item, i) => (
                                <Item  {...item} key={i} onIetmClick={onIetmClick} />
                            )
                            )
                        }
                        <Center w='140px'>
                            <Stack w='' padding='8px ' bg='' margin='10px'>
                                <svg t="1660623054341" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="67195" width="68" height="68"><path d="M187.264 888.746667l9.173333-22.186667c8.448 3.498667 17.749333 5.461333 27.562667 5.461333h36.010667V896H224c-13.013333 0-25.429333-2.56-36.736-7.253333z m576.725333 7.253333v-24.021333h36.010667c9.813333 0 19.114667-1.92 27.562667-5.418667l9.173333 22.186667c-11.306667 4.693333-23.722667 7.253333-36.736 7.253333h-36.010667zM896 260.010667h-24.021333V224c0-9.813333-1.92-19.114667-5.418667-27.562667l22.186667-9.173333c4.693333 11.306667 7.253333 23.722667 7.253333 36.736v36.010667zM260.010667 128H224c-13.013333 0-25.429333 2.56-36.736 7.253333l9.173333 22.186667a71.68 71.68 0 0 1 27.562667-5.418667h36.010667V128zM128 763.989333h24.021333v36.010667c0 9.813333 1.92 19.114667 5.418667 27.562667l-22.186667 9.173333A95.701333 95.701333 0 0 1 128 800v-36.010667z m0-71.978666h24.021333V619.946667H128v72.021333z m0-144h24.021333v-72.021334H128v72.021334z m0-144h24.021333V331.946667H128V404.053333z m0-144h24.021333V224c0-9.813333 1.92-19.114667 5.418667-27.562667l-22.186667-9.173333c-4.693333 11.306667-7.253333 23.722667-7.253333 36.736v36.010667zM331.989333 128v24.021333H404.053333V128H331.946667z m144 0v24.021333h72.021334V128h-72.021334z m144 0v24.021333h72.021334V128H619.946667z m144 0v24.021333h36.010667c9.813333 0 19.114667 1.92 27.562667 5.418667l9.173333-22.186667A95.701333 95.701333 0 0 0 800 128h-36.010667zM896 331.989333h-24.021333V404.053333H896V331.946667z m0 144h-24.021333v72.021334H896v-72.021334z m0 144h-24.021333v72.021334H896V619.946667z m0 144h-24.021333v36.010667c0 9.813333-1.92 19.114667-5.418667 27.562667l22.186667 9.173333c4.693333-11.306667 7.253333-23.722667 7.253333-36.736v-36.010667zM692.010667 896v-24.021333H619.946667V896h72.021333z m-144 0v-24.021333h-72.021334V896h72.021334z m-144 0v-24.021333H331.946667V896H404.053333z" fill="#888888" p-id="67196"></path><path d="M392.021333 512c0-13.226667 10.709333-24.021333 23.978667-24.021333h192a23.978667 23.978667 0 1 1 0 48.042666h-192A23.978667 23.978667 0 0 1 391.978667 512z" fill="#888888" p-id="67197"></path><path d="M512 392.021333c13.226667 0 24.021333 10.709333 24.021333 23.978667v192a23.978667 23.978667 0 1 1-48.042666 0v-192c0-13.226667 10.752-24.021333 24.021333-24.021333z" fill="#888888" p-id="67198"></path></svg>
                            </Stack>
                        </Center>
                    </Gridbox>

                </Container>
            </Center>

           
        </>
    )
}