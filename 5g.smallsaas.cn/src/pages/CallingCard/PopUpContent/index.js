
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

    const { onClickList = [], infoData, vendorCode, isClose, selectGoodsId, productId, productName } = props;


    // 获取验证码的api
    // let codeApi = '/api/link/code/safe-code'

    const [contactNum, setKeyContactNum] = useState('') //手机号
    const [certName, setCertName] = useState('') //姓名
    const [address, setAddress] = useState('') //详细地址
    const [certNo, setCertNo] = useState('') //身份证号
    const [safeCode, setSafeCode] = useState('') //验证码
    const [postProvinceCode, setPostProvinceCode] = useState('')
    const [postDistrictCode, setpostDistrictCode] = useState('')
    const [postCityCode, setpostCityCode] = useState('')

    // console.log('postProvinceCode=', postProvinceCode)
    // console.log('postDistrictCode=', postDistrictCode)
    // console.log('postCityCode=', postCityCode)

    // // 获取产品信息
    // const [ProductListData, setProductListData] = useState([])

    // // 回调选择的产品id
    // const [selectGoodsId, setSelectGoodsId] = useState('')

    // function onProductClick(goodsId) {
    //     setSelectGoodsId(goodsId)
    // }

    useEffect(_ => {
        setCertName('')
        setKeyContactNum('')
        setAddress('')
        setCertNo('')
        setSafeCode('')
        setPostProvinceCode('')
        setpostDistrictCode('')
        setpostCityCode('')
        // setSelectGoodsId('')

    }, [isClose])

    // function productList() {
    //     const Data = {}
    //     promiseAjax(`/api/u/accountProduct/Unicom5G`, Data, { method: 'GET' }).then(resp => {
    //         if (resp && resp.code === 200) {
    //             let ListData = resp.data.records
    //             // console.log('ListData ==', ListData)
    //             setProductListData(ListData)
    //         }
    //     }
    //     )
    // }


    // 获取验证码
    function code() {
        const codeData = {
            // "certName": "傅庆发",
            // "certNum": "445281199805293856",
            // "contactNum": "15212165381",
            // "cityCode": "445200",
            // "provinceCode": "440000"
            "certName": `${certName}`,
            "certNo": `${certNo}`,
            "contactNum": `${contactNum}`,
        }
        promiseAjax('/api/u/oauth/verification/send', codeData, { method: 'GET' }).then(resp => {
            if (resp && resp.code === 200) {
                Toast.show(
                    '验证码发送成功',
                    2
                )
            }
        }
        ).catch(errors => {
            console.log('errors==', errors)
            Toast.show(
                '获取验证码失败!',
                2
            )
        });
    }

    // 获取验证码条件提示
    function VCprompt() {
        if (!contactNum) {
            Toast.show(
                '请填写手机号',
                2
            )
            if (!certNo) {
                Toast.show(
                    '请填写身份证号码',
                    2
                )
                if (!certName) {
                    Toast.show(
                        '请填写真实姓名',
                        2
                    )
                }
            }
        }
        else {
            if (!certNo) {
                Toast.show(
                    '请填写身份证号码',
                    2
                )
                if (!certName) {
                    Toast.show(
                        '请填写真实姓名',
                        2
                    )
                }
            }
            else {
                if (!certName) {
                    Toast.show(
                        '请填写真实姓名',
                        2
                    )
                }
            }

        }

    }

    // 下单
    function validateData(values) {
        const query = {
            "app": "3",
            address,
            certName,
            certNo,
            contactNum,
            vendorCode,
            safeCode,
            "pre_storage_price": `${onClickList[1]}`,
            "coChannel": `${infoData.coChannel}`,
            "coUserId": `${infoData.coUserId}`,
            "cityCode": "445200",
            "phoneNum": `${onClickList[0]}`,
            "goodsId": `${selectGoodsId}`,
            "productId": `${productId}`,
            "productName": `${productName}`,
            // "reference": `${infoData.phone}`,
            "postCityCode": `${postCityCode}`,
            "postDistrictCode": `${postDistrictCode}`,
            "postProvinceCode": `${postProvinceCode}`,
            "provinceCode": '440000',
            "price": "0",
            "dealPrice": "0",
            "profit": "0"
        }

        // 验证码限制
        // const queryData = {
        //     "certName": `${certName}`,
        //     "certNo": `${certNo}`,
        //     "safeCode": `${safeCode}`,
        //     "contactNum": `${contactNum}`
        // }
        // promiseAjax('/api/u/oauth/verification/check', queryData, { method: "GET" })
        //     .then(res => {
        // if (res && res.code === 200) {
        // console.log(res, '== 验证成功')
        promiseAjax(api(), query, { method: 'POST' }).then(resp => {
            const prompt = resp.message == 'success' ? '下单成功' : resp.message
            // setTimeout(() => {
            Toast.show(
                `${prompt}`,
                2
            )
            // }, 100)
            // if (resp && resp.data.code === 0) {
            //     console.log('111111111111111')
            //     Toast.show(
            //         '下单成功',
            //         2
            //     )
            // }

            submit()
            setTimeout(() => {
                if(resp.code === 0 && resp.success){
                    history.push(`/CheckoutSuccess?vendorCode=${vendorCode}`)
                }
            }, 300)

        }).catch(message => {
        });

        // }
        // }).catch(errors => {
        //     console.log('errors==', errors)
        //     Toast.show(
        //         '验证码验证失败，请重新验证!',
        //         2
        //     )
        // });


            // submit()
        // setTimeout(() => {
        //     history.push(`/CallingCard?vendorCode=${vendorCode}`)
        // }, 300)

    }

    // 提交表单内容
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()




    // 判断是否同意协议的状态变量
    const [agreeStatus, setAgreeStatus] = useState(false)

    // 表单内容
    function changContactNum(e) {
        setKeyContactNum(e.target.value)
    }
    function changeCertName(e) {
        setCertName(e.target.value)
    }
    function changeSafeCode(e) {
        setSafeCode(e.target.value)
    }
    function changeCertNo(e) {
        setCertNo(e.target.value)
    }
    function changeAddress(e) {
        setAddress(e.target.value)
    }

    // 回调是否同意协议
    function CallBack(agreeStatus) {
        setAgreeStatus(agreeStatus)
        // resetValue()
    }

    // function warn() {
    //     if (!/^\d{17}(\d|x)$/i.test(certNo.replace(/\s+/g, ''))) {
    //         return certNoErro;
    //         // return Promise.reject('输入的身份证长度或格式错误');
    //     }
    //     alert('请填写完信息')
    //     // console.log('请填写完信息')
    // }

    // 拿到选择的地址区域编码等信息
    function submit(postProvinceCode, postDistrictCode, postCityCode) {
        setPostProvinceCode(postProvinceCode)
        setpostDistrictCode(postDistrictCode)
        setpostCityCode(postCityCode)
        // console.log("postProvinceCode", postProvinceCode)
        // console.log("postDistrictCode", postDistrictCode)
        // console.log("postCityCode", postCityCode)
    }


    // console.log('selectGoodsId ==', selectGoodsId)

    // const defaultValues = {};
    useEffect(_ => {
        // productList()
        // resetValue()
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
                {/* 
                <Center w='' onClick={() => productList()} borderTop='1px dashed #333333'>
                    <ItemTitle>
                        请选择产品
                    </ItemTitle>
                    <PrimaryTitle fontSize='18px' color='#ff0704'> *</PrimaryTitle>
                </Center>
                <ProductList items={ProductListData} onProductClick={(goodsId) => onProductClick(goodsId)} selectGoodsId={selectGoodsId} /> */}

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
                            // {...register('certName', {
                            // minLength: { value: 10, message: '' },
                            // onkeyup: { value: "value.replace(/[^(\d)]/g" }
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
                                        <div style={{ color: '#a7b4c5', fontSize: '13px' }} onClick={() => VCprompt()}  >
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
                                <Input type='tel' value={safeCode} placeholder='六位数' maxLength='6' onChange={(e) => changeSafeCode(e)} />
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
                                            <SignOffAddress submit={(postProvinceCode, postDistrictCode, postCityCode) => submit(postProvinceCode, postDistrictCode, postCityCode)} />
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
                                <Button width='100%' height='40px' colorScheme='gray' variant='solid' type='submit' size='sm' disabled>
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