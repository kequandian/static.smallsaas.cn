import React, { useState,useDisclosure } from 'react';
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

    // const PopoverForm = () => {
        const { onOpen, onClose, isOpen } = useDisclosure()
        const firstFieldRef = React.useRef(null)

        console.log("firstFieldRef = ", firstFieldRef)

        return (
            <>
                <Box display='inline-block' mr={3}>
                    John Smith
            </Box>
                <Popover
                    isOpen={isOpen}
                    initialFocusRef={firstFieldRef}
                    onOpen={onOpen}
                    onClose={onClose}
                    placement='right'
                    closeOnBlur={false}
                >
                    <PopoverTrigger>
                        <IconButton size='sm' icon={<EditIcon />} />
                    </PopoverTrigger>
                    <PopoverContent p={5}>
                        <FocusLock returnFocus persistentFocus={false}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
                        </FocusLock>
                    </PopoverContent>
                </Popover>
            </>
        )
    }

    //   render(<PopoverForm />)


// }