import React, { useState, useEffect } from 'react';
import Cart from 'zero-element-boot/lib/components/cart/Cart';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart';
import ItemConfig from './config'
import { Flex, Box, Spacer, ChakraProvider, Text, Center, InputGroup, Input, InputRightElement, CheckIcon } from '@chakra-ui/react'
import Button from 'zero-element-boot/lib/components/presenter/button/Button';
// import ItemCart from '@/components/presenter/ItemCart'
import PageModuleContainer from 'zero-element-boot-plugin-theme/lib/components/Container/PageModuleContainer';
import Search from '@/components/presrnter/Search'
import Stack from 'zero-element-boot/lib/components/layout/Stack';
import ItemTitle from 'zero-element-boot-plugin-theme/lib/components/text/ItemTitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import ProductList from '../PopUpContent/ProductList'
import promiseAjax from 'zero-element-boot/lib/components/utils/request';

export default function Container(props) {

    const { address = '广东', channel, onNumberClick,cbId } = props;

    // const { query } = location
    // const onHandleNumberClick = (NumberClick) => {
    // console.log('NumberClick == ', NumberClick)
    // }

    const defaultPageList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [pageList, setPageList] = useState(defaultPageList)
    const [inputValue, setInputValue] = useState('')
    const [searchNum, setSearchNum] = useState(0)
    const [searchStatua, setSearchStatua] = useState(false)
    const [numberStatus, setNumberStatus] = useState(true)
    const [packageStatus, setPackageStatus] = useState(true)


    // 获取产品信息
    const [ProductListData, setProductListData] = useState([])

    // 回调选择的产品id
    const [selectGoodsId, setSelectGoodsId] = useState('')


    function change() {
        const pLIst = []
        pageList.map(item => {
            pLIst.push(item + 10)
        })
        setPageList(pLIst)
    }


    function cb(list) {
        if (list) {
        }
    }

    function resetPageList() {
        setPageList(defaultPageList)
    }

    function inputChange(e) {
        setInputValue(e.target.value)
    }

    function searchAction() {
        // getProductList()
        setSearchNum(inputValue)
        setSearchStatua(!searchStatua)
    }
    // console.log('inputValue =', inputValue)
    // console.log('searchNum =', searchNum)

    function getProductList() {
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

    function onProductClick(goodsId) {
        setSelectGoodsId(goodsId)
        if (cbId){
            cbId(goodsId)
        }
    }
    // console.log('selectGoodsId ==',u selectGoodsId);

    //收起 套餐
    function Collapse() {
        setPackageStatus(!packageStatus)
    }

    useEffect(_ => {
        getProductList()
    }, [])

    return (
        <ChakraProvider>
            <Cart fill='#465bce' padding='8px 10px 10px 10px' margin='0'>
                <Text color='#ffffff'>归属地：{address}</Text>
            </Cart>
            <>
                <Flex padding='6px 20px'>
                    <Box h='30px' w='86%' >
                        <Text w='100%' fontSize='18px'> 请选择套餐</Text>
                    </Box>
                    <Center w='14%' h='30px' onClick={() => Collapse()} bg=''>
                        {packageStatus ?
                            <svg t="1672024322136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10190" width="22" height="22"><path d="M490.666667 422.4l302.933333 302.933333 59.733333-59.733333-298.666666-307.2L494.933333 298.666667l-59.733333 59.733333L128 665.6 187.733333 725.333333l302.933334-302.933333z" fill="#444444" p-id="10191"></path></svg>
                            :
                            <svg t="1672025243014" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19849" width="22" height="22"><path d="M490.666667 601.6L797.866667 298.666667l59.733333 59.733333-302.933333 302.933333-59.733334 64-59.733333-59.733333L128 358.4 187.733333 298.666667l302.933334 302.933333z" fill="#444444" p-id="19850"></path></svg>
                        }
                    </Center>
                </Flex>
                {packageStatus ?
                    <ProductList items={ProductListData} onProductClick={(goodsId) => onProductClick(goodsId)} selectGoodsId={selectGoodsId} />
                    : <></>
                }
            </>
            {
                numberStatus ?
                    <div>

                        <PageModuleContainer>
                            <>
                                <Box h='40px'>
                                    <Text w='100%' fontSize='18px'> 请选择你的心仪号码</Text>
                                </Box>
                                <Box h='40px'>
                                    <InputGroup size='md' w='100%'>
                                        <Input type='tel' placeholder='请输入你的幸运数字' defaultValue={inputValue} onChange={inputChange} />
                                        <InputRightElement children={<Search color='green.500' />} onClick={() => searchAction()} />
                                    </InputGroup>
                                </Box>
                                <ItemConfig onSearch={searchStatua} cb={cb} onNumberClick={onNumberClick} searchNum={searchNum} pageList={pageList} resetPageList={resetPageList} selectGoodsId={selectGoodsId} />
                            </>
                        </PageModuleContainer>

                        <Center onClick={() => change()} h='44px' >
                            <CssCart width='100%' padding='0 20px'>
                                <Button color='#1da1f2' solid onAtion >换一批
                                    <Center margin='0 0 0 4px' >
                                        <svg t="1659145430699" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12765" width="22" height="22"><path d="M230.684444 230.684444a398.222222 398.222222 0 0 1 589.937778 28.444445L682.666667 398.222222h341.333333V56.888889l-122.595556 122.595555A512 512 0 0 0 13.084444 398.222222h116.906667a391.68 391.68 0 0 1 100.693333-167.537778zM793.315556 793.315556a398.222222 398.222222 0 0 1-589.937778-28.444445L341.333333 625.777778H0v341.333333l122.595556-122.595555A512 512 0 0 0 1010.915556 625.777778h-117.475556a395.093333 395.093333 0 0 1-100.124444 167.537778z" fill='#ffffff' p-id="12766"></path></svg>
                                    </Center>
                                </Button>
                            </CssCart>
                        </Center>
                    </div>
                    : <></>
            }
        </ChakraProvider>
    )
}