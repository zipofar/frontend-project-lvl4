import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createChannel, removeChannel } from '../store/channels';

const getModalType = (modalName, modalData, dispatch) => {
  switch(modalName) {
    case 'removeChannel':
      return {
        title: 'Remove Channel',
        handleSubmit: (_, actions) => {
          dispatch(removeChannel(modalData, actions));
        },
        textSubmitBtn: 'Remove',
        type: 'remove',
      }
    case 'createChannel':
      return {
        title: 'Create Channel',
        handleSubmit: (data, actions) => {
          dispatch(createChannel(data, actions));
        },
        textSubmitBtn: 'Save',
        type: 'create',
      }
    case 'editChannel':
      return {
        title: 'Edit Channel',
        handleSubmit: (data, actions) => {
          dispatch(createChannel(data, actions));
        },
        textSubmitBtn: 'Save',
        type: 'edit',
      }
    default:
      throw new Error(`Modal name ${modalName} does not exists`);
  }
};

const validate = (values) => {
  const errors = {};
  if (!values.channelName) {
    errors.message = 'Required channel name';
  }
  return errors;
};

export default ({ modalName, modalData, onHide }) => {
  const dispatch = useDispatch();
  const {
    title,
    handleSubmit,
    textSubmitBtn,
    type
  } = getModalType(modalName, modalData, dispatch);
  return(
    <Formik
      initialValues={{ channelName: '' }}
      validate={type === 'remove' ? null : validate}
      onSubmit={({ channelName }, opts) => {
        const data = { name: channelName };
        const actions = {
          onHideModal: onHide,
        }
        handleSubmit(data, actions);
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
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {type === 'remove'
              ? <span>Are you shure want delete channel?</span>
              : <React.Fragment>
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
                </React.Fragment>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {textSubmitBtn}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};