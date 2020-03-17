import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

import { setActiveChannelId } from '../../store/channels';
import { setModal, enumModalState, enumModalName } from '../../store/app';

/* eslint jsx-a11y/control-has-associated-label: 0 */
/* eslint jsx-a11y/anchor-is-valid: 0 */

const handleCreate = (dispatch) => () => {
  dispatch(setModal({
    modalState: enumModalState('open'),
    name: enumModalName('createChannel'),
    data: {},
  }));
};

const handleEdit = (dispatch, id) => () => {
  dispatch(setModal({
    modalState: enumModalState('open'),
    name: 'editChannel',
    data: { channelId: id },
  }));
};

const handleRemove = (dispatch, id) => () => {
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
  <DropdownButton as={ButtonGroup} title="">
    <Dropdown.Item
      eventKey="1"
      onClick={handleEdit(dispatch, id)}
    >
      Edit
    </Dropdown.Item>
    <Dropdown.Item
      eventKey="2"
      onClick={handleRemove(dispatch, id)}
    >
      Delete
    </Dropdown.Item>
  </DropdownButton>
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
        <Button
          variant="link"
          className="p-0 ml-auto"
          onClick={handleCreate(dispatch)}
        >
          +
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.list.map(({ id, name, removable }) => (
          <li key={id} className="nav-item d-flex">
            <ButtonGroup className="w-100">
              <Button
                variant={activeChannelId === id ? 'primary' : 'light'}
                className="text-left"
                onKeyUp={handlePressEnterOnChannelName(id, dispatch)}
                onClick={() => { dispatch(setActiveChannelId(id)); }}
              >
                {name}
              </Button>
              {removable && activeChannelId === id ? showChannelActions(id, dispatch) : null}
            </ButtonGroup>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelsPanel;
