import React from 'react';
import {
  Form,
  Modal,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  createChannel,
  editChannel,
  removeChannel,
  enumStateLoadingChannel,
} from '../store/channels';
import { enumModalName } from '../store/app';

const getModalType = (modalName) => {
  switch (modalName) {
    case enumModalName('removeChannel'):
      return {
        title: 'Remove Channel',
        handleSave: (data, actions, dispatch) => {
          dispatch(removeChannel(data, actions));
        },
        textSubmitBtn: 'Remove',
        type: 'remove',
      };
    case enumModalName('createChannel'):
      return {
        title: 'Create Channel',
        handleSave: (data, actions, dispatch) => {
          dispatch(createChannel(data, actions));
        },
        textSubmitBtn: 'Save',
        type: 'create',
      };
    case enumModalName('editChannel'):
      return {
        title: 'Edit Channel',
        handleSave: (data, actions, dispatch) => {
          dispatch(editChannel(data, actions));
        },
        textSubmitBtn: 'Save',
        type: 'edit',
      };
    default:
      throw new Error(`Modal name ${modalName} does not exists`);
  }
};

const validate = (values) => {
  const errors = {};
  if (!values.channelName) {
    errors.channelName = 'Required channel name';
  }
  return errors;
};

const renderInputGroup = ({
  handleChange,
  handleBlur,
  values,
  errors,
  channels,
}) => (
  <>
    <Form.Group>
      <Form.Control
        placeholder="Enter channel name"
        name="channelName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.channelName}
      />
    </Form.Group>
    <div
      style={{ display: 'block', height: '1rem' }}
      className="invalid-feedback"
    >
      {errors.channelName || channels.error}
    </div>
  </>
);

export default ({ modalName, modalData, onHide }) => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state);
  const isProcessRequest = channels.loading === enumStateLoadingChannel('request');
  const {
    title,
    handleSave,
    textSubmitBtn,
    type,
  } = getModalType(modalName);
  const currentChannel = modalData.channelsList
    .filter(({ id }) => id === modalData.channelId);
  const channelName = currentChannel.length > 0 ? currentChannel[0].name : '';

  return (
    <Formik
      initialValues={{ channelName }}
      validate={type === 'remove' ? null : validate}
      onSubmit={(values) => {
        const data = { name: values.channelName, ...modalData };
        const actions = {
          onHideModal: onHide,
        };
        handleSave(data, actions, dispatch);
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
            {
              type === 'remove'
                ? <span>Are you shure want delete channel?</span>
                : renderInputGroup({
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  channels,
                })
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button type="submit" variant="primary" disabled={isProcessRequest}>
              {textSubmitBtn}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};
