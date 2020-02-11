import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';

import routes from './routes';

 export default () => (
  <div>
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, { setSubmitting }) => {
        axios.post(routes.channelMessagesPath(1), {
          data:{
            attributes:{
              message: values.message
            },
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="input"
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  </div>
);
