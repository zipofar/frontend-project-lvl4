import React from 'react';
import { connect } from 'react-redux';

const MsgContainer =  (props) => {
  console.log('MsgContainer')
  console.log(props)
  return (
    <div>
      {props.msg.map((e) => <div key={e.text}>{e.text}</div>)}
    </div>
  )
}

const mapStateToProps = state => (
  {
    msg: state.msg,
  }
)

export default connect(mapStateToProps)(MsgContainer);