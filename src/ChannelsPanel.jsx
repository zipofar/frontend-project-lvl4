import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { setActiveChannelId } from '../store/channels';

const ChannelsPanel = () => {
  const channels = useSelector(({ channels }) => channels);
  const { activeChannelId } = channels;
  const dispatch = useDispatch();
  return(
    <div className="ChannelPanel-ChannelsNames">
      {channels.list.map(({ id, name }) => (
        <Button
          block
          key={id}
          variant={activeChannelId === id ? 'primary' : 'light'}
          className={cn({
            "ChannelPanel-ChannelName": true,
            "ChannelPanel-ChannelName_active": activeChannelId === id,
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