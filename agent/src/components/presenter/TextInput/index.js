import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    TextInput,
    Stack,
    ButtonGroup,
    Button,
    ChakraProvider

  } from '@chakra-ui/react'
  
/**
 * 
 * 
 */


export default function Index(props) {

  // const TextInput = React.forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    )
  }
  // )
// }