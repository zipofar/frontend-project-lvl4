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
    <React.Fragment>
      <div className="ChannelPanel-ChannelsHeader">
        <span className="ChannelPanel-Title">Channels</span>
        <div className="ChannelPanel-ChannelsActions">
          <button
            className="ChannelName-ActionBtn ChannelName-ActionBtn_type_add"
            onClick={(e) => {e.preventDefault()}}
          />
        </div>
      </div>
      <div className="ChannelPanel-ChannelsNames">
        {channels.list.map(({ id, name }) => (
          <Button
            block
            key={id}
            variant={activeChannelId === id ? 'primary' : 'light'}
            className={cn({
              "ChannelPanel-ChannelName": true,
            })}
            onClick={() => { dispatch(setActiveChannelId(id)) }}
          >
            <span className="ChannelName-Text"># {name}</span>
            <div className="ChannelName-Actions">
              <button
                className="ChannelName-ActionBtn ChannelName-ActionBtn_type_close"
                onClick={(e) => {e.preventDefault()}}
              />
            </div>
            
          </Button>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ChannelsPanel;