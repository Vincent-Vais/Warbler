import React from "react";
import { Row, Col } from "react-bootstrap";
import UsersPanel from "../containers/UsersPanel";
import MessagesPanel from "../containers/MessagesPanel";

class DirectMessages extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <UsersPanel />
        </Col>
        <Col xs={8}>
          <MessagesPanel />
        </Col>
      </Row>
    );
  }
}

export default DirectMessages;
