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
  <div className="btn-group" role="group">
    <button
      type="button"
      className="btn btn-secondary dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <button
        type="button"
        className="btn btn-link dropdown-item"
        onClick={handleEdit(dispatch, id)}
      >
        edit
      </button>
      <button
        type="button"
        className="btn btn-link dropdown-item"
        onClick={handleRemove(dispatch, id)}
      >
        del
      </button>
    </div>
  </div>
);

const ChannelsPanel = () => {
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state);
  const { activeChannelId } = channels;
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex mb-2">
        <span>{t('nameChannelsPanel')}</span>
          <button
            className="btn btn-link p-0 ml-auto"
            onClick={handleCreate(dispatch)}
          >
            +
          </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.list.map(({ id, name, removable }) => (
          <li key={id} className="nav-item d-flex">
            <div className="w-100 btn-group" role="group" aria-label="Button group with nested dropdown">
              <button
                type="button"
                className={cn({
                  'nav-link btn btn-block text-left': true,
                  active: activeChannelId === id,
                })}
                onKeyUp={handlePressEnterOnChannelName(id, dispatch)}
                onClick={() => { dispatch(setActiveChannelId(id)); }}
              >
                {name}
              </button>
              {removable && showChannelActions(id, dispatch)}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelsPanel;
