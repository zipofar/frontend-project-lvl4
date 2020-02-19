import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { setActiveChannelId } from '../store/channels';
import { setModalState, enumModalState } from '../store/app';

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
            onClick={() => { dispatch(setModalState(enumModalState('open'))) }}
          />
        </div>
      </div>
      <div className="ChannelPanel-ChannelsNames">
        {channels.list.map(({ id, name }) => (
          <div
            key={id}
            className={cn({
              "ChannelPanel-ChannelName": true,
            })}
            onClick={() => { dispatch(setActiveChannelId(id)) }}
          >
            <a
              className={cn({
                "ChannelName": true,
                "ChannelName_active": activeChannelId === id,
              })}
            >
              <span className="ChannelName-Text"># {name}</span>
              <div className="ChannelName-Actions">
                <button
                  className="ChannelName-ActionBtn ChannelName-ActionBtn_type_close"
                  onClick={(e) => {e.preventDefault()}}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ChannelsPanel;