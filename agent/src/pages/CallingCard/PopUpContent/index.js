import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import {
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    ChakraProvider, Text, Button, Spacer, Center, Flex
} from '@chakra-ui/react'
import ItemCart from '@/components/presenter/ItemCart'
import { useForm } from 'react-hook-form';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ContainerSubtitle from 'zero-element-boot-plugin-theme/lib/components/text/ContainerSubtitle';
import Price from '@/components/text/Price';
import PrimarySubtitle from '@/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import SignOffAddress from '@/pages/CallingCard/PopUpContent/SignOffAddress'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'



export default function index(props) {

    const { onClickList = [] } = props;

    // console.log('onClickList === ', onClickList)
    const [phone, setKeyValues] = useState()

    function validateData(values) {
        promiseAjax(api, values, { method: 'POST' }).then(resp => {
            if (resp && resp.code === 200) {
            }
        });
    }
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()


    function changeValue(e) {
        console.log('change value = ', e.target.value)
        setKeyValues(e.target.value)
    }
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

                {/* <Center>
                    <Flex >
                        <Center>
                            <Price color='#ff0704'>注 </Price>
                        </Center>
                        <Center>
                            <PrimarySubtitle fontSize='8px' color='#9ba6af'>
                                : 此号码需预存
                                <Price color='#ff0704'> {onClickList[1]}</Price>
                                元，月承诺消费
                                <Price color='#ff0704'> {onClickList[3]}</Price>
                                元，承诺在网
                                <Price color='#ff0704'> {onClickList[6]}</Price>
                                月</PrimarySubtitle>
                        </Center>
                    </Flex>
                </Center> */}
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

                <Spacer />
                <Spacer />
                <form onSubmit={handleSubmit(validateData)} noValidate>
                    <Stack spacing={6} h=''>
                        <InputGroup size='sm'>
                            <InputLeftAddon children={
                                <Center w='60px'>
                                    <PrimarySubtitle>
                                        姓名
                                    </PrimarySubtitle>
                                    <Price> *</Price>
                                </Center>} />
                            <Input type='text' placeholder='请填写真实姓名（已加密）'
                                {...register('name', {
                                    minLength: { value: 10, message: '' },
                                    onkeyup: { value: "value.replace(/[^(\d)]/g" }
                                    // onblur="checkNum()"
                                })}
                            />
                        </InputGroup>


                        <InputGroup size='sm'>
                            <InputLeftAddon children={
                                <Center w='60px'>
                                    <PrimarySubtitle>
                                        手机号
                                    </PrimarySubtitle>
                                    <Price> *</Price>
                                </Center>} />
                            <Input type='tel' value={phone} placeholder='请填写本人联系电话（已加密）' onChange={(e) => changeValue(e)} />
                        </InputGroup>
                        {phone && phone.lenght >= 11 ? (
                            <>
                                <InputGroup size='sm'>
                                    <InputLeftAddon children={
                                        <Center w='60px'>
                                            <PrimarySubtitle>
                                                验证码
                                            </PrimarySubtitle>
                                            <Price> *</Price>
                                        </Center>} />
                                    <Input type='tel' placeholder='' />
                                </InputGroup>
                                <InputGroup size='sm'>
                                    <InputLeftAddon children={
                                        <Center w='60px'>
                                            <PrimarySubtitle>
                                                身份证号
                                            </PrimarySubtitle>
                                            <Price> *</Price>
                                        </Center>} />
                                    <Input type='tel' placeholder='请填写真实信息（已加密）' />
                                </InputGroup>
                                <InputGroup size='sm'>
                                    <InputLeftAddon children={
                                        <Center w='60px'>
                                            <PrimarySubtitle>
                                                签收城市
                                            </PrimarySubtitle>
                                            <Price> *</Price>
                                        </Center>} />
                                    <SignOffAddress />
                                </InputGroup>
                                <InputGroup size='sm'>
                                    <InputLeftAddon children={
                                        <Center w='60px'>
                                            <PrimarySubtitle>
                                                详细地址
                                            </PrimarySubtitle>
                                            <Price> *</Price>
                                        </Center>} />
                                    <Input placeholder='街道/镇+村/小区/写字楼+门牌号' />
                                </InputGroup>
                            </>
                        ) : <></>}
                        <Button width='100%' height='40px' colorScheme='twitter' variant='solid' isLoading={isSubmitting} type='submit' size='sm' >
                            0元申请 包邮到家
                        </Button>
                    </Stack>

                </form>
            </Stack>
        </ChakraProvider >
    )
}