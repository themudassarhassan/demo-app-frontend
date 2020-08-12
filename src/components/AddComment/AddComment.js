import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { addComment } from "../../services/productsService";
import { toast } from "react-toastify";

export const AddComment = (props) => {
  const { hide, onCommentPost, productId } = props;
  const [comment, setComment] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await addComment(comment, productId);
      if (response.status === 201) {
        toast.dark("Comment posted successfully.");
        onCommentPost(comment);
        setComment("");
      }
    } catch (e) {
      console.log(e.response);
    }
  };
  if (hide) return <></>;

  return (
    <Row>
      <Col md={10}>
        <Form onSubmit={postComment}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your comment</Form.Label>
            <Form.Control
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              as="textarea"
              rows="3"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
