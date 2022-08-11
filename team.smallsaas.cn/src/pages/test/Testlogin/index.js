import React, { useState, useEffect } from 'react';
import Login from '@/pages/login'
import {ChakraProvider } from '@chakra-ui/react'




export default function index(props) {
  return (
    <ChakraProvider>
        <Login />
    </ChakraProvider>
  )


}
