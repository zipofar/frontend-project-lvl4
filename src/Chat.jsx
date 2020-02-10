import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Channel = ({ name }) => (
  <Button block className="ChannelPanel-ChannelName"># {name}</Button>
)

export default (props) => {
  console.log(props)
  return (
      <Row>
        <Col xs="2" className="ChannelsPanel ChannelsPanel_color_primary">
          <Button className="ChannelPanel-ChannelName">Channels</Button>
          {props.channels.map(({ id, name }) => (
            <Channel key={id} name={name} />
          ))}
        </Col>
        <Col xs="10">
          Messages
        </Col>
      </Row>
  )
}