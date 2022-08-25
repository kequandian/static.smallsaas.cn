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
  setToken("eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6MzgsInVzZXJJZCI6MzI2LCJhY2NvdW50IjoiYmE5MGZiYTYwOGEyNDZkYWEyNWI5NDQ0NWE4NzA0YTgiLCJkb21haW5Vc2VySWQiOiIiLCJ0eXBlIjo2NywiaWF0IjoxNjYxNDEzNzY0LCJqdGkiOiIzMjYiLCJzdWIiOiJiYTkwZmJhNjA4YTI0NmRhYTI1Yjk0NDQ1YTg3MDRhOCIsImV4cCI6MTY2MTY3Mjk2NH0.Ayaxbti8buJAft5-jttiAKTfoFYkXCi6X20fEN1rUpO_-r5zttoZ5ExJvBDTxkFkuOywa6ySNsaPi7PjJIc93A")
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