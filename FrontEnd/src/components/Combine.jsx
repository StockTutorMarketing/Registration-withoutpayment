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
import './Combine.css';
import { useNavigate } from "react-router-dom";

const Combine = () => {
  const toast = useToast();
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate=useNavigate();



  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10,10}$/;
    return re.test(phone);
  };

  const handleClick = async () => {
    window.dataLayer.push({
      event: 'button_click',
      button_name: 'Request a call back'
    });
    
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
        title: "Invalid phone number. Phone number must be of 10 digits.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/api/v1/register", {
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
        navigate("/thankyou")
        setEmail("");
        setFname("");
        setPhone("");
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
    <Box bgGradient="linear(to-r, #131543, #525368, #131543)"  pb={20}>
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
          style={{paddingTop:"8rem"}}
          textAlign={{ base: "center", sm: "center", md: "center", lg: "start" }}
        >
          <Box style={{display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column", marginBottom:"10%"}} >
            <Image width={"32%"}  src={'https://res.cloudinary.com/dtjsipwvp/image/upload/v1716461286/logotop_dvgbn0.png'} />
          </Box>
          <Center>
            <Text
              fontSize={{ base: 24, sm: 36, md: 40, lg: 48 }}
              fontWeight={600}
              width={"100%"}
            >
              Master Stock Trading with{" "}
              <span style={{ color: "#EBB913" , marginTop:"20%"}}>StockTutor</span>
            </Text>
          </Center>
          <Text style={{marginTop:"5%"}} fontSize={{ base: 16, sm: 16, md: 18, lg: 20 }}>
            Discover the ins and outs of stock trading in the simplest
            and user-friendly way. Elevate your investment knowledge with
            StockTutor's easy-to-follow guidance.
          </Text>

        
        </Stack>

        <Stack
          pt={20}
          margin={"auto"}
          gap={{ base: 2, sm: 8, md: 8, lg: 12 }}
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
              style={{boxShadow:"inherit",cursor:"pointer"}}
            >
               Request a call back
            </Button>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default Combine;
