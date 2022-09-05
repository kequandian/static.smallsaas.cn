import { Center,Flex } from '@chakra-ui/layout';
import { Cascader } from 'antd';
import React, { useState } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');




// const App = () => <Cascader  options={options} onChange={onChange} placeholder="请选择" />;

// export default App;

export default function SignOffAddress(props) {
  const { numCityName, id, numProvinceCode, cbCity } = props
  // console.log('props ==', props)

  return (
    <Center onClick={() => cbCity(id,numCityName)} borderBottom='0px  #8a8a8a solid'>
      <Flex padding='4px'>
        <Center w='80px'>
          {numCityName}
        </Center>
        <Center w='20px'>
          <svg t="1662088181662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="73290" width="18" height="18"><path d="M425.728 805.376a30.72 30.72 0 0 1-21.76-51.2l208.64-208.64-208.64-210.176a30.72 30.72 0 1 1 43.52-43.52l230.4 230.4a30.72 30.72 0 0 1 0 43.52l-230.4 230.4a30.72 30.72 0 0 1-21.76 9.216z" fill="#8a8a8a" p-id="73291"></path></svg>
        </Center>
      </Flex>
    </Center>

  )

}
