import React, { useState, useEffect } from 'react';
import { AutoLayout } from 'zero-element-boot';
import Item from './Item';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
const promiseAjax = require('zero-element-boot/lib/components/utils/request');


export default function index(props) {

  const { endpoint, cb,onNumberClick, searchNum=0 } = props;

  const api = '/api/link/code/select-num'

  // const [data] = useTokenRequest({ api });

  useEffect(_ => {
    fetchNumber()
  }, [searchNum])
  // let api = '/api/link/code/select-num'
  const [NumberData, setNumberData] = useState([])

  function fetchNumber() {
    let query = {
      "cityCode": "445200",
      "goodsId": "982203315714",
      "groupkey": "1",
      "provinceCode": "440000",
      "searchCategory": "3",
      "searchType": "01",
      // "searchValue": "156",
    }

    if(searchNum > 0){
      query = {
        ...query,
        searchValue: searchNum
      }
    }

    promiseAjax(api, query, { method: 'POST' }).then(resp => {
      // console.log('resp = ', resp)

      if (resp && resp.data.code === 0) {
        setNumberData([{ numList: resp.data.data.data.numArray }])
      }

    });
  }
  // console.log('data==', data)

  /**
   * 页面配置
   */

  const config = {
    items: NumberData && NumberData.length > 0 ? NumberData : [],
    layout: {
      // xname: 'Gridbox',
      // props: {
      //   columns: 1
      // },
      container: 'PlainList',
    },
    ...props
  };

  return (
    <AutoLayout {...config} >
        <Item cb={cb} list='' {...fetchNumber} onNumberClick={onNumberClick} />
    </AutoLayout>

  )
}