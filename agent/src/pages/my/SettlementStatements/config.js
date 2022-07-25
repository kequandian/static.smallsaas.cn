import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import Presenter from './item';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'


export default function index(props) {


  // const api = '/api/settlementStatementData'
  const api = '/api/u/saasAgent/settlementOrderList'


  const [data] = useTokenRequest({ api });



  /**
   * 页面配置
   */

  const config = {
    items: data && data.records && data.records.length > 0 ? data.records : [],
    layout: {
      xname: 'Gridbox',
      props: {
        columns: 1,
        space: 0,
      },
      container: 'PlainList'
    },
    ...props
  };
  // console.log(data, ' ==data');

  return (
    <CssCart background='#f0ffff'>
      <AutoLayout {...config} data={data} >
        <Presenter />
      </AutoLayout>
    </CssCart>


  )
}


// import React from 'react';
// import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
// import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
// import { Flex, Center } from '@chakra-ui/react'
// import Container from 'zero-element-boot/lib/components/container/Container'
// import RouterBoxItem from './item';
// import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';

// /**
//  * 
//  * @param {data} items 数据
//  * 
//  */
// export default function index(props) {

//   const api = '/api/u/saasAgent/settlementOrderList'


//   const [data] = useTokenRequest({ api });

//   const { columns = '4' } = props
//   console.log(data, '==data');

//   const items = [data.records]
//   console.log(items, '==items');

//   return (
//     items && items.length > 0 ? (
//       <CssCart backgroundColor='' padding='4px' margin='' borderRadius='8px' width='100%'>
//         <Center>
//           <Container>

//             {
//               items && items.map((item, i) => (
//                 // <Gridbox columns={columns}>
//                 <RouterBoxItem  {...item} key={i} />
//                 // {/* </Gridbox> */}
//               )
//               )
//             }
//           </Container>
//         </Center>
//       </CssCart>
//     )
//       : <></>
//   )

// }