import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Form,
  Modal,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editChannel } from '../../../store/channels';
import { enumConnectionState } from '../../../store/app';

export default (props) => {
  const { show, onHide } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const { app, channels } = useSelector((state) => state);
  const { connectionState, modalData: { channelId } } = app;
  const currentChannel = channels.list.filter(({ id }) => id === channelId)[0];
  const isDisconnect = connectionState === enumConnectionState('disconnect');
  const formik = useFormik({
    initialValues: { channelName: currentChannel.name },
    validate: (values) => {
      const errors = {};
      if (!values.channelName.trim()) {
        errors.channelName = t('modal.requiredChannelName');
      }
      if (values.channelName.length > 15) {
        errors.channelName = t('modal.lengthChannelName', { maxLength: 15 });
      }
      return errors;
    },
    onSubmit: async (values) => {
      const data = { name: values.channelName, channelId };
      const actions = { onHideModal: onHide };
      await dispatch(editChannel(data, actions));
    },
  });

  useEffect(() => {
    inputEl.current.focus();
  }, [null]);

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.titleEditChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              ref={inputEl}
              placeholder={t('modal.enterChannelName')}
              name="channelName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
              disabled={formik.isSubmitting || isDisconnect}
            />
          </Form.Group>
          <div
            style={{ display: 'block', height: '1rem' }}
            className="invalid-feedback"
          >
            {formik.errors.channelName || channels.error}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('modal.close')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting || isDisconnect || Object.keys(formik.errors).length > 0}
          >
            {t('modal.save')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
