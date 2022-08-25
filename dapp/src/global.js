// import { set as NamedCartSet } from 'zero-element-boot/lib/config/NamedCartConfig';
import { set as NamedIndicatorSet } from 'zero-element-boot/lib/components/config/NamedIndicatorConfig';
import { set as NamedPresenterSet } from 'zero-element-boot/lib/components/config/NamedPresenterConfig';
// import { set as FormItemTypeSet } from 'zero-element-boot/lib/components/config/formItemTypeConfig';
import { set as NamedCartConfig } from 'zero-element-boot/lib/components/config/NamedCartConfig';
import { set as NamedListConfig } from 'zero-element-boot/lib/components/config/NamedListConfig';

import { setEndpoint, setToken } from 'zero-element-boot/lib/components/config/common';
import { Cart, Circle,HightlightCart,HoverShadowCart,Rectangle,Round,SelectCart} from 'zero-element-boot/lib/components/cart/';
import OnDeleteIndicator from 'zero-element-boot/lib/components/indicator/OnDeleteIndicator'
import GroupedList from '@/components/list/GroupedList';


if (process.env.NODE_ENV == 'development') {
  setEndpoint('https://house.cloud.smallsaas.cn');
  // setEndpoint('http://app1.console.smallsaas.cn:8001');

  // setEndpoint('http://demo.smallsaas.cn:80');
  // setToken('eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6MzAsInVzZXJJZCI6Mjk4LCJhY2NvdW50IjoiNTc0ZTY2N2VlODEyNDI1OTlhMzZkOWU3YzJmMGJlYWEiLCJkb21haW5Vc2VySWQiOiIiLCJ0eXBlIjo5MTcsImlhdCI6MTY2MTM5NTk2NSwianRpIjoiMjk4Iiwic3ViIjoiNTc0ZTY2N2VlODEyNDI1OTlhMzZkOWU3YzJmMGJlYWEiLCJleHAiOjE2NjE2NTUxNjV9.1g3eTmi9J66T548x7bMkdBxYPljgdYX3M431u4I-UJcs7gs4NJyaduo9RBy4iPoIl989rCrPfnQ0E6CNFOTmNg')
} else {
  // setEndpoint('https://app1.console.smallsaas.cn:8001');
  setEndpoint('https://house.cloud.smallsaas.cn');

}

//presenter
// import SelectFetch from '@/pages/SelectFetch';

NamedIndicatorSet({
  Cart,
  OnDeleteIndicator

})

NamedPresenterSet({
})

NamedListConfig({
  GroupedList
})
// FormItemTypeSet({
//   "Select-fetch1": SelectFetch
// })