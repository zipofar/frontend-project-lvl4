import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MsgForm from './MsgForm';
import MsgContainer from './MsgContainer';
import ChannelsPanel from './ChannelsPanel';
import WarningPanel from './WarningPanel';
import { enumModalState, setModal } from '../store/app';
import getModalForChannel from './modals/channels';

const handleCloseModal = (dispatch) => () => {
  dispatch(setModal({
    modalState: enumModalState('close'),
    name: null,
    data: {},
  }));
};

const renderModal = (modalName, show, onHide) => {
  if (!modalName) {
    return null;
  }
  const ComponentModal = getModalForChannel(modalName);
  return <ComponentModal show={show} onHide={onHide} />;
};

export default () => {
  const { app } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    errors: appErrors,
    modalState,
    modalName,
  } = app;
  const showModal = modalState === enumModalState('open');
  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <ChannelsPanel />
      </div>
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <MsgContainer />
          <MsgForm />
        </div>
        <WarningPanel errors={appErrors} />
      </div>
      {renderModal(modalName, showModal, handleCloseModal(dispatch))}
    </div>
  );
};
