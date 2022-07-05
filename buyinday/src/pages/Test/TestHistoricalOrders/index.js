import React from 'react';
import HistoricalOrders from '@/components/page/HistoricalOrders/Sandbox';
import { ChakraProvider } from '@chakra-ui/react'


export default function index(props) {
    return (
        <ChakraProvider>
            <HistoricalOrders />
        </ChakraProvider>
    )
}