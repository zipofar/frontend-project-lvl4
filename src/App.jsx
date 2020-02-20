import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import MsgForm from './MsgForm';
import MsgContainer from './MsgContainer';
import ChannelsPanel from './ChannelsPanel';
import WarningPanel from './WarningPanel';
import ModalChannel from './ModalChannel';
import { enumModalState, setModalState } from '../store/app';

export default () => {
  const dispatch = useDispatch();
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
      <Modal show={showModal} onHide={() => { dispatch(setModalState(enumModalState('close'))) }}>
        <ModalChannel />
      </Modal>
    </React.Fragment>
  )
}