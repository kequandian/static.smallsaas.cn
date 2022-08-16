// import React, { useState, useEffect } from 'react';
// import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
// import {
//     Stack,
//     Input,
//     InputGroup,
//     InputLeftAddon,
//     ChakraProvider, Text, Button, Spacer, Center, Flex, InputRightAddon, Box
// } from '@chakra-ui/react'
// import { useForm } from 'react-hook-form';
// import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
// import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
// import Price from 'zero-element-boot-plugin-theme/lib/components/text/Price';
// import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
// import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
// import SignOffAddress from '@/pages/CallingCard/PopUpContent/SignOffAddress'
// import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
// import AgreeSelector from '@/components/selector/AgreeSelector'
// require('./index.less');
// import promiseAjax from 'zero-element-boot/lib/components/utils/request';



// export default function index(props) {

//     const { onClickList = [], postAddr, safeCode } = props;


//     let api = '/api/app/oauth/account/login'
//     let codeApi = '/api/link/code/safe-code'

//     // console.log('onClickList === ', onClickList)
//     const [channel, setChannel] = useState()
//     const [contactNum, setKeyContactNum] = useState()
//     const [certName, setCertName] = useState()
//     const [certNo, setCertNo] = useState()

//     function validateData(values) {
//         const query = {
//             // goodsId,
//             certName,certNo,contactNum,postProvinceCode,postProvinceCode,postAddr,policyName,
//             qz_gdt,gdt_vid,
//             financeChannelCode,
//             safeCode,channel,
//             // contactNum,
//             // certName,
//             // certNo,
//             "goodsId": "982203315714",
//             // "certName": "林学文",
//             // "certNo": "44142719951224171X",
//             // "contactNum": "17827409860",
//             "postProvinceCode": "13076511024",
//             "postCityCode": "440100",
//             "postDistrictCode": "440112",
//             // "postAddr": "440000",
//             // "saleTurn": "",
//             // "policyId": "",
//             // "policyName": "215",
//             // "firstMonthFee": "",
//             // "qz_gdt": "123",
//             // "gdt_vid": "123",
//             // "expectPostTime": "",
//             // "expectPostTimeEnd": "",
//             // "wtMcId": "",
//             // "referrerPhone": "",
//             // "orderTotalFee": "",
//             // "isOpenCF": "",
//             // "financeFlag": "",
//             // // "financeChannelCode": "",
//             // "contractId": "",
//             // "actId": "",
//             // "provinceCode": "",
//             // "cityCode": "",
//             // "phoneNum": "",
//             // "safeCode": "277446"
//         }
//         promiseAjax(api, query, { method: 'POST' }).then(resp => {
//             if (resp && resp.code === 0) {
//                 alert('下单成功')
//             }
//         });
//         updateName(safeCode)
//     }
//     const {
//         handleSubmit,
//         register,
//         reset,
//         formState: { errors, isSubmitting },
//     } = useForm()



//     function code() {
//         const codeData = {
//             // "certName": "傅庆发",
//             // "certNum": "445281199805293856",
//             // "contactNum": "15581531981",
//             // "cityCode": "445200",
//             // "provinceCode": "440000"
//             certName,
//             certNum,
//             contactNum,
//             cityCode,
//             provinceCode
//         }

//         promiseAjax(codeApi, codeData, { method: 'POST' }).then(resp => {
//             console.log('resp ==', resp)
//             if (resp && resp.code === 0) {
//                 alert('验证码发送成功')
//             }
//         }
//         )
//     }

//     function updateName(query) {

//         const queryData = {
//             // "certNo": "44142719951224171X",
//             // "contactNum": "15488681212",
//             // "safeCode": "151853"
//             certNo,
//             contactNum,
//             safeCode
//         }
//         promiseAjax('/api/link/code/check-code', queryData, { method: "PUT" })
//             .then(res => {
//                 // console.log(res, '== 更新')
//                 if (res && res.code === 200) {
//                     alert('验证成功')
//                 }
//             })
//     }


//     const [agreeStatus, setAgreeStatus] = useState(false)

//     function changContactNum(e) {
//         console.log('change value = ', e.target.value)
//         setKeyContactNum(e.target.value)
//     }

//     function changeCertName(e) {
//         setCertName(e.target.value)
//         console.log('certName ==', certName)
//     }

//     function changeCertNo(e) {
//         setCertNo(e.target.value)
//         console.log('certNo ==', certNo)

//     }

//     function CallBack(agreeStatus, channel) {
//         setAgreeStatus(agreeStatus)
//         setChannel(channel)
//         // console.log('agreeStatus===', agreeStatus)
//     }
//     function warn() {
//         alert('请填写完信息')
//         // console.log('请填写完信息')
//     }
//     return (
//         <ChakraProvider>
//             <Stack >
//                 <Center>
//                     <ContainerSubtitle>已选择</ContainerSubtitle>
//                 </Center>
//                 <Center>
//                     <Flex>
//                         <PrimaryTitle fontSize='20px' color='#ff0704'>靓号: {onClickList[0]}</PrimaryTitle>
//                     </Flex>
//                 </Center>


//                 <p style={{ color: '#9ba6af' }} >
//                     <span style={{ color: '#ff0704', fontWeight: 'bold' }} >注</span>：此号码需预存<span style={{ color: '#ff0704', fontWeight: 'bold' }} >{onClickList[1]}</span>元，月承诺消费<span style={{ color: '#ff0704', fontWeight: 'bold' }} >{onClickList[3]}</span>元，承诺在网<span style={{ color: '#ff0704', fontWeight: 'bold' }} >{onClickList[6]}</span>月
//                 </p>
//                 <Spacer />

