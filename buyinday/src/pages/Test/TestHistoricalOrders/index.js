import React from 'react';
import HistoricalOrders from '@/components/HistoricalOrders/Sandbox';
import { ChakraProvider } from '@chakra-ui/react'


export default function index(props) {
    return (
        <ChakraProvider>
            <HistoricalOrders />
        </ChakraProvider>
    )
}