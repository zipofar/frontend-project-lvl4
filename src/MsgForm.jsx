import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { sendMessage } from '../store/messages';
import { enumConnectionState } from '../store/app';
import UserContext from '../store/userContext';

const MsgForm = () => {
  const dispatch = useDispatch();
  const { app, msg, channels } = useSelector((state) => state);
  const stateMessageLoading = msg.loading;
  const { connectionState } = app;
  const isDisconnect = connectionState === enumConnectionState('disconnect');
  const { activeChannelId } = channels;
  const user = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate: values => {
      const errors = {};
      if (!values.message) {
        errors.message = 'Required message text';
      }
      return errors;
    },
    onSubmit: async ({ message }, { resetForm }) => {
      await dispatch(
        sendMessage({ message, ...user }, activeChannelId, { resetForm })
      );
    },
  });

  return (
    <div className="mt-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="Form-Group">
          <input
            type="input"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className="form-control"
            disabled={formik.isSubmitting || isDisconnect}
          />
        </div>
        <div
          style={{ display: 'block', height: '1rem' }}
          className="invalid-feedback"
        >
          {formik.errors.message || msg.error}
        </div>
      </form>
    </div>
  );
};

export default MsgForm;
