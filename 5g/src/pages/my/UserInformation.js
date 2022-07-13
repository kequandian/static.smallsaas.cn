import React, { useState, useEffect } from 'react';
import CssCart from 'zero-element-boot/lib/components/cart/CssCart'
import { Flex, Box, Spacer, Stack, ChakraProvider, Text } from '@chakra-ui/react'
import Avatar from '@/components/presenter/Avatar'
import Flexbox from 'zero-element-boot/lib/components/layout/Flexbox';
import Container from 'zero-element-boot/lib/components/container/Container'
import PrimarySubtitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimarySubtitle';
import PrimaryTitle from 'zero-element-boot-plugin-theme/lib/components/text/PrimaryTitle';
import Gridbox from 'zero-element-boot/lib/components/layout/Gridbox';
import PageModuleContainer from '@/components/Container/PageModuleContainer';




export default function index(props) {
    const { name = '小雨儿', posts = '梅州总代理',} = props
    return (
        <CssCart width='100%' height='110px' backgruondColor=''>
        <Container>
            <Flexbox justify='start' direction='row' align='start-with-last-end' >
                <Avatar size='60px' />
                <Stack>
                    <PrimaryTitle fontSize='18px'>{name}</PrimaryTitle>
                    <Spacer />
                    <PrimarySubtitle fontSize='14px'color='#4b5c6b'>{posts}</PrimarySubtitle>
                </Stack>
                <svg t="1657530111258" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18832" width="40" height="40"><path d="M544 896l64 0 0 64-64 0 0-64Z" p-id="18833" fill="#4b5c6b"></path><path d="M416 416 416 64 64 64l0 352 64 0 0 64 64 0 0-64L416 416zM128 352 128 128l224 0 0 224L128 352z" p-id="18834" fill="#4b5c6b"></path><path d="M192 192l96 0 0 96-96 0 0-96Z" p-id="18835" fill="#4b5c6b"></path><path d="M608 64l0 352 352 0L960 64 608 64zM896 352l-224 0L672 128l224 0L896 352z" p-id="18836" fill="#4b5c6b"></path><path d="M736 192l96 0 0 96-96 0 0-96Z" p-id="18837" fill="#4b5c6b"></path><path d="M192 736l96 0 0 96-96 0 0-96Z" p-id="18838" fill="#4b5c6b"></path><path d="M64 480l64 0 0 64-64 0 0-64Z" p-id="18839" fill="#4b5c6b"></path><path d="M192 480l64 0 0 64-64 0 0-64Z" p-id="18840" fill="#4b5c6b"></path><path d="M256 608 64 608l0 352 352 0L416 608l-96 0 0-64L256 544 256 608zM352 672l0 224L128 896l0-224L352 672z" p-id="18841" fill="#4b5c6b"></path><path d="M480 96l64 0 0 96-64 0 0-96Z" p-id="18842" fill="#4b5c6b"></path><path d="M480 256l64 0 0 64-64 0 0-64Z" p-id="18843" fill="#4b5c6b"></path><path d="M672 480 608 480 544 480 544 384 480 384 480 480 320 480 320 544 480 544 544 544 608 544 608 608 672 608 672 544Z" p-id="18844" fill="#4b5c6b"></path><path d="M672 608l64 0 0 64-64 0 0-64Z" p-id="18845" fill="#4b5c6b"></path><path d="M480 608l64 0 0 96-64 0 0-96Z" p-id="18846" fill="#4b5c6b"></path><path d="M480 768l64 0 0 128-64 0 0-128Z" p-id="18847" fill="#4b5c6b"></path><path d="M608 704l64 0 0 192-64 0 0-192Z" p-id="18848" fill="#4b5c6b"></path><path d="M800 608l160 0 0 64-160 0 0-64Z" p-id="18849" fill="#4b5c6b"></path><path d="M896 480l64 0 0 64-64 0 0-64Z" p-id="18850" fill="#4b5c6b"></path><path d="M736 480l128 0 0 64-128 0 0-64Z" p-id="18851" fill="#4b5c6b"></path><path d="M736 704l64 0 0 64-64 0 0-64Z" p-id="18852" fill="#4b5c6b"></path><path d="M896 768 864 768 864 832 928 832 928 768 960 768 960 704 896 704Z" p-id="18853" fill="#4b5c6b"></path><path d="M736 832l64 0 0 64-64 0 0-64Z" p-id="18854" fill="#4b5c6b"></path><path d="M800 896l160 0 0 64-160 0 0-64Z" p-id="18855" fill="#4b5c6b"></path></svg>
            </Flexbox>
        </Container>
        </CssCart>
    )


}
