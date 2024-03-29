import React, { useEffect, useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Box } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import TagIndicator from 'zero-element-boot/lib/components/indicator/TagIndicator'

/**
 * 

 * 
 */

export default function index(props) {

    const { id, code = '', vendorCode = '', cb, chiAgentId, ownedAgentId, agentId = '', nextStatus } = props

    // console.log('id 1111==', id)
    const [status, setStatus] = useState(nextStatus)
    // const [SelectList, setSelectList] = useState([])

    function onSelected(e, id, agentId) {

        // console.log('id==', id)


        setStatus(!status)
        if (cb) {
            cb(id, !status)
        }
    }
    console.log('nextStatus==', nextStatus)

    function onNextClick() {
        history.push(`/my/myChannelCode/AuthorizedAgent?id=${id}`)
    }
    return (
        (!ownedAgentId && !chiAgentId) ?
            (
                <CssCart CssCart backgroundColor='#ffffff' height='50px' width='100%' margin='1px 0 0  0 ' border='solid 1px #f5f5f5' >
                    <Flex padding='12px 8px' h='100%' onClick={(e) => onSelected(e, id, agentId)} >
                        <Flex padding='6px 8px' h='100%' w='94%' >
                            <Center w='10%' margin='0 6px 0 0px'  >
                                {/* {status && nextStatus == false ? */}
                                {status?
                                    (<svg t="1660731214614" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="101115" width="26" height="26"><path d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z" fill='#6558f5' p-id="101116"></path></svg>
                                    ) : (
                                        <svg t="1660731240352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="101570" width="26" height="26"><path d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z" p-id="101571" fill="#bfbfbf"></path></svg>
                                    )
                                }
                            </Center>
                            <ItemTitleBold>
                                {code}
                            </ItemTitleBold>
                        </Flex>
                        <Center h='100%' w='80px' onClick={() => onNextClick(id)}>
                            <CssCart height='25px' display='flex' justifyContent='center' alignContent='center' padding=' 0 4px' margin='4px 0' border='px #97a4ae solid' backgroundColor='#8e72ff' borderRadius='4px' color='#ffffff'>
                                授权代理
                            </CssCart>
                        </Center>
                    </Flex>
                </CssCart >
            ) : <></>
    )


}
