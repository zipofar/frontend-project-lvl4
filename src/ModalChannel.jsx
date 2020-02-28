import React from 'react';
import { useTranslation } from 'react-i18next';
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

const getModalType = (modalName, { t }) => {
  switch (modalName) {
    case enumModalName('removeChannel'):
      return {
        title: t('modal.removeChannel'),
        handleSave: (data, actions, dispatch) => {
          dispatch(removeChannel(data, actions));
        },
        textSubmitBtn: t('modal.Remove'),
        type: 'remove',
      };
    case enumModalName('createChannel'):
      return {
        title: t('modal.createChannel'),
        handleSave: (data, actions, dispatch) => {
          dispatch(createChannel(data, actions));
        },
        textSubmitBtn: t('modal.save'),
        type: 'create',
      };
    case enumModalName('editChannel'):
      return {
        title: t('modal.editChannel'),
        handleSave: (data, actions, dispatch) => {
          dispatch(editChannel(data, actions));
        },
        textSubmitBtn: t('modal.save'),
        type: 'edit',
      };
    default:
      throw new Error(`Modal name ${modalName} does not exists`);
  }
};

const validate = (t) => (values) => {
  const errors = {};
  if (!values.channelName.trim()) {
    errors.channelName = t('modal.requiredChannelName');
  }
  if (values.channelName.length > 15) {
    errors.channelName = t('modal.lengthChannelName', { maxLength: 15 });
  }
  return errors;
};

const renderInputGroup = ({
  handleChange,
  handleBlur,
  values,
  errors,
  channels,
}, { t }) => (
  <>
    <Form.Group>
      <Form.Control
        placeholder={t('modal.enterChannelName')}
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state);
  const isProcessRequest = channels.loading === enumStateLoadingChannel('request');
  const {
    title,
    handleSave,
    textSubmitBtn,
    type,
  } = getModalType(modalName, { t });
  const currentChannel = modalData.channelsList
    .filter(({ id }) => id === modalData.channelId);
  const channelName = currentChannel.length > 0 ? currentChannel[0].name : '';

  return (
    <Formik
      initialValues={{ channelName }}
      validate={type === 'remove' ? null : validate(t)}
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
                ? <span>{t('modal.confirmDeleteionChannel')}</span>
                : renderInputGroup({
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  channels,
                }, { t })
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              {t('modal.close')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isProcessRequest || Object.keys(errors).length > 0}
            >
              {textSubmitBtn}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};
