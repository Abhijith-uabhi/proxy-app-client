import React, { useState } from 'react';


import SignUp from 'views/Auth/SignUp';
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
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import authService from "services/authService";
import { useDispatch, useSelector } from 'react-redux';
import userService from "../../services/userService";
import { authenticated } from 'store/slices/authSlice';
import CustomAlert from 'components/Alerts/Alert';

const EditProfileModal = ({ open, onClose, mode }) => {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

    const [showAlert, setShowAlert] = useState(false)

    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    const handleEditProfile = async (values) => {
        try {

            console.log("THE VALUES IS", values);
            if (mode === "edit_profile") {
                const res = await userService.editProfile(user._id, values)
                console.log("res", res);

                if (res.data) {
                    dispatch(authenticated({ user: res.data }))
                    setShowAlert(true)
                    setTimeout(() => {
                        onClose(false)
                    }, 2000);


                }
            }


        } catch (error) {
            console.log("ERROR EDITING THE PROFILE OR PASSWORD", error);

        }
    }

    return (
        <>
            <Modal isOpen={open} onClose={() => { onClose(false) }} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{mode === "edit_profile" ? "EDIT PROFILE" : "CHANGE PASSWORD"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={-70} >{/* need to change */}
                        <Flex direction='column' alignSelf='center' justifySelf='center' overflow='hidden'>

                            <Flex alignItems='center' justifyContent='center' mb='60px' mt='15px'>
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
                                            first_name: user.first_name,
                                            last_name: user?.last_name,
                                            email: user.email,
                                            phone_number: user?.phone_number,
                                            role: user?.role
                                        }}
                                        onSubmit={(values) => handleEditProfile(values)}
                                    >
                                        {({ errors, touched }) => (
                                            <Form>

                                                <FormControl>
                                                    {mode === "edit_profile" ? (<>
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


                                                    </>) : (<>
                                                        <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>Old Password</FormLabel>
                                                        <Field name="old_password">
                                                            {({ field }) => (
                                                                <Input {...field} type='password' fontSize='sm' borderRadius='15px' placeholder='Password' mb='24px' size='lg' />
                                                            )}
                                                        </Field>
                                                        {errors.password && touched.password ? <Text color="red.500">{errors.password}</Text> : null}

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


                                                    </>)}




                                                    <Button type='submit' bg='teal.300' fontSize='15px' color='white' fontWeight='bold' w='100%' h='45' mb='24px'
                                                        _hover={{ bg: "teal.200" }} _active={{ bg: "teal.400" }}>
                                                       Save
                                                    </Button>
                                                </FormControl>
                                            </Form>
                                        )}
                                    </Formik>

                                </Flex>

                            </Flex>

                        </Flex>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => { onClose(false) }}>
                            Close
                        </Button>
                        <Button colorScheme="blue" onClick={() => handleConfirm()}>Yes</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
            {
                showAlert && (
                    <CustomAlert status={"success"} description={"Successfully edited your profile"} />
                )
            }
        </>
    )
}



export default EditProfileModal;