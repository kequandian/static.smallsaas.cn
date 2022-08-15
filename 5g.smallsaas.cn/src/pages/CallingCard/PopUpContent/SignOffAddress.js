import { Cascader } from 'antd';
import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';




// const App = () => <Cascader  options={options} onChange={onChange} placeholder="请选择" />;

// export default App;
export default function SignOffAddress(props) {
  const { }=props
  const options = [
    {
      value: '广州',
      label: '广州',
      children: [
        {
          value: '广州市',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const onChange = (value) => {
  // console.log(value);
};
  return (
    <CssCart width='100%'>
    <Cascader size='large' width='100%' options={options} onChange={onChange} placeholder="请选择" />
    </CssCart>
  )

}