import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { setEndpoint, setToken, getToken } from 'zero-element-boot/lib/components/config/common';
// import CallingCard from '@/pages/CallingCard'
import CallingCard from '@/pages/CallingCard'
import NonumberOrder from '@/pages/NonumberOrder'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { Center, Stack } from '@chakra-ui/layout';
import ContainerInactiveTitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerInactiveTitle';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';


export default function index(props) {

  console.log('window.location==', window.location)

  //获取路由带过来的 渠道码
  const vendorCodelValue = window.location.pathname.substring(1, window.location.pathname.length)
  // const channelV = window.location.pathname.split('/')[1]

  const vendorCode = vendorCodelValue ? vendorCodelValue : null

  //接收扫码跳转带过来的参数,
  const queryData = useQuery(window.location.search)
  // const reference = queryData.query.phone
  // const coUserid = queryData.query.coUserid
  // console.log('reference==', reference)
  // console.log('coUserid==', coUserid)
  // history.push('/Testlogin')

  // const provinceApi = '/api/u/unicom/pcd/province/list'
  // const [provinceData] = useTokenRequest({ api: provinceApi });
  // console.log('provinceData ==', provinceData)


  // const cityApi = '/api/u/unicom/pcd/city/1157'
  // const [cityData] = useTokenRequest({ api: cityApi });
  // console.log('cityData ==', cityData)

  return (
    vendorCode == null ? (
      <Stack h='400px' margin='200px 0'>
        <Center h='100px'>
          <svg t="1660703931208" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="68508" width="128" height="128"><path d="M419.54889 470.095611c22.837124 0 41.337477-18.548448 41.337477-41.422412 0-22.877033-18.500353-41.418318-41.337477-41.418318-22.820752 0-41.320081 18.541285-41.320081 41.418318C378.227786 451.547163 396.728138 470.095611 419.54889 470.095611zM603.412454 470.095611c22.837124 0 41.337477-18.548448 41.337477-41.422412 0-22.877033-18.500353-41.418318-41.337477-41.418318-22.820752 0-41.320081 18.541285-41.320081 41.418318C562.092373 451.547163 580.591703 470.095611 603.412454 470.095611zM647.397225 613.922321c-0.016373-0.030699 0-0.064468-0.016373-0.096191-24.397666-50.351781-75.901691-85.062328-135.49495-85.062328-59.59326 0-111.098307 34.726919-135.493927 85.077677-0.048095 0.080841-0.048095 0.180102-0.064468 0.277316-0.99056 2.046612-1.543146 4.321422-1.543146 6.723122 0 8.576329 6.919597 15.528672 15.47853 15.528672 6.269797 0 11.646248-3.752464 14.08274-9.127891l0.016373 0.016373c19.393699-39.907918 60.259432-67.422575 107.524922-67.422575 47.281863 0 88.132246 27.514657 107.525945 67.422575l0.01535-0.016373c2.355651 5.587252 7.862062 9.501398 14.278191 9.501398 8.55791 0 15.510252-6.968715 15.510252-15.542998C649.216663 618.568131 648.550491 616.083543 647.397225 613.922321z" p-id="68509" fill="#bfbfbf"></path><path d="M512.000512 807.223838c-162.789597 0-295.222815-132.432195-295.222815-295.221792 0-162.79062 132.433218-295.225885 295.222815-295.225885s295.221792 132.436288 295.221792 295.225885C807.222303 674.791643 674.790108 807.223838 512.000512 807.223838zM512.000512 258.356163c-139.855258 0-253.641791 113.785509-253.641791 253.645884 0 139.855258 113.786533 253.641791 253.641791 253.641791s253.641791-113.786533 253.641791-253.641791C765.642303 372.141672 651.85577 258.356163 512.000512 258.356163z" p-id="68510" fill="#bfbfbf"></path></svg>
        </Center>
        <Center h='px'>
          <ContainerInactiveTitle>
            未识别到您的渠道码，请从正确的渠道进入进行下单
          </ContainerInactiveTitle>
        </Center>
      </Stack>
    ) : (
      <CallingCard
        vendorCode={vendorCode}
      // coUserid={coUserid}
      //  reference={reference}
      />
    )
  )
}
