// import { Button, Drawer, Radio, Space } from 'antd';
// import React, { useCallback, useState } from 'react';
// import Login from './login'
// import QQInterconnection from './QQInterconnection'


// export default function index(props) {

//     // const appid = window.location.pathname.substring(1, window.location.pathname.length)
//     // console.log('appid ==', appid)
//     const { reference='',coChannel='',coUserid='',vendorCode} = props
//     // console.log('props==',props)

//     // //接收扫码跳转带过来的参数
//     // const reference = props.location.query.channel
//     // const coChannel = props.location.query.coChannel
//     // const coUserid = props.location.query.coUserid
//     // const vendorCode = props.location.query.vendorCode

//     const [visible, setVisible] = useState(false);
//     const [onClickList, setOnClickList] = useState([]);

//     const showDrawer = (item) => {
//         setVisible(true);
//         setOnClickList(item)
//         console.log('111111111111111')
//     };

//     const onClose = () => {
//         setVisible(false);
//     };


//     return (
//         <>
//             <Login onNumberClick={showDrawer} reference={reference} />
//             <Drawer
//                 title="登录"
//                 placement='right'
//                 width='89%'
//                 height='86%'
//                 onClose={onClose}
//                 visible={visible}
//             // extra={
//             //   <Space>
//             //     <Button onClick={onClose}>Cancel</Button>
//             //     <Button type="primary" onClick={onClose}>
//             //       OK
//             //     </Button>
//             //   </Space>
//             // }
//             >
//                 <QQInterconnection  />
//             </Drawer>
//         </>
//     )
// }