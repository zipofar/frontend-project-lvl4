import React from 'react';
import { useSelector } from 'react-redux';

const MsgContainer =  () => {
  const { messages } = useSelector(({ msg }) => msg);
  const { activeChannelId } = useSelector(({ channels }) => channels)
  const messagesByChannel = messages.filter((m) => (m.channelId === activeChannelId))
  return (
    <div className="ChatWorkspace-Messages">
      {messagesByChannel.map((m) => (
        <div key={m.id}>
          <div>{m.username}</div>
          <div>{m.message}</div>
        </div>
      ))}
    </div>
  )
}

export default MsgContainer;