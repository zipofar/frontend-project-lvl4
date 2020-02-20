import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createChannel } from '../store/channels';

export default () => {
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
        dispatch(createChannel({ name: channelName }));
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
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name new channel</Form.Label>
              <Form.Control
                placeholder="Enter channel name"
                name="channelName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <div
              style={{ display: 'block', height: '1rem' }}
              className="invalid-feedback"
            >
              {errors.message}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">
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