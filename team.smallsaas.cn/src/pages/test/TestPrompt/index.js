import React, { FC, useEffect, useRef, useState } from 'react'
import { Button, Space, Toast } from 'antd-mobile'
// import { DemoBlock } from 'demos'
// import { UploadOutline } from 'antd-mobile-icons'
// import type { ToastHandler } from 'antd-mobile/es/components/toast'

export default function index(props) {
  function aa() {
    console.log('111111111111')
  }
  return (
    <>

      <Button
        onClick={() => 
          Toast.show({
            icon: 'fail',
            content: '名称已存在',
          })
          // aa()
        }
      >
        失败
      </Button>
    </>
  )
}
