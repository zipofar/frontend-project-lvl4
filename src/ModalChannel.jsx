import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createChannel } from '../store/channels';

export default ({ onHide }) => {
  const dispatch = useDispatch();
  return(
    <Formik
      initialValues={{ channelName: '' }}
      validate={values => {
        const errors = {};
        if (!values.channelName) {
          errors.message = 'Required channel name';
        }
        return errors;
      }}
      onSubmit={({ channelName }, opts) => {
        const data = { name: channelName };
        const actions = {
          onHideModal: onHide,
        }
        dispatch(createChannel(data, actions));
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                placeholder="Enter channel name"
                name="channelName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
            </Form.Group>
            <div
              style={{ display: 'block', height: '1rem' }}
              className="invalid-feedback"
            >
              {errors.message}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};