import React from 'react';
import { Row, Col } from 'react-bootstrap';

import MsgForm from './MsgForm';
import MsgContainer from './MsgContainer';
import ChannelsPanel from './ChannelsPanel';

export default () => {
  return (
    <React.Fragment>
      <div className="ClientContainer-Left ChannelsPanel ChannelsPanel_color_primary">
        <ChannelsPanel />
      </div>
      <div className="ClientContainer-Right ChatWorkspace">
        <MsgContainer />
        <MsgForm />
      </div>
    </React.Fragment>
  )
}