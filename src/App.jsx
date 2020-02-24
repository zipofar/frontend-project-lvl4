import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import MsgForm from './MsgForm';
import MsgContainer from './MsgContainer';
import ChannelsPanel from './ChannelsPanel';
import WarningPanel from './WarningPanel';
import ModalChannel from './ModalChannel';
import { enumModalState, setModalState } from '../store/app';

const handleCloseModal = (dispatch) => () => {
  dispatch(setModalState(enumModalState('close')));
};

export default () => {
  const { app, channels } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { errors: appErrors, modalState, modalName, modalData } = app;
  const showModal = modalState === enumModalState('open');
  const channelsList = channels.list;
  return (
    <React.Fragment>
      <div className="ClientContainer-Left ChannelsPanel ChannelsPanel_color_primary">
        <ChannelsPanel />
      </div>
      <div className="ClientContainer-Right ChatWorkspace">
        <MsgContainer />
        <MsgForm />
        <WarningPanel errors={appErrors} />
      </div>
      <Modal show={showModal} onHide={handleCloseModal(dispatch)}>
        <ModalChannel
          modalData={{ ...modalData, channelsList }}
          modalName={modalName}
          onHide={handleCloseModal(dispatch)}
        />
      </Modal>
    </React.Fragment>
  )
}