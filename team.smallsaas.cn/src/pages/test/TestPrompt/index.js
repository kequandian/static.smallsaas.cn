import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Space, Toast } from 'antd-mobile'
// import { DemoBlock } from 'demos'
// import { UploadOutline } from 'antd-mobile-icons'
// import type { ToastHandler } from 'antd-mobile/es/components/toast'

export default function index(props) {
  function aa() {
    return Toast.show({
      icon: 'fail',
      content: '名称已存在',
    })
  }
  return (
    <>

      <Button
            onClick={() => {
              Toast.success(
                '名称已存在',
                1
              )
            }}
          >
        失败
      </Button>
    </>
  )
}
