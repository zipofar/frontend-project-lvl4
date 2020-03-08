import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { sendMessage, enumStateLoadingMsg } from '../store/messages';
import { enumConnectionState } from '../store/app';
import UserContext from '../store/userContext';

const MsgForm = () => {
  const dispatch = useDispatch();
  const { app, msg, channels } = useSelector((state) => state);
  const stateMessageLoading = msg.loading;
  const { connectionState } = app;
  const isDisconnect = connectionState === enumConnectionState('disconnect');
  const isProcessRequest = stateMessageLoading === enumStateLoadingMsg('request');
  const { activeChannelId } = channels;
  const user = useContext(UserContext);

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ message: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.message) {
            errors.message = 'Required message text';
          }
          return errors;
        }}
        onSubmit={({ message }, opts) => {
          dispatch(sendMessage({ message, ...user }, activeChannelId));
          opts.resetForm();
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="Form-Group">
              <input
                type="input"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                className="form-control"
              />
            </div>
            <div
              style={{ display: 'block', height: '1rem' }}
              className="invalid-feedback"
            >
              {errors.message || msg.error}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default MsgForm;
