
import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import {
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    ChakraProvider, Text, Button, Spacer, Center, Flex, InputRightAddon, Box
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import Price from 'zero-element-boot-plugin-theme/lib/components/text/Price';
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
// import SignOffAddress from '@/pages/CallingCard/PopUpContent/SelectAddress'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import AgreeSelector from '@/components/selector/AgreeSelector'
require('./index.less');
import promiseAjax from 'zero-element-boot/lib/components/utils/request';
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import SignOffAddress from '@/pages/CallingCard/PopUpContent/SelectAddress'
import api from '../api'
import { Toast } from 'antd-mobile'
import ProductList from './ProductList'
import { history } from 'umi';


export default function index(props) {

    const { onClickList = [], postAddr, reference, safeCode, infoData, vendorCode } = props;
    console.log('infoData ==', infoData)

    // let api = '/api/link/order/subNotOfterOrdertest'

    // 获取验证码的api
    let codeApi = '/api/link/code/safe-code'

    // console.log('props === ', props)
    // console.log('api === ', api)
    // const [channel, setChannel] = useState()

    const [contactNum, setKeyContactNum] = useState('')
    const [certName, setCertName] = useState('')
    const [address, setAddress] = useState('')
    const [certNo, setCertNo] = useState('')
    const [postProvinceCode, setPostProvinceCode] = useState('')
    const [postDistrictCode, setpostDistrictCode] = useState('')
    const [postCityCode, setpostCityCode] = useState('')

    // 产品信息
    const [ProductListData, setProductListData] = useState([])

    function productList() {
        const Data = {}
        promiseAjax(`/api/u/accountProduct/Unicom5G`, Data, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                let ListData = resp.data.records
                // console.log('ListData ==', ListData)
                setProductListData(ListData)
            }
        }
        )
    }


    // 下单
    function validateData(values) {
        const query = {
            address,
            certName,
            certNo,
            contactNum,
            vendorCode,
            "coChannel": `${infoData.coChannel}`,
            "coUserid": `${infoData.coUserId}`,
            // "selectGoodsId": `${selectGoodsId}`,
            "cityCode": "445200",
            "phoneNum": `${onClickList[0]}`,
            "goodsId": `${selectGoodsId}`,
            "reference": `${infoData.phone}`,
            "postCityCode": `${postCityCode}`,
            "postDistrictCode": `${postDistrictCode}`,
            "provinceCode": '440000',
            "postProvinceCode": `${postProvinceCode}`,
        }

        // 验证码限制
        const queryData = {
            // "certNo": "44142719951224171X",
            // "contactNum": "15488681212",
            // "safeCode": "151853"
            certNo,
            contactNum,
            safeCode
        }
        // promiseAjax('/api/link/code/check-code', queryData, { method: "PUT" })
        //     .then(res => {
        //         if (res && res.code === 200) {
        //             console.log(res, '== 验证成功')
        promiseAjax(api(), query, { method: 'POST' }).then(resp => {
            if (resp && resp.data.code === 0) {
                // console.log("resp ==", resp)
                // alert('下单成功')
                Toast.show(
                    '下单成功',
                    2
                )
                setTimeout(() => {
                    history.push('/CallingCard')
                }, 200)

            }
            //         });
            //     } else {
            //         alert('验证码验证失败，请重新验证！')
            //     }
        }).catch(errors => {
            console.log('errors==', errors)
            // alert('下单失败，请稍后重试')
            Toast.show(
                '下单失败，请稍后重试',
                2
            )
        });
        // updateName(safeCode)
        submit()
    }

    // 提交表单内容
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()


    // 获取验证码
    function code() {
        const codeData = {
            // "certName": "傅庆发",
            // "certNum": "445281199805293856",
            // "contactNum": "15212165381",
            // "cityCode": "445200",
            // "provinceCode": "440000"
            "certName":`${certName}`,
            "certNo":`${certNo}`,
            "contactNum":`${contactNum}`,
        }
        promiseAjax('/api/u/oauth/verification/send', codeData, { method: 'GET' }).then(resp => {
            console.log('resp ==', resp)
            if (resp && resp.data.code === 0) {
                // alert('验证码发送成功')
                Toast.show(
                    '验证码发送成功',
                    2
                )
            }
        }
        )
    }

    // 判断是否同意协议的状态变量
    const [agreeStatus, setAgreeStatus] = useState(false)


    function changContactNum(e) {
        // console.log('change value = ', e.target.value)
        setKeyContactNum(e.target.value)
    }

    function changeCertName(e) {
        setCertName(e.target.value)
        // console.log('certName ==', certName)
    }

    function changeCertNo(e) {
        setCertNo(e.target.value)
        // console.log('certNo ==', certNo)

    }
    function changeAddress(e) {
        setAddress(e.target.value)
    }
    function CallBack(agreeStatus) {
        setAgreeStatus(agreeStatus)
        // setChannel(channel)
        // console.log('agreeStatus===', agreeStatus)
    }
    function warn() {
        if (!/^\d{17}(\d|x)$/i.test(certNo.replace(/\s+/g, ''))) {
            return certNoErro;
            // return Promise.reject('输入的身份证长度或格式错误');
        }
        alert('请填写完信息')
        // console.log('请填写完信息')
    }

    // 拿到选择的地址区域编码等信息
    function submit(Selectprovince, SelectCity, SelectRegion, postProvinceCode, postDistrictCode, postCityCode) {
        // console.log('Selectprovince11  ==', Selectprovince)
        // console.log(' SelectCity11 ==', SelectCity)
        // console.log(' SelectRegion11 ==', SelectRegion)
        // console.log(' postProvinceCode11 ==', postProvinceCode)
        // console.log(' postDistrictCode11 ==', postDistrictCode)
        // console.log(' postCityCode11 ==', postCityCode)
        setPostProvinceCode(postProvinceCode)
        setpostDistrictCode(postDistrictCode)
        setpostCityCode(postCityCode)
    }


    // 回调选择的产品id

    const [selectGoodsId, setSelectGoodsId] = useState('')

    function onProductClick(goodsId) {
        // console.log('11111')
        // console.log('goodsId ==', goodsId)

        setSelectGoodsId(goodsId)
    }
    console.log('selectGoodsId ==', selectGoodsId)


    useEffect(_ => {
        productList()
    }, [])
    return (
        <ChakraProvider>
            <Stack >
                <Center>
                    <ContainerSubtitle>已选择</ContainerSubtitle>
                </Center>
                <Center>
                    <Flex>
                        <PrimaryTitle fontSize='20px' color='#ff0704'>靓号: {onClickList[0]}</PrimaryTitle>
                    </Flex>
                </Center>
                {/* <Text color='#'>邀请人:{reference}</Text>
                <Text color='#'>coUserid:{coUserid}</Text>
                <Text color='#'>coChannel:{coChannel}</Text> */}
                <p style={{ color: '#9ba6af' }} >
                    <span style={{ color: '#ff0704', fontWeight: 'bold' }} >注</span>：此号码需预存<span style={{ color: '#ff0704', fontWeight: 'bold' }} >{onClickList[1]}</span>元，月承诺消费<span style={{ color: '#ff0704', fontWeight: 'bold' }} >{onClickList[3]}</span>元，承诺在网<span style={{ color: '#ff0704', fontWeight: 'bold' }} >{onClickList[6]}</span>月
                </p>
                <Spacer />

                <Center>
                    <PrimarySubtitle>
                        根据国家手机号卡实名制规定
                    </PrimarySubtitle>
                </Center>
                <Center>
                    <PrimarySubtitle>
                        请如实填写信息，以便我们及时为您送达
                    </PrimarySubtitle>
                </Center>

                <Center w='' onClick={() => productList()} borderTop='1px dashed #333333'>
                    <ItemTitle>
                        请选择产品
                    </ItemTitle>
                    <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                </Center>
                <ProductList items={ProductListData} onProductClick={(goodsId) => onProductClick(goodsId)} selectGoodsId={selectGoodsId} />

                <Spacer />
                <Spacer />
                <form onSubmit={handleSubmit(validateData)} noValidate>
                    <Stack spacing={6} h=''>

                        <InputGroup size='md'  >
                            <InputLeftAddon children={
                                <Center w='60px'>
                                    <ItemTitle>
                                        姓名
                                    </ItemTitle>
                                    <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                                </Center>} />
                            <Input type='text' value={certName} placeholder='请填写真实姓名（已加密）' onChange={(e) => changeCertName(e)}
                            // {...register('name', {
                            //     minLength: { value: 10, message: '' },
                            //     onkeyup: { value: "value.replace(/[^(\d)]/g" }
                            //     // onblur="checkNum()"
                            // })}
                            />
                        </InputGroup>
                        <InputGroup size='md'>
                            <InputLeftAddon children={
                                <Center w='60px'>
                                    <ItemTitle>
                                        身份证号
                                    </ItemTitle>
                                    <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                                </Center>} />
                            <Input type='text' value={certNo} placeholder='请填写真实信息（已加密）' maxLength='18' onChange={(e) => changeCertNo(e)}
                            />
                        </InputGroup>

                        <InputGroup size='md'>
                            <InputLeftAddon children={
                                <Center w='60px'>
                                    <ItemTitle>
                                        手机号
                                    </ItemTitle>
                                    <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                                </Center>} />
                            <Input type='tel' value={contactNum} placeholder='请填写本人联系电话（已加密）' maxLength='11' onChange={(e) => changContactNum(e)} />
                            <InputRightAddon w='90px' padding='8px'>

                                {
                                    certName && certNo && contactNum.length == 11 ?
                                        <div style={{ color: '#ff0704', fontSize: '13px' }} onClick={() => code()}  >
                                            获取验证码
                                        </div>
                                        :
                                        <div style={{ color: '#a7b4c5', fontSize: '13px' }}  >
                                            获取验证码
                                        </div>

                                }
                            </InputRightAddon>
                        </InputGroup>
                        <>
                            <InputGroup size='md'>
                                <InputLeftAddon children={
                                    <Center w='60px'>
                                        <ItemTitle>
                                            验证码
                                        </ItemTitle>
                                        <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                                    </Center>} />
                                <Input type='tel' value={safeCode} placeholder='六位数' maxLength='6' />
                            </InputGroup>

                            {(certName && contactNum && contactNum.length == 11) ?
                                (
                                    <>

                                        <InputGroup size='md'>
                                            <InputLeftAddon children={
                                                <Center w='60px'>
                                                    <ItemTitle>
                                                        签收城市
                                                    </ItemTitle>
                                                    <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                                                </Center>} />
                                            <SignOffAddress submit={(Selectprovince, SelectCity, SelectRegion, postProvinceCode, postDistrictCode, postCityCode) => submit(Selectprovince, SelectCity, SelectRegion, postProvinceCode, postDistrictCode, postCityCode)} />
                                        </InputGroup>
                                        <InputGroup size='md'>
                                            <InputLeftAddon children={
                                                <Center w='60px'>
                                                    <ItemTitle>
                                                        详细地址
                                                    </ItemTitle>
                                                    <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                                                </Center>} />
                                            <Input value={address} minLength='4' placeholder='街道/镇+村/小区/写字楼+门牌号' onChange={(e) => changeAddress(e)} />
                                        </InputGroup>
                                    </>
                                ) : <></>
                            }
                        </>

                        <Flex>
                            <Center w='60px'>
                                <AgreeSelector CallBack={CallBack} />
                            </Center>
                            <p style={{ color: '#c3c3c3' }}>
                                已阅读并同意 <a className='link' target='_blank' href='https://m.75510010.com/view/3F8Bc1DC61' >《关于用户跟人信息收集、使用规则的公告》</a>、<a href='https://m.75510010.com/view/73Cd7812C9' className='link'>《中国联通客户入网协议》</a>、<a href='https://m.75510010.com/view/8b147a3A2e' className='link'>中国联通客户移动业务靓号协议》</a>
                            </p>
                        </Flex>

                        {/* <Box bg='#adcdeb' color='#ffffff90' padding={}>
                            
                            0元申请 包邮到家
                        </Box> */}

                        {certNo && certNo.length == 18 && contactNum && agreeStatus && address && contactNum.length == 11 ? (
                            // {agreeStatus ? (
                            <Button width='100%' height='40px' colorScheme='twitter' variant='solid' isLoading={isSubmitting} type='submit' size='sm' >
                                0元申请 包邮到家
                            </Button>
                        ) :
                            (
                                <Button width='100%' height='40px' colorScheme='gray' variant='solid' type='submit' size='sm' onClick={() => { warn() }}>
                                    0元申请 包邮到家
                                </Button>
                            )
                        }
                    </Stack>
                </form>
            </Stack>
        </ChakraProvider >
    )
}