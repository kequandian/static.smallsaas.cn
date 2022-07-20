import React from 'react'
import { getEndpoint } from 'zero-element-boot/lib/components/config/common'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest'

const endpoint = getEndpoint()

export default function RentAssetDetails(props) {

  const urlQuery = useQuery(props)
  const api = `/api/u/house/rent/rentCommon/userRentAssetDetails/${urlQuery.query.id}`

  return (
    <div>
      <div>RentAssetDetails</div>
      <div>id: {urlQuery.query.id}</div>
    </div>
  )
}
