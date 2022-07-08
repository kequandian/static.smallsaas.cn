import React from 'react';
import { AutoLayout } from 'zero-element-boot';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';
import Presenter from './Presenter';
import { setEndpoint, setToken } from 'zero-element-boot/lib/components/config/common';


 setToken('eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6MzAsInVzZXJJZCI6Mjk4LCJhY2NvdW50IjoiNTc0ZTY2N2VlODEyNDI1OTlhMzZkOWU3YzJmMGJlYWEiLCJkb21haW5Vc2VySWQiOiIiLCJpYXQiOjE2NTcwMDcwODgsImp0aSI6IjI5OCIsInN1YiI6IjU3NGU2NjdlZTgxMjQyNTk5YTM2ZDllN2MyZjBiZWFhIiwiZXhwIjoxNjU3MjY2Mjg4fQ.4cAHT7fjo45y8Ir2LJl7owDQLExq-5Hwg3FxaVIOCPnp_q3zZ53fgOnT_6-ovTGPny_CtBf_HvzKjLBuDC6SJA')


export default function index(props) {

  
  const { endpoint,...rest } = props;
  

  // let api = '/api/AutoDomeData'

  const api =endpoint+'/api/u/asset/user/userAsset'


  const [data] = useTokenRequest({ api });


  /**
   * 页面配置
   */

  const config = {
    items: data.length > 0 ? data : [],
    layout: {
      xname: 'Gridbox',
      props: {
        columns: 1
      },
      container: 'PlainList'
    }

  };

  return (
    <AutoLayout {...config} data={data} {...rest} >
      <Presenter />
    </AutoLayout>

  )
}