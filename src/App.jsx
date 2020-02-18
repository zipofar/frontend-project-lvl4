import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MsgForm from './MsgForm';
import MsgContainer from './MsgContainer';
import ChannelsPanel from './ChannelsPanel';
import WarningPanel from './WarningPanel';

export default () => {
  const appErrors = useSelector(({ app }) => app.errors);
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
    </React.Fragment>
  )
}