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
  // setToken("eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6MzgsInVzZXJJZCI6MzI2LCJhY2NvdW50IjoiYmE5MGZiYTYwOGEyNDZkYWEyNWI5NDQ0NWE4NzA0YTgiLCJkb21haW5Vc2VySWQiOiIiLCJ0eXBlIjo2NywiaWF0IjoxNjYwMDk4MjI3LCJqdGkiOiIzMjYiLCJzdWIiOiJiYTkwZmJhNjA4YTI0NmRhYTI1Yjk0NDQ1YTg3MDRhOCIsImV4cCI6MTY2MDM1NzQyN30.HcWbGkvE-FulIyLjqojdWVFxp0jztx0hCVBpkB0SxVjX4D772_z8zX_7cEXQvNKvwjzdGvQY2pw-yUlfU1kMyw")
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