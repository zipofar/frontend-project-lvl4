import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { setActiveChannelId } from '../store/channels';

const ChannelsPanel = () => {
  const channels = useSelector(({ channels }) => channels);
  const dispatch = useDispatch();
  return(
    <div>
      {channels.list.map(({ id, name }) => (
        <Button
          block
          key={id}
          className={cn({
            "ChannelPanel-ChannelName": true,
            "ChannelPanel-ChannelName_active": channels.activeChannelId === id,
          })}
          onClick={() => { dispatch(setActiveChannelId(id)) }}
        >
          # {name}
        </Button>
      ))}
    </div>
  );
}

export default ChannelsPanel;