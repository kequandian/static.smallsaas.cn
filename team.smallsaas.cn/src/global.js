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
  // setToken("eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6IiIsInVzZXJJZCI6NTA1LCJhY2NvdW50IjoiYWNjNjYwODQzMDEiLCJkb21haW5Vc2VySWQiOiIiLCJ0eXBlIjoiIiwiaWF0IjoxNjYxODUzMjQ2LCJqdGkiOiI1MDUiLCJzdWIiOiJhY2M2NjA4NDMwMSIsImV4cCI6MTY2MjExMjQ0Nn0.m9xZeUqtMQD_vjswIonEkzrFTZuDMRZ-ZdNQHDcIXeQX4QTU5LZwg0E8cazkFL51CSoG4j-jN_Byu7QIlALJQA")
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