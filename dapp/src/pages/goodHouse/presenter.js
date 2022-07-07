import React, { useState, useEffect } from 'react';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import PageSectionTitle from 'zero-element-boot-plugin-theme/lib/components/text/pageSectionTitle/PageSectionTitle';
import { Flex, Box } from '@chakra-ui/react'
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import BackgroundImage from '@/components/presenter/backgroundImage';


export default function (props) {

    // let endpoint='http://app1.console.smallsaas.cn:8001/openapi'


    


    // const { title = '客厅', url = ''
    // } = props;

    return (
        <PageModuleContainer >
            <>
                <Flex>
                    <div style={{ borderTop:'1px #cecece solid', padding:'10px 0 0 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '50%' }}>
                        <PageSectionTitle>{detail.title}</PageSectionTitle>
                    </div>

                    <div style={{borderTop:'1px #cecece solid', padding:'10px 0 0 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '50%' }}>

                        <Linktitle>模型清单 ></Linktitle>
                    </div>
                </Flex>
               
                <BackgroundImage backgroundImage={`url(${detail.url})`} width='100%' height= '260px'  />
            </>
        </PageModuleContainer>

    )
}