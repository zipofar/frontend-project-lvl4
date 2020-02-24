import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { setActiveChannelId, removeChannel } from '../store/channels';
import { setModal, setModalState, enumModalState } from '../store/app';

const handleCreate = (dispatch) => () => {
  dispatch(setModal({
    modalState: enumModalState('open'),
    name: 'createChannel',
    data: {},
  }));
};

const handleRemove = (dispatch, id) => () => {
  dispatch(setModal({
    modalState: enumModalState('open'),
    name: 'removeChannel',
    data: { channelId: id },
  }));
};

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
            onClick={handleCreate(dispatch)}
          />
        </div>
      </div>
      <div className="ChannelPanel-ChannelsNames">
        {channels.list.map(({ id, name, removable }) => (
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
              { removable
                ? <div className="ChannelName-Actions">
                  <button
                    className="ChannelName-ActionBtn ChannelName-ActionBtn_type_close"
                    onClick={handleRemove(dispatch, id)}
                  />
                </div>
                : null
              }
            </a>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ChannelsPanel;