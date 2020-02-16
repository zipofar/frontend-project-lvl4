import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MsgContainer =  () => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  const { messages } = useSelector(({ msg }) => msg);
  const { activeChannelId } = useSelector(({ channels }) => channels)
  const messagesByChannel = messages.filter((m) => (m.channelId === activeChannelId))

  useEffect(scrollToBottom);
  return (
    <div className="ChatWorkspace-Messages">
      {messagesByChannel.map((m) => (
        <div className="MessageBlock" key={m.id}>
          <div className="MessageBlock-Username">{m.username}</div>
          <div className="MessageBlock-MsgText">{m.message}</div>
        </div>
      ))}
      <div ref={messagesEndRef} className="MessageBlock-UtilEndMessageBlock" />
    </div>
  )
}

export default MsgContainer;