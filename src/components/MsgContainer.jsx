import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MsgContainer = () => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const { messages } = useSelector(({ msg }) => msg);
  const { activeChannelId } = useSelector(({ channels }) => channels);
  const messagesByChannel = messages.filter((m) => (m.channelId === activeChannelId));

  useEffect(scrollToBottom);
  return (
    <div className="overflow-auto mb-3">
      {messagesByChannel.map((m) => (
        <div key={m.id}>
          <div>
            <b>
              {`${m.username}: `}
            </b>
            {m.message}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MsgContainer;
