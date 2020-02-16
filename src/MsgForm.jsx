import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { sendMessage } from '../store/messages';
import { UserContext } from './index';

const MsgForm = (props) => {
  const dispatch = useDispatch();
  const stateMessageLoading = useSelector(({ msg: { loading } }) => loading);
  const { activeChannelId } = useSelector(({ channels }) => channels)
  const user = useContext(UserContext);

  return(
    <div>
      <Formik
        initialValues={{ message: '' }}
        onSubmit={({ message }, opts) => {
          dispatch(sendMessage({ message, ...user }, activeChannelId));
          opts.resetForm();
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
            <Button type="submit" disabled={stateMessageLoading === 'request'}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
};

export default MsgForm;
