import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { sendMessage, enumStateLoadingMsg } from '../store/messages';
import { enumConnectionState } from '../store/app';
import { UserContext } from './index';

const MsgForm = (props) => {
  const dispatch = useDispatch();
  const stateMessageLoading = useSelector(({ msg: { loading } }) => loading);
  const { connectionState } = useSelector(({ app }) => app);
  const isDisconnect = connectionState === enumConnectionState('disconnect');
  const isMessageOnRequest = stateMessageLoading === enumStateLoadingMsg('request');
  const { activeChannelId } = useSelector(({ channels }) => channels)
  const user = useContext(UserContext);

  return(
    <div className="ChatWorkspace-Footer">
      <Formik
        initialValues={{ message: '' }}
        validate={values => {
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
              <Button
                type="submit"
                disabled={isMessageOnRequest || errors.message || isDisconnect}
              >
                Send
              </Button>
            </div>
            <div
              style={{ display: 'block', height: '1rem' }}
              className="invalid-feedback"
            >
              {errors.message}
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
};

export default MsgForm;
