// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Select
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import authService from "services/authService";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import completeProfileImg from "../../assets/img/completeProfileImg.webp"
import userService from "services/userService";
import { AUTH_TOKEN } from "config/authConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "store/slices/authSlice";



// Validation schema
const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  phone_number: Yup.number()
    .required('Phone number is required')
    .positive('Phone number must be a positive '),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),


});

const PasswordSchema = Yup.object().shape({
  role: Yup.string().required('Select a role.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function SignUp() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  const [signUpsucces, setSignUpSucces] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(location.search);

  const mode = queryParams.get("mode")
  const profile_id = queryParams.get("id")


  // const queryParams=locatio
  const history = useHistory()
  const handleSignup = async (values) => {
    try {

      console.log("Form Submitted", values);

      if (mode !== "complete_profile") {
        const res = await authService.register(values)
        console.log("the res", res);
        setSignUpSucces(true)

      } else {
        const res = await userService.editProfile(profile_id, values, mode)
        localStorage.setItem(AUTH_TOKEN, res.data.token)
        dispatch(loginSuccess(res.data))
        history.push("/admin/dashboard");
      }
    } catch (error) {
      console.log("error ", error);

    }
  };


  return (
    <Flex direction='column' alignSelf='center' justifySelf='center' overflow='hidden'>
      <Box
        position='absolute'
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left='0'
        right='0'
        bgRepeat='no-repeat'
        overflow='hidden'
        zIndex='-1'
        top='0'
        bgImage={BgSignUp}
        bgSize='cover'
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}></Box>
      <Flex direction='column' textAlign='center' justifyContent='center' align='center' mt='6.5rem' mb='30px'>
        <Text fontSize='4xl' color='white' fontWeight='bold'>
          Welcome!
        </Text>
        <Text fontSize='md' color='white' fontWeight='normal' mt='10px' mb='26px' w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}>
          🚀 Your journey starts here!

          We’re excited to have you onboard. Create your account to unlock all the features and start exploring:
        </Text>
      </Flex>

      <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
        <Flex
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          p='40px'
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
          <Formik
            initialValues={{
              ...!mode && {
                first_name: '',
                last_name: '',
                phone_number: ''
              },
              ...mode && {
                password: '',
                role: ""
              },

            }}
            validationSchema={mode ? PasswordSchema : SignupSchema}
            onSubmit={(values) => handleSignup(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl>
                  {mode !== "complete_profile" && !signUpsucces ? <>
                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>First Name</FormLabel>
                    <Field name="first_name">
                      {({ field }) => (
                        <Input {...field} fontSize='sm' borderRadius='15px' placeholder='First Name' mb='24px' size='lg' />
                      )}
                    </Field>
                    {errors.first_name && touched.first_name ? <Text color="red.500">{errors.first_name}</Text> : null}

                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Last Name</FormLabel>
                    <Field name="last_name">
                      {({ field }) => (
                        <Input {...field} fontSize='sm' borderRadius='15px' placeholder='Last Name' mb='24px' size='lg' />
                      )}
                    </Field>
                    {errors.last_name && touched.last_name ? <Text color="red.500">{errors.last_name}</Text> : null}

                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Email</FormLabel>
                    <Field name="email">
                      {({ field }) => (
                        <Input {...field} fontSize='sm' borderRadius='15px' placeholder="Email" mb='24px' size='lg' />
                      )}
                    </Field>
                    {errors.email && touched.email ? <Text color="red.500">{errors.email}</Text> : null}


                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Phone Number</FormLabel>
                    <Field name="phone_number">
                      {({ field }) => (
                        <Input {...field} fontSize='sm' borderRadius='15px' placeholder='Phone Number' mb='24px' size='lg' />
                      )}
                    </Field>
                    {errors.phone_number && touched.phone_number ? <Text color="red.500">{errors.phone_number}</Text> : null}


                  </> : <>{signUpsucces ? <div style={{ paddingBottom: "10px" }}>
                    <img src={completeProfileImg} alt="complete profile" />
                  </div> : <></>}</>
                  }

                  {mode === "complete_profile" ? <>


                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Role</FormLabel>
                    <Field name="role">
                      {({ field }) => (
                        <Select {...field} fontSize='sm' borderRadius='15px' placeholder='Select role' mb='24px' size='lg'>
                          <option value="admin">Admin - Create and Assign Tasks</option>
                          <option value="agent">Agent - Assign Tasks Only</option>
                          <option value="author">Author - Create Tasks Only</option>
                        </Select>
                      )}
                    </Field>
                    {errors.role && touched.role ? <Text color="red.500">{errors.role}</Text> : null}


                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Password</FormLabel>
                    <Field name="password">
                      {({ field }) => (
                        <Input {...field} type='password' fontSize='sm' borderRadius='15px' placeholder='Password' mb='24px' size='lg' />
                      )}
                    </Field>
                    {errors.password && touched.password ? <Text color="red.500">{errors.password}</Text> : null}


                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Confirm Password</FormLabel>
                    <Field name="confirm_password">
                      {({ field }) => (
                        <Input {...field} type='password' fontSize='sm' borderRadius='15px' placeholder='Password' mb='24px' size='lg' />
                      )}
                    </Field>
                    {errors.confirm_password && touched.confirm_password ? <Text color="red.500">{errors.confirm_password}</Text> : null}
                    {/* 
                  <FormControl display='flex' alignItems='center' mb='24px'>
                    <Switch id='remember-login' colorScheme='teal' me='10px' />
                    <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>Remember me</FormLabel>
                  </FormControl> */}



                  </> : <></>}

                  {!signUpsucces && <Button type='submit' bg='teal.300' fontSize='10px' color='white' fontWeight='bold' w='100%' h='45' mb='24px'
                    _hover={{ bg: "teal.200" }} _active={{ bg: "teal.400" }}>
                    {mode === "complete_profile" ? "UPDATE" : "SIGN UP"}
                  </Button>}

                </FormControl>
              </Form>
            )}
          </Formik>
          {signUpsucces ? <span style={{ color: "green", paddingBottom: "2px" }}>
            * We'll send you an email to complete your profile. Please check your inbox to verify your email address and finish setting up your account.
          </span> : <></>}
          {mode !== "complete_profile" && !signUpsucces ? <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            maxW='100%'
            mt='0px'>
            <Text color={textColor} fontWeight='medium' >
              Already have an account?
              <Link
                color={titleColor}
                as={RouterLink}
                to="/auth/signin"
                ms='5px'
                fontWeight='bold'>
                Sign In
              </Link>
            </Text>
          </Flex> : <></>}

        </Flex>

      </Flex>

    </Flex>
  );
}

export default SignUp;
