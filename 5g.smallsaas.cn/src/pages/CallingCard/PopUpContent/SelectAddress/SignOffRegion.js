import { Center, Flex } from '@chakra-ui/layout';
import { Cascader } from 'antd';
import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');




// const App = () => <Cascader  options={options} onChange={onChange} placeholder="请选择" />;

// export default App;

export default function SignOffAddress(props) {
  const { postDistrictName, id, numProvinceCode, cbRegion,postProvinceCode,postDistrictCode,postCityCode } = props

  return (
    <Center onClick={() => cbRegion(postDistrictName,postProvinceCode,postDistrictCode,postCityCode)} borderBottom='0px  #8a8a8a solid'>
      <Flex padding='4px'>
        <Center w='100px'>
          {postDistrictName}
        </Center>
      </Flex>
    </Center>

  )

}
