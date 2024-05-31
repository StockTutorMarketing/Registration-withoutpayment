import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import React, { useState} from "react";
  import AllTutors from "../Data/AllTutorsForm.png";
  import { PhoneIcon } from "@chakra-ui/icons";
  import "./BottomBar.css";
  import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
  

  const BottomBar = () => {
const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
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
      <>
        <Box
          className="gradient_anim_btn"
          // bg={"#171945"}
          position="fixed"
          bottom={0}
          height={{ base: 70, sm: 110, md: "120", lg: "130" }}
          padding={{ base: 2, sm: 5, md: 5, lg: 5 }}
          // margin={"auto"}
        >
          <Box
            width={{ base: "100%", sm: "100%", md: "90%", lg: "84%" }}
            margin={"auto"}
            // border={'2px solid red'}
            mt={{ sm: 0, md: 0, lg: 0 }}
          >
            <Flex>
              <Box
                width={"25%"}
                height={"auto"}
                textAlign={"center"}
                alignItems={"center"}
                justifyContent={"center"}
                display={{ base: "none", sm: "block", md: "block", lg: "block" }}
                // border={'5px solid red'} 
              >
                <Image
                  margin={"auto"}
                  mt={{ sm: 0, md: 0, lg: -4 }}
                  width={{ sm: "100%", md: "100%", lg: "84%" }}
                  src={AllTutors}
                />
              </Box>
              <Box
              // border={'5px solid red'}
                width={{ base: "100%" }}
                // border={'2px solid yellow'}
              >
                <Flex justifyContent={"space-between"}>
                  <Stack
                  //  border={'2px solid green'}
                  >
                    <Stack
                    
                    // border={'5px solid red'}
                      gap={{ base: 0, sm: 1, md: 1, lg: 0 }}
                      width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
                      marginTop={"1"}
                    >
                      <Text
                        color={"rgb(255,200,69)"}
                        // fontSize={{ base: 16, sm: 18, md: 20, lg: 26 }}
                        fontSize={32}
                        // fontWeight={640}
                        fontWeight={640}
                      >
                        <Flex align={"center"} gap={{base:1, sm:2, md:3, lg:3}}>
                        <Flex alignItems={'center'} fontSize={{ base: 16, sm: 18, md: 20, lg: 26 }}><FaIndianRupeeSign /> Don’t miss out ! {" "}</Flex>
                          
                          <Text fontSize={{ base: 12, sm: 14, md: 16, lg: 20 }}>
                            
                          </Text>
                        </Flex>
                      </Text>
                      <Text
                        // width={"70%"}
                        fontSize={{ base: 12, sm: 14, md: 16, lg: 20 }}
                        fontWeight={600}
                        color={"whitesmoke"}
                      >
                        You are one step away from achieving your <br></br>financial freedom
                      </Text>
                    </Stack>
                  </Stack>
  
                  <Box
                    alignItems={"center"}
                    // border={'2px solid pink'}
                  >
                    <Button
                      width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
                      size={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                      borderRadius={20}
                      bg={"rgb(255,200,69)"}
                      color={"black"}
                      fontSize={{ base: 8, sm: 12, md: 16, lg: 24 }}
                      fontWeight={640}
                      // padding={7}
                      mt={"15%"}
                      onClick={onOpen}
                    >
                      Request a call back
                    </Button>
  
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalBody>
                          <Box className="modalformbox">
                            <Box>
                              <Image src={AllTutors} />
                            </Box>
                            <Flex className="formbox-flex">
                              <FormControl id="fname" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                  placeholder="Full name"
                                  value={fname}
                                  type="text"
                                  onChange={(e) => setFname(e.target.value)}
                                />
                              </FormControl>
                            </Flex>
  
                            <FormControl id="email" isRequired>
                              <FormLabel>Email</FormLabel>
                              <Input
                                placeholder="Email address"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </FormControl>
  
                            <FormControl id="phone" isRequired>
                              <FormLabel>Contact</FormLabel>
                              <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                  <PhoneIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                  type="number"
                                  placeholder="Phone number"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </InputGroup>
                            </FormControl>
  
                            <Box margin={"auto"} mt={4}>
                              <Button
                                //   width={"100%"}
                                bgColor={"#EBB913"}
                                onClick={handleClick}
                                color={"rgb(5,8,69)"}
                                _hover={{
                                  color: "#EBB913",
                                  bgColor: "rgb(5,8,69)",
                                  fontsize: 40,
                                }}
                              >
                                 Request a call back
                              </Button>
                            </Box>
                          </Box>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </>
    );
  };
  
  export default BottomBar;