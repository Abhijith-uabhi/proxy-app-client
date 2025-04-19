import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Text, Flex, Select, Grid, GridItem } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Card from 'components/Card/Card';
import taskService from 'services/taksService';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CustomAlert from 'components/Alerts/Alert';
import { getAllCountries } from 'utils/locationapis';
import { getStatesByCountryCode } from 'utils/locationapis';
import { getCitiesByCountryAndStateCode } from 'utils/locationapis';
import taskManageImage from "../../../../assets/img/manageTask.jpg"
import { LOCATION_COORDINATES } from 'config/authConfig';
import { getCoordinates } from 'utils/locationapis';

// Validation schema using Yup
const validationSchemaStep1 = Yup.object().shape({
  title: Yup.string().required('Task Title is required'),
  description: Yup.string().required('Description is required'),
});

const validationSchemaStep2 = Yup.object().shape({
  priority: Yup.string().required('Priority is required'),
  due_date: Yup.date().required('Due Date is required'),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required")

});

const places = [
  { id: 1, location: "New York" },
  { id: 2, location: "Paris" },
  { id: 3, location: "Agra" },
];

const TaskForm = () => {
  const [step, setStep] = useState(1);
  const history = useHistory()
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    priority: '',
    due_date: '',
    state: '',
    country: '',
    city: '',
    address: ''
  })
  const location = useLocation()
  const [alert, setAlert] = useState({ show: false, status: '', description: '' });
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([])

  useEffect(() => {
    if (location.state) {
      const dataforEdit = location.state.taskData
      console.log("THE DATA FROM THE LOCATION IS", location.state.taskData);
      setInitialValues(dataforEdit)
      fethlocationsForEdit(dataforEdit)
    }

  }, [location, countries,])

  useEffect(() => {
    fetchCountries()
  }, [])
  console.log("the initial values i s", initialValues);

  const fethlocationsForEdit = async (taskData) => {
    const stateData = await handleCountryChange(taskData.country)
    await handleStateChange(taskData.state, stateData)

  }

  const handleNext = (values) => {
    console.log(validationSchemaStep1);

    console.log('Step 1 Values: ', values);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const getLocationCoordinates = async () => {
    try {

    } catch (error) {

    }
  }

  const handleSubmit = async (values) => {
    try {
      const formatedDate = dayjs(values.due_date).format('YYYY-MM-DDTHH:mm:ss');
      values.due_date = formatedDate

      const taskLocation = `${values.address},${values.city},${values.state},${values.country}`

      const locationCoords = await getCoordinates(taskLocation)

      values.location = locationCoords

      if (location.state) {
        const task_id = location.state.task_id
        const response = await taskService.updateTask(task_id, values, null)
        if (response) {
          setAlert({ show: true, status: 'success', description: 'Task updated successfully' });

        }
      } else {
        const response = await taskService.createTask(values)
        if (response) {
          setAlert({ show: true, status: 'success', description: 'Task created successfully' });

        }
      }

      setTimeout(() => {
        setAlert({ show: false });
        history.push('/admin/your/tasks');
      }, 1000);


    } catch (error) {
      setAlert({ show: true, status: 'error', description: error.message || "Failed to create task" });

    }

  };
  const fetchCountries = async () => {
    const countries = await getAllCountries()
    setCountries(countries)
  }

  const handleCountryChange = async (countryName) => {
    try {
      const country = countries.find((country) => country.name === countryName)
      console.log("the country name and data", country, countryName);

      const statesData = await getStatesByCountryCode(country.isoCode);
      setStates(statesData);
      return statesData
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };

  const handleStateChange = async (stateName, states) => {
    try {
      const state = states.find((state) => state.name === stateName)
      console.log("the state name and state", stateName, state);

      const countryCode = state.countryCode
      const stateCode = state.isoCode
      const cities = await getCitiesByCountryAndStateCode(countryCode, stateCode)
      setCities(cities)
    } catch (error) {
      console.log("failed to fetch the cities", error);

    }
  }
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card >
        {alert.show && <CustomAlert status={alert.status} description={alert.description} />}
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
          gap={6}
        >
          {/* First Column (always visible) */}
          <GridItem w="100%" h="100%"  >
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2}
              onSubmit={step === 1 ? handleNext : handleSubmit}
            >
              {({ values, errors, touched }) => (
                <Form>
                  {step === 1 && (
                    <Stack spacing="5">
                      <FormControl isInvalid={errors.title && touched.title}>
                        <FormLabel>Title</FormLabel>
                        <Field as={Input} name="title" placeholder="Enter Task Title" />
                        <Text color="red.500">
                          <ErrorMessage name="title" />
                        </Text>
                      </FormControl>

                      <FormControl isInvalid={errors.description && touched.description}>
                        <FormLabel>Description</FormLabel>
                        <Field name="description">
                          {({ field }) => (
                            <Textarea
                              {...field}
                              id="description"
                              placeholder="Enter description"
                              rows={16} // Increase the row size here
                            />
                          )}
                        </Field>
                        <Text color="red.500">
                          <ErrorMessage name="description" />
                        </Text>
                      </FormControl>

                      <Flex justify="end">
                        <Button colorScheme="teal" type="submit" mt={5}>
                          Next                    </Button>
                      </Flex>
                    </Stack>
                  )}

                  {step === 2 && (
                    <Stack spacing="4">
                      <FormControl isInvalid={errors.priority && touched.priority}>
                        <FormLabel>Priority</FormLabel>
                        <Field name="priority">
                          {({ field }) => (
                            <Select {...field} placeholder="Select Priority">
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </Select>
                          )}
                        </Field>
                        <Text color="red.500">
                          <ErrorMessage name="priority" />
                        </Text>
                      </FormControl>

                      <FormControl isInvalid={errors.country && touched.country}>
                        <FormLabel>Country</FormLabel>
                        <Field name="country">
                          {({ field }) => (
                            <Select {...field} placeholder="Select Country" onChange={(e) => {
                              field.onChange(e); // Update Formik's state
                              handleCountryChange(e.target.value); // Fetch states
                            }}>
                              {countries.map((country) => (
                                <option value={country.name}>{country.name}</option>
                              ))}

                            </Select>
                          )}
                        </Field>
                        <Text color="red.500">
                          <ErrorMessage name="country" />
                        </Text>
                      </FormControl>
                      <FormControl isInvalid={errors.state && touched.state}>
                        <FormLabel>State</FormLabel>
                        <Field name="state">
                          {({ field }) => (
                            <Select {...field} placeholder="Select State" onChange={(e) => {
                              field.onChange(e); // Update Formik's state
                              handleStateChange(e.target.value, states); // Fetch states
                            }}>
                              {states.map((state) => (
                                <option value={state.name}>{state.name}</option>
                              ))}

                            </Select>
                          )}
                        </Field>
                        <Text color="red.500">
                          <ErrorMessage name="state" />
                        </Text>
                      </FormControl>
                      <FormControl isInvalid={errors.city && touched.city}>
                        <FormLabel>City</FormLabel>
                        <Field name="city">
                          {({ field }) => (
                            <Select {...field} placeholder="Select city">
                              {cities.map((city) => (
                                <option value={city.name}>{city.name}</option>
                              ))}

                            </Select>
                          )}
                        </Field>
                        <Text color="red.500">
                          <ErrorMessage name="city" />
                        </Text>
                      </FormControl>

                      <FormControl isInvalid={errors.address && touched.address}>
                        <FormLabel>Address</FormLabel>
                        <Field as={Input} name="address" placeholder="Enter your address" />
                        <Text color="red.500">
                          <ErrorMessage name="address" />
                        </Text>
                      </FormControl>

                      <FormControl isInvalid={errors.due_date && touched.due_date} className='calendar-field'>
                        <FormLabel>Due Date</FormLabel>
                        <Field
                          as={Input}
                          name="due_date"
                          placeholder="Enter Due Date"
                          type="date" min={new Date().toISOString().split("T")[0]} />
                        <Text color="red.500">
                          <ErrorMessage name="due_date" />
                        </Text>
                      </FormControl>

                      <Flex justify="end">
                        <Button colorScheme="teal" onClick={handleBack} mt={5} mr={3}>
                          Back
                        </Button>
                        <Button colorScheme="teal" type="submit" mt={5}>
                          Submit
                        </Button>
                      </Flex>
                    </Stack>
                  )}
                </Form>
              )}
            </Formik>
          </GridItem>

          {/* Second Column (visible only on large screens or above) */}
          <GridItem
            w="100%"
            h="100%"
            display={["none", "none", "block"]}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="100%"
              h="100%"
            >
              <img
                src={taskManageImage}
                alt="Task Management"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px"
                }}
              />
            </Box>
          </GridItem>




        </Grid>



      </Card>
    </Flex >
  );
};

export default TaskForm;
