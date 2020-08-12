import React from "react";
import { Col, Row } from "react-bootstrap";
export const CommentTile = (props) => {
  const { name, comment, time } = props;
  return (
    <Row className="p-3">
      <Col
        md={8}
        className="d-flex justify-content-between pb-4"
        style={{ borderBottom: "1px dotted #ccc" }}
      >
        <div>
          <div className="font-weight-bold">{name}</div>
          <div>{comment}</div>
        </div>
        <div className="font-weight-light">{time}</div>
      </Col>
    </Row>
  );
};
