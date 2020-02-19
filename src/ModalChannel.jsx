import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';

export default () => {
  return(
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};