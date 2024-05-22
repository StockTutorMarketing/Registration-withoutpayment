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
import React, { useState } from "react";
import axios from "axios";
import { PhoneIcon } from "@chakra-ui/icons";
import squarelogo from "../Data/SquareLogo.gif";
import './Combine.css';

const Combine = () => {
  const toast = useToast();
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");




  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  };

  const handleClick = async () => {
    if (!fname || !email || !phone) {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!validatePhone(phone)) {
      toast({
        title: "Invalid phone number. Phone number must be between 10 and 15 digits.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api/v1/register", {
        FullName: fname,
        Email: email,
        Phone: phone,
      });

      if(phone.length !==10){
        toast({
          title: "Enter Correact phone Number",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      if (response.data.message === "User created") {
        toast({
          title: "Registration successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bgGradient="linear(to-r, #131543, #525368, #131543)" pb={20}>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 1, lg: 2 }}
        paddingX={"4%"}
        gap={2}
      >
        <Stack
          color={"whitesmoke"}
          margin={"auto"}
          width={"80%"}
          gap={2}
          textAlign={{ base: "center", sm: "center", md: "center", lg: "start" }}
        >
          <Box>
            <Image width={"100%"} margin={"auto"} src={squarelogo} />
          </Box>
          <Center>
            <Text
              fontSize={{ base: 24, sm: 36, md: 40, lg: 48 }}
              fontWeight={600}
              width={"100%"}
            >
              Master Stock Trading with{" "}
              <span style={{ color: "#EBB913" }}>StockTutor</span>
            </Text>
          </Center>
          <Text fontSize={{ base: 16, sm: 16, md: 18, lg: 20 }}>
            Discover the ins and outs of stock trading in the simplest
            and user-friendly way. Elevate your investment knowledge with
            StockTutor's easy-to-follow guidance.
          </Text>

          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, lg: 2 }}
            gap={{ base: 4, sm: 4, md: 12, lg: 16 }}
            color={'black'}
            fontWeight={600}
            mt={4}
          >
            <Box
              className="gradient_anim_btn_combine"
              borderRadius={10}
              padding={"2px 12px"}
              variant="outline"
            >
              Date
              <br />
              9th June, 2024
            </Box>
            <Box
              className="gradient_anim_btn_combine"
              variant="outline"
              borderRadius={10}
              padding={"2px 12px"}
            >
              Time <br /> 4:00 PM  - 7:00 PM
            </Box>
          </SimpleGrid>
        </Stack>

        <Stack
          pt={20}
          margin={"auto"}
          gap={{ base: 4, sm: 8, md: 8, lg: 12 }}
          width={"65%"}
        >
          <Box
            width={"80%"}
            margin={{ base: "auto", sm: "auto", md: "auto", lg: "unset" }}
          >
            <Text
              color={"whitesmoke"}
              fontStyle={"italic"}
              fontSize={{ base: 16, sm: 20, md: 24, lg: 24 }}
              textAlign={{
                base: "center",
                sm: "center",
                md: "center",
                lg: "start",
              }}
            >
              Register now to secure your financial future!!
            </Text>
          </Box>

          <FormControl id="fname" isRequired>
            <FormLabel color={"whitesmoke"}>Name</FormLabel>
            <Input
              size={{ base: "sm", sm: "md", md: "md", lg: "md" }}
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
              size={{ base: "sm", sm: "md", md: "md", lg: "md" }}
              bg={"white"}
              placeholder="Email address"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="phone" isRequired>
            <FormLabel color={"whitesmoke"}>Contact</FormLabel>
            <InputGroup size={{ base: "sm", sm: "md", md: "md", lg: "md" }}>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.400" />
              </InputLeftElement>
              <Input
                bg={"white"}
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Box mt={5}>
            <Button
              size={{ base: "sm", sm: "md", md: "md", lg: "md" }}
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
    </Box>
  );
};

export default Combine;
