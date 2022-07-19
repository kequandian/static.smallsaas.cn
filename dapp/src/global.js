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
  // setEndpoint('https://house.cloud.smallsaas.cn');
  // setEndpoint('http://app1.console.smallsaas.cn:8001');

  // setEndpoint('http://demo.smallsaas.cn:80');
  // setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEiLCJ1c2VySWQiOiIxIiwidGVuYW50T3JnSWQiOjEsImFjY291bnQiOiJhZG1pbiIsInVzZXJUeXBlIjoxMDAsImRldlVzZXJUeXBlIjowLCJiVXNlclR5cGUiOiJTWVNURU0iLCJpYXQiOjE2NTM4NzU4NjcsImp0aSI6IjEiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTY1NDEzNTA2N30.SqSK5gZTaeoaLbqLK5les8DLLSoYeOldL-1ndwXRkfo8bvNgkB5KT4EaiZrw7FF-bLk5ttBseTaxKdRK9BL3RQ')
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