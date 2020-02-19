import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import MsgForm from './MsgForm';
import MsgContainer from './MsgContainer';
import ChannelsPanel from './ChannelsPanel';
import WarningPanel from './WarningPanel';
import ModalChannel from './ModalChannel';
import { enumModalState } from '../store/app';

export default () => {
  const { app } = useSelector((state) => state);
  const appErrors = app.errors;
  const showModal = app.modalState === enumModalState('open');
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
      <Modal show={showModal}>
        <ModalChannel />
      </Modal>
    </React.Fragment>
  )
}