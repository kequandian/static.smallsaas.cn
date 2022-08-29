import React, { useState } from 'react';
import { Flex, Center, Box } from '@chakra-ui/layout';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';


/**
 * 
 * 配套设施的item
 * 
 * @param {状态} status null或1
 * @param {title} title 设施名
 * 
 */

export default function index(props) {

    const { status = 1, title = '' } = props

    return (

        <Flex gap='2px' h='32px ' padding='0 0px'>
            <Center >
                {status ?
                    <svg t="1659664978763" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26489" width="20" height="20"><path d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z" p-id="26490" fill="#82cd31"></path></svg>
                    :
                    <svg t="1661737390956" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="57748" width="20" height="20"><path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z" p-id="57749" fill="#bfbfbf"></path></svg>
                }
            </Center>
            <Center>
                <Box w='58px' padding='0'>
                    <ItemTitle>
                        {title}
                    </ItemTitle>
                </Box>
            </Center>
        </Flex>
    )



}