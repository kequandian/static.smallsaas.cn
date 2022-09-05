import {
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  ChakraProvider, Text, Button, Spacer, Center, Flex, InputRightAddon, Box
} from '@chakra-ui/react'
import { Cascader } from 'antd';
import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');
import SignOffAddressItem from './SignOffAddressItem';
import SignOffCityItem from './SignOffCityItem';
import SignOffRegion from './SignOffRegion';


export default function index(props) {

  const { submit } = props
  // 获取列表数据
  const [provinceList, SetProvinceList] = useState([])
  const [SelectCityList, SetSelectCityList] = useState([])
  const [SelectRegionList, SetSelectRegionList] = useState([])
  // const [SelectRegionId, SetSelectRegionId] = useState([])


  // 给每次 是否选中 设置状态
  const [ClickStatus, SetClickStatus] = useState(false)
  const [ClickProvince, SetClickProvince] = useState(false)
  const [ClickRegion, SetClickClickRegion] = useState(false)

  // 获取选中的城市名字
  const [Selectprovince, SetSelectProvince] = useState('')
  const [SelectCity, SetSelectCity] = useState('')
  const [SelectRegion, SetSelectRegion] = useState('')



  const [FocusStatus, SetFocusStatus] = useState(false)
  // const [SelectRegionId, SetSelectRegionId] = useState([])
  // console.log('SelectCity ==', SelectCity)

  function onProvince() {
    const query = {
    }
    promiseAjax('/api/u/unicom/pcd/province/list', query, { method: 'GET' }).then(resp => {
      if (resp && resp.code === 200) {
        let numberDatas = resp.data
        SetProvinceList(numberDatas)
        SetClickStatus(!ClickStatus)
        SetClickClickRegion(false)
      }
    })
  }

  function city(id) {
    const query = {
    }
    promiseAjax(`/api/u/unicom/pcd/city/list/${id}`, query, { method: 'GET' }).then(resp => {
      if (resp && resp.code === 200) {
        let cityDatas = resp.data
        SetSelectCityList(cityDatas)
        // Region(id)
        SetClickProvince(true)
      }
    })
  }

  function Region(id) {
    const query = {
    }
    promiseAjax(`/api/u/unicom/pcd/district/list/${id}`, query, { method: 'GET' }).then(resp => {
      if (resp && resp.code === 200) {
        let RegionDatas = resp.data
        // console.log('resp ==', resp)
        SetSelectRegionList(RegionDatas)
        SetClickClickRegion(true)

      }
    })
  }


  const cb = (id, numProvinceName) => {
    city(id)
    SetSelectProvince(numProvinceName)
    SetClickStatus(true)
    SetSelectCity('')
    SetSelectRegion('')
  };

  function cbCity(id, numCityName) {
    // console.log('cbCityid ==', id);
    // console.log('numCityName ==', numCityName);
    Region(id)
    SetSelectCity(numCityName)
    SetClickStatus(true)
  }

  function cbRegion(postDistrictName, postProvinceCode, postDistrictCode, postCityCode) {
    SetSelectRegion(postDistrictName)
    SetClickStatus(!ClickStatus)

  // 提交到下一个文件
    submit(Selectprovince, SelectCity, postDistrictName,postProvinceCode,postDistrictCode,postCityCode)

  };


  function onBlurStatus() {
    // SetClickStatus(false)
  }
  function onFocusStatus() {
    // SetClickStatus(true)
    SetFocusStatus(true)
  }

  // const status = FocusStatus && Selectprovince&&


  // console.log('ClickStatus==',ClickStatus)

  // const options = [
  //   {
  //     value: '广州',
  //     label: '广州',
  //     children: [
  //       {
  //         value: '广州市',
  //         label: '广州市',
  //         children: [
  //           {
  //             value: '西湖',
  //             label: '西湖',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     value: 'jiangsu',
  //     label: 'Jiangsu',
  //     children: [
  //       {
  //         value: 'nanjing',
  //         label: 'Nanjing',
  //         children: [
  //           {
  //             value: 'zhonghuamen',
  //             label: 'Zhong Hua Men',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Stack w='100%' spacing='0' borderRadius='0 0 4px 4px' >
        <Box w='' border='0px solid #ecf0f5' padding='0' fontSize='18px' onClick={() => onProvince()}  >
          {Selectprovince && !SelectCity && !SelectRegion ?
            <Input value={Selectprovince} minLength='4' placeholder='we' onBlur={() => onBlurStatus()} onFocus={() => onFocusStatus()} />
            :
            SelectCity && !SelectRegion ?
              <Input value={''.concat(`${Selectprovince}`, "·", `${SelectCity}`)} onBlur={() => onBlurStatus()} onFocus={() => onFocusStatus()} />
              :
              SelectRegion ?
                <Input value={''.concat(`${Selectprovince}`, "·", `${SelectCity}`, "·", `${SelectRegion}`)} onBlur={() => onBlurStatus()} onFocus={() => onFocusStatus()} />
                :
                <Box color='#aebac9' h='40px' w='100%' padding=' 0 0 0 10px' lineHeight='37px' border='2px solid #ecf0f5' fontSize='18px' onClick={() => onProvince()}>
                  {/* <Center w='90px'> */}
                  请选择
                  {/* </Center> */}
                </Box>
          }
        </Box>
        {ClickStatus ?
          <div style={{ position: 'absolute', top: '40px', left: '-60px', height: '200px', backgroundColor: '#ffffff', zIndex: 9999999 }}>
            <Box h='100%'>
              <Flex h='100%'>
                <Stack h='100%' overflow='scroll' border='0px #8c8c8c solid' boxShadow='0 0 4px rgba(0, 0, 0, 0.12)' padding='10px 0'>
                  {
                    (
                      provinceList && provinceList.map((item, i) => (
                        <div key={i} >
                          <SignOffAddressItem {...item} cb={(id, numProvinceName) => cb(id, numProvinceName)} />
                        </div>
                      ))
                    )
                  }
                </Stack>

                {ClickProvince ?
                  <Stack h='100%' overflow='scroll' boxShadow='0 0 4px rgba(0, 0, 0, 0.12)' padding='10px 0'>
                    {
                      (
                        SelectCityList && SelectCityList.map((item, i) => (
                          <div key={i}>
                            <SignOffCityItem {...item} cbCity={(id, numCityName) => cbCity(id, numCityName)} />
                          </div>
                        ))
                      )
                    }
                  </Stack>
                  : <></>
                }
                {ClickRegion ?
                  <Stack h='100%' w='' overflow='scroll' boxShadow='0 0 4px rgba(0, 0, 0, 0.12)' padding='10px 0'>
                    {
                      (
                        SelectRegionList && SelectRegionList.map((item, i) => (
                          <div key={i}>
                            <SignOffRegion {...item} cbRegion={(postDistrictName, postProvinceCode, postDistrictCode, postCityCode) => cbRegion(postDistrictName, postProvinceCode, postDistrictCode, postCityCode)} />
                          </div>
                        ))
                      )
                    }
                  </Stack> : <></>
                }
              </Flex>
            </Box>
          </div>
          : <> </>
        }
      </Stack>
      {/* <CssCart width='100%'>
        <Cascader size='large' width='100%' options={options} onChange={onChange} placeholder="请选择" />
      </CssCart> */}
    </div>
  )
}
