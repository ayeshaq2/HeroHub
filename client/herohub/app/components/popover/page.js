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
  } from '@chakra-ui/react'

const Popover =({
    heading,
    text,

}) =>{
    return(
        <Popover
      initialFocusRef={initialFocusRef}
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          {heading}
        </PopoverHeader>
        <PopoverArrow bg='blue.800' />
        <PopoverCloseButton />
        <PopoverBody>
         Race:{text.race}
         Publisher: {text.publisher}
         Eyes:{text['Eye Color']}
         Hair:{text['Hair color']}
         Weight:{text.weight}
         Powers:{text.powers}
        </PopoverBody>
        <PopoverFooter
          border='0'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          pb={4}
        >
          <Box fontSize='sm'>id: {text.id}</Box>
          <ButtonGroup size='sm'>
            <Button colorScheme='green'>Add to List</Button>
            <select colorScheme='blue' ref={initialFocusRef}>
              Select List
            </select>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}


    

