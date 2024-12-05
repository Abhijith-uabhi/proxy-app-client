import React from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import signInImage from "assets/img/signInImage.png";
import authService from "services/authService";
import { AUTH_TOKEN } from "config/authConfig";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";

// Validation schema
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function SignIn() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const dispatch=useDispatch()

  const history=useHistory()

  const handleSignin = async (values) => {
    try {
      console.log("Form Submitted", values);
      const res=await authService.signIn(values)
      localStorage.setItem(AUTH_TOKEN,res.data.token)
      dispatch(loginSuccess(res.data))
     
      history.push("/admin");

      
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text mb='36px' ms='4px' color={textColor} fontWeight='bold' fontSize='14px'>
              Enter your email and password to sign in
            </Text>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignInSchema}
              onSubmit={handleSignin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormControl>
                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                      Email
                    </FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      type="text"
                      placeholder='Your email address'
                      borderRadius='15px'
                      mb='24px'
                      fontSize='sm'
                      size='lg'
                    />
                    <ErrorMessage name="email">
                      {msg => <Text color="red.500">{msg}</Text>}
                    </ErrorMessage>

                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                      Password
                    </FormLabel>
                    <Field
                      as={Input}
                      name="password"
                      type="password"
                      placeholder='Your password'
                      borderRadius='15px'
                      mb='36px'
                      fontSize='sm'
                      size='lg'
                    />
                    <ErrorMessage name="password">
                      {msg => <Text color="red.500">{msg}</Text>}
                    </ErrorMessage>

                    {/* <FormControl display='flex' alignItems='center'>
                      <Switch id='remember-login' colorScheme='teal' me='10px' />
                      <FormLabel htmlFor='remember-login' mb='0' ms='1' fontWeight='normal'>
                        Remember me
                      </FormLabel>
                    </FormControl> */}

                    <Button
                      fontSize='10px'
                      type='submit'
                      bg='teal.300'
                      w='100%'
                      h='45'
                      mb='20px'
                      color='white'
                      mt='20px'
                      _hover={{ bg: "teal.200" }}
                      _active={{ bg: "teal.400" }}
                      isLoading={isSubmitting} // Show loading state while submitting
                    >
                      SIGN IN
                    </Button>
                  </FormControl>
                </Form>
              )}
            </Formik>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'
            >
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link as={RouterLink} to="/auth/signup" color={titleColor} ms='5px' fontWeight='bold'>
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'
        >
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
