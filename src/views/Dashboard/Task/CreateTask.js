import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Text, Flex, Select } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Card from 'components/Card/Card';
import taskService from 'services/taksService';
import dayjs from 'dayjs';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

// Validation schema using Yup
const validationSchemaStep1 = Yup.object().shape({
  title: Yup.string().required('Task Title is required'),
  description: Yup.string().required('Description is required'),
});

const validationSchemaStep2 = Yup.object().shape({
  priority: Yup.string().required('Priority is required'),
  due_date: Yup.date().required('Due Date is required'),
});

const TaskForm = () => {
  const [step, setStep] = useState(1);
  const history = useHistory()
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    priority: '',
    due_date: '',
  })
  const location = useLocation()

console.log(location);


  useEffect(() => {
    if (location.state) {
      console.log(location.state.taskData);
      setInitialValues(location.state.taskData)
    }

  }, [location])


  const handleNext = (values) => {
    console.log(validationSchemaStep1);

    console.log('Step 1 Values: ', values);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (values) => {

    const formatedDate = dayjs(values.due_date).format('YYYY-MM-DDTHH:mm:ss');
    values.due_date = formatedDate
    let response
    if (location.state) {
      const task_id = location.state.task_id
      response = await taskService.updateTask(task_id,values,null)
    }
    else {
     
      response = await taskService.createTask(values)
    }

    if (response) {
      history.push("/admin/your/tasks")
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
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
                          rows={10} // Increase the row size here
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

                  <FormControl isInvalid={errors.due_date && touched.due_date}>
                    <FormLabel>Due Date</FormLabel>
                    <Field as={Input} name="due_date" placeholder="Enter Due Date" type="date" />
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
      </Card>
    </Flex>
  );
};

export default TaskForm;
