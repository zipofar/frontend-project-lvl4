import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Form,
  Modal,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannel } from '../../../../store/channels';
import { enumConnectionState } from '../../../../store/app';

export default (props) => {
  const { show, onHide } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { app, channels } = useSelector((state) => state);
  const { connectionState, modalData: { channelId } } = app;
  const currentChannel = channels.list.filter(({ id }) => id === channelId)[0];
  const isDisconnect = connectionState === enumConnectionState('disconnect');
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      const data = { channelId, channelsList: channels.list };
      const actions = { onHideModal: onHide };
      await dispatch(removeChannel(data, actions));
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.titleRemoveChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Confirm delete channel:
            <b>{` ${currentChannel?.name}`}</b>
          </p>
          <div
            style={{ display: 'block', height: '1rem' }}
            className="invalid-feedback"
          >
            {channels.error}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('modal.close')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            disabled={formik.isSubmitting || isDisconnect}
          >
            {t('modal.save')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
