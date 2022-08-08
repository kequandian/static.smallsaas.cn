import React, { useState } from 'react';
import { Flex, Center } from '@chakra-ui/layout';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';


/**
 * 
 * 配套设施的item
 * 
 * @param {布尔值} value 是否
 * @param {title} title 设施名
 * 
 */

export default function index(props) {

    const { value = false, title = '' } = props

    return (
        <Flex gap='8px'>
            <Center>
                {value ?
                    <svg t="1659664978763" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26489" width="20" height="20"><path d="M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z" p-id="26490" fill="#1296db"></path></svg>
                    :
                    <svg t="1659671432826" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28509" width="20" height="20"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64z m271.529 719.529c-35.286 35.287-76.359 62.983-122.078 82.321C614.15 885.856 563.868 896 512 896c-51.868 0-102.15-10.144-149.451-30.15-45.719-19.337-86.792-47.034-122.078-82.321-35.287-35.286-62.983-76.359-82.321-122.078C138.144 614.15 128 563.868 128 512s10.144-102.15 30.15-149.451c19.337-45.719 47.034-86.792 82.321-122.078 35.286-35.287 76.359-62.983 122.078-82.321C409.85 138.144 460.132 128 512 128c51.868 0 102.15 10.144 149.451 30.15 45.719 19.337 86.792 47.034 122.078 82.321 35.287 35.286 62.983 76.359 82.321 122.078C885.856 409.85 896 460.132 896 512s-10.144 102.15-30.15 149.451c-19.338 45.718-47.034 86.792-82.321 122.078z" fill="#bfbfbf" p-id="28510"></path><path d="M707.576 362.526L448.465 621.637 316.424 489.596c-12.497-12.497-32.758-12.497-45.255 0s-12.497 32.758 0 45.255l154.668 154.668c6.249 6.249 14.438 9.373 22.627 9.373s16.379-3.124 22.627-9.373L752.83 407.781c12.497-12.497 12.497-32.758 0-45.255-12.496-12.497-32.758-12.497-45.254 0z" fill="#bfbfbf" p-id="28511"></path></svg>
                }
            </Center>
            <Center>
                <ItemTitle>
                    {title}
                </ItemTitle>
            </Center>
        </Flex>
    )



}