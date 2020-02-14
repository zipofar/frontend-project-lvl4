import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import { sendMessage } from '../store/messages';

const MsgForm = (props) => {
  const dispatch = useDispatch();

  return(
    <div>
      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values, opts) => {
          dispatch(sendMessage({ text: values.message }));
          opts.setSubmitting()
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
  )
};

export default MsgForm;
