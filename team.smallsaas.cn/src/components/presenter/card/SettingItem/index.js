import React from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Center, Stack } from '@chakra-ui/react'
import useQuery from 'zero-element-boot/lib/components/hooks/useQuery'
import { history } from 'umi';
import ItemTitleBold from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitleBold';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import Switch from '@/pages/my/Switch'

// import Switch from '@/components/presenter/Switch'


/**
 * 
 * @param {value} value 标题
 * @param {title} title 外部链接
 * @param {navigation} navigation 外部链接
 * @param {toggle} toggle 切换开关
 * @param {percentage} percentage 百分数的值
 * @param {currency} currency 金钱单位的值
 * @param {number} number 数字
 * @param {options} options 
 * @param {space} space 间距（传一个空数组时生效）
 * @param {status} status toggle的状态
 * 
 */

export default function index(props) {

    const { value = '', title = '', navigation, toggle, percentage = '', currency = '', number = '', options, space = '2px', status = '' } = props


    const queryData = useQuery(props.navigation)

    const path = () => {
        history.push(queryData)
    }

    const onnextClick = navigation ? path : null
    return (
        <>
            {(title) ? (
                <CssCart backgroundColor='#ffffff' height='32px' width='100%'  >
                    <Container>
                        <Flexbox align='start-with-last-end' direction='row'>
                            <Center h='32px' w='' bg='' >
                                <ItemTitle>
                                    {title}
                                </ItemTitle>
                            </Center>

                            <Center h='32px' w='' bg='' >
                                {(percentage) ? (
                                    <Flex>
                                        <ItemTitleBold>
                                            <>       {percentage}%</>
                                        </ItemTitleBold>
                                        <Center h='' w='' bg='' margin='0 0 0 4px'>
                                            <img src='http://static.smallsaas.cn/house/2022/svg/Router/enter.svg' width='14px' height='16px' onClick={onnextClick} />

                                        </Center>
                                    </Flex>
                                ) :
                                    (currency) ? (
                                        <Flex>
                                            <ItemTitleBold>
                                                <>       ￥{currency}</>
                                            </ItemTitleBold>
                                            <Center h='' w='' bg='' margin='0 0 0 4px'>
                                                <img src='http://static.smallsaas.cn/house/2022/svg/Router/enter.svg' width='14px' height='16px' onClick={onnextClick} />

                                            </Center>
                                        </Flex>

                                    ) :
                                        (toggle) ? (
                                            <Center h='32px' margin='0 0 0 10px'>
                                                <Switch status={status} />
                                            </Center>

                                        ) :

                                            <>
                                                <Flex>

                                                    <ItemTitleBold>
                                                        {number}
                                                    </ItemTitleBold>
                                                    <Center h='' w='' bg='' margin='0 0 0 10px'>
                                                        <img src='http://static.smallsaas.cn/house/2022/svg/Router/enter.svg' width='14px' height='16px' onClick={onnextClick} />
                                                    </Center>
                                                </Flex></>
                                }

                            </Center>
                        </Flexbox>

                    </Container>
                </CssCart>

            ) :

                <CssCart backgroundColor='#ffffff' margin='0px' height={space} width='100%' >
                    <>
                    </>
                </CssCart>
            }
        </>
    )


}


