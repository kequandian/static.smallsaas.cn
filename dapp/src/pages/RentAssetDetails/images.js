import React, { useState, useEffect } from 'react';
import ImageViewer from 'antd-mobile/es/components/image-viewer'
import { getEndpoint } from 'zero-element-boot/lib/components/config/common'


export default function (props) {
    const { item } = props

    const [visible, setVisible] = useState(false)

    // console.log('item= ',item)
  const endpoint = getEndpoint()

    function handleVrSnapshotUrl(value) {
        // console.log('value ==', value)
        return endpoint + value
      }
    return (
        <>
            <div onClick={() => setVisible(true)} style={{ backgroundImage: `url(${handleVrSnapshotUrl(item.url || item)})`, backgroundSize: '100% ', width: '100%', height: '260px' }} >
            </div>
            <ImageViewer
                image={handleVrSnapshotUrl(item.url || item)}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
            />
        </>
    )
}