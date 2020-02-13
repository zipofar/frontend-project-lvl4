import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import MsgForm from './MsgForm';
import MsgContainer from './MsgContainer';

const Channel = ({ name }) => (
  <Button block className="ChannelPanel-ChannelName"># {name}</Button>
)

export default (props) => {
  return (
      <Row style={{ minHeight: '100vh' }}>
        <Col xs="2" className="ChannelsPanel ChannelsPanel_color_primary">
          <Button className="ChannelPanel-ChannelName">Channels</Button>
          {props.channels.map(({ id, name }) => (
            <Channel key={id} name={name} />
          ))}
        </Col>
        <Col xs="10">
          <MsgContainer />
          <MsgForm />
        </Col>
      </Row>
  )
}