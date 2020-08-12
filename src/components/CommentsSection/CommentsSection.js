import React, { useContext } from "react";
import { CommentTile } from "../CommentTile";
import { Row, Form, Col, Button } from "react-bootstrap";
import UserContext from "../../context/userContext";
export const CommentsSection = (props) => {
  const user = useContext(UserContext);
  const { comments, onChange, onSubmit, prodUser } = props;

  // if (comments) comments.sort((a, b) => a.date.getTime() - b.date.getTime());
  const showAddCommentField = () => {
    if (user && prodUser && user.id === props.prodUser.id) return;
    if (user) {
      return (
        <Col md={10}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your comment</Form.Label>
            <Form.Control
              onChange={(e) => onChange(e)}
              as="textarea"
              rows="3"
            />
          </Form.Group>
          <Button variant="primary" onClick={onSubmit}>
            Send
          </Button>
        </Col>
      );
    }
    return <p>Please login to comment.</p>;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    month = month >= 10 ? month : `0${month}`;
    day = day >= 10 ? day : `0${day}`;
    return `${d.getFullYear()}-${month}-${day}`;
  };
  return (
    <div>
      <Row className="mt-4 mb-4">
        <div style={{ fontSize: "30px" }}>Comments</div>
      </Row>
      <Row>{showAddCommentField()}</Row>
      <div>
        {comments &&
          comments.map((comment, index) => (
            <CommentTile
              key={index}
              name={comment.user.name}
              comment={comment.comment}
              time={formatDate(comment.date)}
            />
          ))}
      </div>
    </div>
  );
};
