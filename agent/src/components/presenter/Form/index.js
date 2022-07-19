import React, { useState } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Stack,
    ButtonGroup,
    Button,
    ChakraProvider

  } from '@chakra-ui/react'
import TextInput from '../TextInput';
  
/**
 * 
 * 
 */


export default function Index(props) {



    function subBtn () {
       const getValue = document.getElementById("last-name").value
       console.log('getValue = ', getValue)
    }


    const Form = ({ firstFieldRef, onCancel }) => {
        return (
            <ChakraProvider>
          <Stack spacing={4}>
            {/* <TextInput
              label='First name'
              id='first-name'
            //   ref={firstFieldRef}
              defaultValue='John'
            /> */}
             <TextInput label='Last name' id='last-name' defaultValue='Smith' />
            <ButtonGroup display='flex' justifyContent='flex-end'>
              <Button variant='outline'
            //    onClick={onCancel}
               >
                Cancel
              </Button>
              <Button colorScheme='teal' onClick={() => subBtn()}>
                Save
              </Button>
            </ButtonGroup>
          </Stack>
          </ChakraProvider>
        )
      }
      
    
}