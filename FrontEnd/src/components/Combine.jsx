import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { PhoneIcon } from "@chakra-ui/icons";
import squarelogo from '../Data/SquareLogo.gif';
import { cashfree } from "../cashfree/utils";

const Combine = () => {
  const toast = useToast();
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionId, setSessionId] = useState("")
  let uri = "http://localhost:3001/api/v1/payment"

  const handleClick = () => {
    if (fname !== "" && email !== "" && phone !== "") {

      if (email !== "") {
        const domain = email.split("@");
        if (domain.length !== 2) {
          return toast({
            title: "Pls Enter Valid Email id.",
            description: `Please Fill Required Details`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      }

      if (phone !== "") {
        if (phone.length !== 10) {
          return toast({
            title: "Pls Enter Valid Phone No.",
            description: `Phone Number Should be of Length 10`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      }
      const name = `${fname}`;
      const userData = {
        name,
        email,
        phone,
      };

      axios
        .post(uri, userData)
        .then((res) => {
          setSessionId(res.data.message);
          toast({
            title: "Data submitted successfully",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
          setFname("");
          setEmail("");
          setPhone("");
          console.log(userData);
        })
        .catch((err) => {
          toast({
            title: "Error in Registration.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.log(userData);
          console.log(err);
        });
    } else {
      toast({
        title: "All Fields Required",
        description: `Please Fill Required Details`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };



  useEffect(() => {
    if (sessionId !== "") {
      handlePayment()
    }
  }, [sessionId])

  const handlePayment = () => {
    let checkoutOptions = {
      paymentSessionId: sessionId,
      returnUrl: `http://localhost:3001/api/v1/status/{order_id}`,
    }
    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message)
      }
      if (result.redirect) {
        console.log(result);
        console.log("Redirection")
      }
    });

  }

  return (
    <>
      <Box bgGradient="linear(to-r, #131543, #525368, #131543)" pb={20}>
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 1, lg: 2 }}
          padding={"8%"}
          gap={16}
        >
          <Stack
            color={"whitesmoke"}
            margin={"auto"}
            width={"80%"}
            gap={2}
            textAlign={{ base: 'center', sm: 'center', md: 'center', lg: 'start' }}
          >
            <Box>
              <Image width={'100%'} margin={'auto'} src={squarelogo} />
            </Box>
            <Center>
              <Text fontSize={{ base: 24, sm: 36, md: 40, lg: 48 }} fontWeight={600} width={"100%"}>
                Master Stock Trading with{" "}
                <span style={{ color: "#EBB913" }}>StockTutor</span>
              </Text>
            </Center>
            <Text fontSize={{ base: 16, sm: 16, md: 18, lg: 20 }}>
              Discover the ins and outs of stock trading in the most simplest and
              user-friendly way. Elevate your investment knowledge with
              StockTutor's easy-to-follow guidance.
            </Text>
          </Stack>

          <Stack
            margin={"auto"}
            gap={{ base: 4, sm: 8, md: 8, lg: 10 }}
            width={"65%"}
          >
            <Box width={"80%"} margin={{ base: 'auto', sm: 'auto', md: 'auto', lg: 'unset' }}>
              <Text
                color={"whitesmoke"}
                fontStyle={"italic"}
                // fontFamily={"cursive"}
                fontSize={{ base: 16, sm: 20, md: 24, lg: 24 }}
                textAlign={{ base: 'center', sm: 'center', md: 'center', lg: 'start' }}
              >
                Register now to secure your Financial future !!
              </Text>
            </Box>

            <FormControl id="fname" isRequired>
              <FormLabel color={"whitesmoke"}>Name</FormLabel>
              <Input
                size={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                bg={"white"}
                placeholder="Full name"
                value={fname}
                type="text"
                onChange={(e) => setFname(e.target.value)}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel color={"whitesmoke"}>Email</FormLabel>
              <Input
                size={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                bg={"white"}
                placeholder="Email address"
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="phone" isRequired>
              <FormLabel color={"whitesmoke"}>Contact</FormLabel>
              <InputGroup size={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}>
                <InputLeftElement pointerEvents="none">
                  <PhoneIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  bg={"white"}
                  type="number"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <Box mt={5}>
              <Button
                size={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                width={"100%"}
                bgColor={"#EBB913"}
                onClick={handleClick}
                color={"rgb(5,8,69)"}
              >
                Book Your Seat Now
              </Button>
            </Box>
          </Stack>
        </SimpleGrid>


        {/*****************************Our Tutor Section*********************************/}

        {/* <Box bgGradient="linear(to-r, #131543, #525368, #131543)" pb={20}>
        <Box pl={20} py={5}>
          <Heading fontFamily={'roboto'} color={"whitesmoke"} fontSize={36} fontWeight={500}>Our Tutors</Heading>
        </Box>

        <Box>
          <SimpleGrid
          
            width={{base:'90%', sm:'70%', md:'100%', lg:'100%'}}
            margin={'auto'}
            color={"whitesmoke"}
            columns={{ base: 1, sm: 1, md: 1, lg: 3 }}
            gap={{ base: 16, sm: 16, md: 0, lg: 0 }}
          >
            <Stack width={"65%"} margin={"auto"}>
              <Box>
                <Image src={sachin} />
              </Box>
              <Stack>
                <Box>
                  <Text fontWeight={600} fontSize={26}>
                    Sachin Birla
                  </Text>
                  <Text fontSize={13}>MBA Finance, NISM</Text>
                </Box>
                <Text fontWeight={500} fontSize={19}>
                  Basics of Stock Market & Derivatives
                </Text>
                <Text fontSize={17}>
                  20+ years of experience and made thousands of people financially
                  stable.
                </Text>
              </Stack>
            </Stack>

            <Stack width={"65%"} margin={"auto"}>
              <Box>
                <Image src={ayushi} />
              </Box>
              <Stack>
                <Box>
                  <Text fontWeight={600} fontSize={26}>
                    Ayushi Verma
                  </Text>
                  <Text fontSize={13}>MBA Finance, NISM</Text>
                </Box>
                <Text fontWeight={500} fontSize={19}>
                Technical Analysis
                </Text>
                <Text fontSize={17}>
                17+ years of experience and made thousands of students technically strong.
                </Text>
              </Stack>
            </Stack>

            <Stack width={"65%"} margin={"auto"}>
              <Box>
                <Image src={udit} />
              </Box>
              <Stack>
                <Box>
                  <Text fontWeight={600} fontSize={26}>
                    Udit Dua
                  </Text>
                  <Text fontSize={13}>CA, Corporate Law Advisor</Text>
                </Box>
                <Text fontWeight={500} fontSize={19}>
                Fundamental Analysis
                </Text>
                <Text fontSize={17}>
                15+ years of experience and explains P&L in the simplest way possible.
                </Text>
              </Stack>
            </Stack>

          </SimpleGrid>
        </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default Combine;
