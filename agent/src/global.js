// import { set as NamedCartSet } from 'zero-element-boot/lib/config/NamedCartConfig';
import { set as NamedIndicatorSet } from 'zero-element-boot/lib/components/config/NamedIndicatorConfig';
import { set as NamedPresenterSet } from 'zero-element-boot/lib/components/config/NamedPresenterConfig';
// import { set as FormItemTypeSet } from 'zero-element-boot/lib/components/config/formItemTypeConfig';

import { setEndpoint, setToken,getToken } from 'zero-element-boot/lib/components/config/common';
import { Cart, Circle,HightlightCart,HoverShadowCart,Rectangle,Round,SelectCart} from 'zero-element-boot/lib/components/cart/';


if (process.env.NODE_ENV == 'development') {
  setEndpoint('https://house.cloud.smallsaas.cn');
  // setEndpoint('http://app1.console.smallsaas.cn:8001');

  // setEndpoint('http://demo.smallsaas.cn:80');
  setToken("eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6MzgsInVzZXJJZCI6MzI2LCJhY2NvdW50IjoiYmE5MGZiYTYwOGEyNDZkYWEyNWI5NDQ0NWE4NzA0YTgiLCJkb21haW5Vc2VySWQiOiIiLCJpYXQiOjE2NTgyMTgwMDIsImp0aSI6IjMyNiIsInN1YiI6ImJhOTBmYmE2MDhhMjQ2ZGFhMjViOTQ0NDVhODcwNGE4IiwiZXhwIjoxNjU4NDc3MjAyfQ.YCkpp2p_aJuOWvOAWhA4Sws5Nus_a2I0gMrnjJ8N7Byv0NmO8BojdBIdsNS8TIXLVB3_z47hL70tOTFmAPrDvQ")
} else {
  // setEndpoint('https://app1.console.smallsaas.cn:8001');
  setEndpoint('https://house.cloud.smallsaas.cn');

}

//presenter
// import SelectFetch from '@/pages/SelectFetch';

NamedIndicatorSet({
  Cart,

})

NamedPresenterSet({

})

// FormItemTypeSet({
//   "Select-fetch1": SelectFetch
// })