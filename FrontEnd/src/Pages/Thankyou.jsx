import React from 'react'
import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

window.dataLayer.push({
  event: 'pageview',
  page: {
    url: "/thankyou",
    title: "thankyou page click"
  }
});

const Thankyou = () => {
  return (
    <Box textAlign="center" justifyContent={'center'} pt={20} px={6} display={'Flex'} flexDirection={'Column'} alignItems={'center'}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Thankyou for Registration
      </Heading>
      <Text color={'gray.500'}>
        You registration has been successfully done...!!
      </Text>
      <Image width={{base:'200%', sm:'50%', md:'60%', lg:'60%'}} height={""} src={"https://res.cloudinary.com/dtjsipwvp/image/upload/v1716468845/alltutors_hqh7od.png"}/>
    </Box>
  )
}

export default Thankyou
