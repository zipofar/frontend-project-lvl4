import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { setActiveChannelId } from '../store/channels';
import { setModal, enumModalState } from '../store/app';

/* eslint jsx-a11y/control-has-associated-label: 0 */
/* eslint jsx-a11y/anchor-is-valid: 0 */

const handleCreate = (dispatch) => () => {
  dispatch(setModal({
    modalState: enumModalState('open'),
    name: 'createChannel',
    data: {},
  }));
};

const handleEdit = (dispatch, id) => (e) => {
  e.stopPropagation();
  dispatch(setModal({
    modalState: enumModalState('open'),
    name: 'editChannel',
    data: { channelId: id },
  }));
};

const handleRemove = (dispatch, id) => (e) => {
  e.stopPropagation();
  dispatch(setModal({
    modalState: enumModalState('open'),
    name: 'removeChannel',
    data: { channelId: id },
  }));
};

const handlePressEnterOnChannelName = (id, dispatch) => ({ keyCode }) => {
  if (keyCode === 13) {
    dispatch(setActiveChannelId(id));
  }
};

const showChannelActions = (id, dispatch) => (
  <div className="ChannelName-Actions">
    <button
      type="button"
      className="ChannelName-ActionBtn ChannelName-ActionBtn_type_edit"
      onClick={handleEdit(dispatch, id)}
    />
    <button
      type="button"
      className="ChannelName-ActionBtn ChannelName-ActionBtn_type_remove"
      onClick={handleRemove(dispatch, id)}
    />
  </div>
);

const ChannelsPanel = () => {
  const { t, i18n } = useTranslation();
  const { channels } = useSelector((state) => state);
  const { activeChannelId } = channels;
  const dispatch = useDispatch();
  return (
    <>
      <div className="ChannelPanel-ChannelsHeader">
        <span className="ChannelPanel-Title">{t('nameChannelsPanel')}</span>
        <div className="ChannelPanel-ChannelsActions">
          <button
            type="button"
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
              'ChannelPanel-ChannelName': true,
            })}
          >
            <a
              role="button"
              tabIndex={0}
              className={cn({
                ChannelName: true,
                ChannelName_active: activeChannelId === id,
              })}
              onKeyUp={handlePressEnterOnChannelName(id, dispatch)}
              onClick={() => { dispatch(setActiveChannelId(id)); }}
            >
              <span className="ChannelName-Text">
                {`# ${name}`}
              </span>
              {removable && showChannelActions(id, dispatch)}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChannelsPanel;
