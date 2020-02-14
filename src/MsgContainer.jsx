import React from 'react';
import { useSelector } from 'react-redux';

const MsgContainer =  (props) => {
  const msg = useSelector((state) => state.msg.messages);
  return (
    <div>
      {msg.map((e) => <div key={e.text}>{e.text}</div>)}
    </div>
  )
}

export default MsgContainer;