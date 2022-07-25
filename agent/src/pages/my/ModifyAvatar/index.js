import React from 'react';
import ModifyAvatar from './config';
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import TopBar from '@/components/presenter/TopBar'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Stack, Box, Spacer, ChakraProvider } from '@chakra-ui/react'

export default function index(props) {

    const queryData = useQuery(props)
console.log('queryData==',queryData);

    // const [secondaryAgentPoint, setSecondaryAgentPoint] = useState(queryData.query.secondaryAgentPoint)

    const data = [
        { "title": "头像", "icon":`${queryData.query.icon}` },
        { "title": "昵称", "content": `${queryData.query.title}`, },
    ]
    return (
        <TopBar>
            <Stack>
                <CssCart margin='6px 0 4px 40px' >
                    <ContainerSubtitle>修改个人信息</ContainerSubtitle>
                </CssCart>
                 <ModifyAvatar items={data} />
            </Stack>
        </TopBar>
    )
}