//                 <Center>
//                     <PrimarySubtitle>
//                         根据国家手机号卡实名制规定
//                     </PrimarySubtitle>
//                 </Center>
//                 <Center>
//                     <PrimarySubtitle>
//                         请如实填写信息，以便我们及时为您送达
//                     </PrimarySubtitle>
//                 </Center>

//                 <Spacer />
//                 <Spacer />
//                 <form onSubmit={handleSubmit(validateData)} noValidate>
//                     <Stack spacing={6} h=''>
//                         <InputGroup size='sm'>
//                             <InputLeftAddon children={
//                                 <Center w='60px'>
//                                     <PrimarySubtitle>
//                                         姓名
//                                     </PrimarySubtitle>
//                                     <Price> *</Price>
//                                 </Center>} />
//                             <Input type='text' value={certName} placeholder='请填写真实姓名（已加密）' onChange={(e) => changeCertName(e)}
//                             // {...register('name', {
//                             //     minLength: { value: 10, message: '' },
//                             //     onkeyup: { value: "value.replace(/[^(\d)]/g" }
//                             //     // onblur="checkNum()"
//                             // })}
//                             />
//                         </InputGroup>


//                         <InputGroup size='sm'>
//                             <InputLeftAddon children={
//                                 <Center w='60px'>
//                                     <PrimarySubtitle>
//                                         手机号
//                                     </PrimarySubtitle>
//                                     <Price> *</Price>
//                                 </Center>} />
//                             <Input type='tel' value={contactNum} placeholder='请填写本人联系电话（已加密）' maxLength='11' onChange={(e) => changContactNum(e)} />
//                             <InputRightAddon w='90px' padding='8px'>
//                                 <div style={{ color: '#a772ff', fontSize: '13px' }} onClick={() => code()}  >
//                                     获取验证码
//                                 </div>
//                             </InputRightAddon>
//                         </InputGroup>
//                         {contactNum && contactNum.length == 11 ? (
//                             <>
//                                 <InputGroup size='sm'>
//                                     <InputLeftAddon children={
//                                         <Center w='60px'>
//                                             <PrimarySubtitle>
//                                                 验证码
//                                             </PrimarySubtitle>
//                                             <Price> *</Price>
//                                         </Center>} />
//                                     <Input type='tel' value={safeCode} placeholder='' />
//                                 </InputGroup>
//                                 <InputGroup size='sm'>
//                                     <InputLeftAddon children={
//                                         <Center w='60px'>
//                                             <PrimarySubtitle>
//                                                 身份证号
//                                             </PrimarySubtitle>
//                                             <Price> *</Price>
//                                         </Center>} />
//                                     <Input type='tel' value={certNo} placeholder='请填写真实信息（已加密）' maxLength='18' onChange={(e) => changeCertNo(e)}
                                 
//                                     />
//                                 </InputGroup>
//                                 <InputGroup size='sm'>
//                                     <InputLeftAddon children={
//                                         <Center w='60px'>
//                                             <PrimarySubtitle>
//                                                 签收城市
//                                             </PrimarySubtitle>
//                                             <Price> *</Price>
//                                         </Center>} />
//                                     <SignOffAddress />
//                                 </InputGroup>
//                                 <InputGroup size='sm'>
//                                     <InputLeftAddon children={
//                                         <Center w='60px'>
//                                             <PrimarySubtitle>
//                                                 详细地址
//                                             </PrimarySubtitle>
//                                             <Price> *</Price>
//                                         </Center>} />
//                                     <Input value={postAddr} minLength='4' placeholder='街道/镇+村/小区/写字楼+门牌号' />
//                                 </InputGroup>


//                             </>
//                         ) : <></>}

//                         <Flex>
//                             <Center w='50px'>
//                                 <AgreeSelector CallBack={CallBack} />
//                             </Center>
//                             <p style={{ color: '#c3c3c3' }}>
//                                 已阅读并同意 <a className='link' target='_blank' href='https://m.75510010.com/view/3F8Bc1DC61' >《入网协议》</a>、<a href='https://m.75510010.com/view/73Cd7812C9' className='link'>《信息收集公告》</a>、<a href='https://m.75510010.com/view/8b147a3A2e' className='link'>《靓号协议》</a>
//                             </p>
//                         </Flex>

//                         {/* <Box bg='#adcdeb' color='#ffffff90' padding={}>
                            
//                             0元申请 包邮到家
//                         </Box> */}

//                         {certNo && certNo.length == 18 && contactNum && agreeStatus && contactNum.length == 11 ? (
//                             // {agreeStatus ? (
//                             <Button width='100%' height='40px' colorScheme='twitter' variant='solid' isLoading={isSubmitting} type='submit' size='sm' >
//                                 0元申请 包邮到家
//                             </Button>
//                         ) :
//                             (
//                                 <Button width='100%' height='40px' colorScheme='gray' variant='solid' type='submit' size='sm' onClick={() => { warn() }}>
//                                     0元申请 包邮到家
//                                 </Button>

//                             )
//                         }
//                     </Stack>
//                 </form>
//             </Stack>
//         </ChakraProvider >
//     )
// }
