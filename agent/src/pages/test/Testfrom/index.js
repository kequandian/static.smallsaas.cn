import React, { useState, useEffect } from 'react';
import Login from '@/pages/login'
import {ChakraProvider, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,Form,
Input,Field ,Button,Stack} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';



// export default function index() {

export default function FormikExample() {

    // function validateName(value) {
    //   let error
    //   if (!value) {
    //     error = 'Name is required'
    //   } else if (value.toLowerCase() !== 'naruto') {
    //     error = "Jeez! You're not a fan 😱"
    //   }
    //   return error
    // }

    const {
      handleSubmit,
      register,
      reset,
      formState: { errors, isSubmitting },
    } = useForm()

    function validateData(values) {

      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('values =', values)
          resolve()
        }, 100)
      })
    }
  
    return (
      <ChakraProvider>
      <form onSubmit={handleSubmit(validateData)} noValidate>
        <Stack spacing="2">
          <FormControl isInvalid={errors.account}>
          <FormLabel htmlFor='account'>用户名</FormLabel>
          <Input bgColor="gray.50" placeholder="请输入用户名" id='account'
            {...register('account', {
              required: '请输入用户名',
              minLength: { value: 4, message: '最小长度应为4' },
            })}
          />
          <FormErrorMessage>
            {errors.account && errors.account.message}
          </FormErrorMessage>
        </FormControl>
          <Stack direction='row' spacing={4} align='center'>
            <Button width='100px' colorScheme='teal' variant='solid' isLoading={isSubmitting} type='submit' size='sm'>
              保存
            </Button>
            <Button width='100px' colorScheme='teal' variant='outline' onClick={()=>{}} size='sm'>取消</Button>
          </Stack>
        </Stack>
      </form>
      </ChakraProvider>
    )
  }
    // }


    



