// import { Button, Drawer, Radio, Space } from 'antd';
// import React, { useCallback, useState } from 'react';
// import PopUpContent from '@/pages/CallingCard/PopUpContent/index'
// import MainList from '@/pages/CallingCard/MainList'


// export default function index(props) {
//     const { channel} = props
//     console.log('props==',props)
//     // const channel = props.location.query.channel

//     const [visible, setVisible] = useState(false);
//     const [onClickList, setOnClickList] = useState([]);

//     const showDrawer = (item) => {
//         setVisible(true);
//         setOnClickList(item)
//     };

//     const onClose = () => {
//         setVisible(false);
//     };


//     return (
//         <>
//             <MainList onNumberClick={showDrawer}  channel={channel}/>
//             <Drawer
//                 title="下单"
//                 placement='bottom'
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
//                 <PopUpContent onClickList={onClickList}  />
//             </Drawer>
//         </>
//     )
// }