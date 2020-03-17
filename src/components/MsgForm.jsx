import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Form,
  Modal,
  Button,
} from 'react-bootstrap';

import { sendMessage } from '../../store/messages';
import { enumConnectionState } from '../../store/app';
import UserContext from '../../store/userContext';

const MsgForm = () => {
  const dispatch = useDispatch();
  const { app, msg, channels } = useSelector((state) => state);
  const { connectionState } = app;
  const isDisconnect = connectionState === enumConnectionState('disconnect');
  const { activeChannelId } = channels;
  const user = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.message) {
        errors.message = 'Required message text';
      }
      return errors;
    },
    onSubmit: async ({ message }, { resetForm }) => {
      await dispatch(
        sendMessage({ message, ...user }, activeChannelId, { resetForm }),
      );
    },
  });

  const isValidated = !formik.errors.message || !msg.error;

  return (
    <div className="mt-auto">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
            <Form.Control
              type="input"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className="form-control"
              disabled={formik.isSubmitting || isDisconnect}
            />
          <Form.Control.Feedback className="d-block" type="invalid">
            {formik.errors.message || msg.error}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MsgForm;
