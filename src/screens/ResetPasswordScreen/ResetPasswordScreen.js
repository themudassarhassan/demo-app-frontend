import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export const ResetPasswordScreen = (props) => {
  const [token, setToken] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password)
      return toast.dark("Password and confirm password does not match");
    try {
      const email = localStorage.getItem("resetEmail");
      const response = await resetPassword(email, token, password);
      if (response.status === 200) {
        toast.dark(response.data.message);
        history.replace("/login");
      }
    } catch (e) {
      toast.dark(e.response.data.message);
    }
  };
  return (
    <Row>
      <Col lg={5} md={7} className="mx-auto">
        <Card className="my-5">
          <Card.Body>
            <Card.Title>Forgot Password</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Token</Form.Label>
                <Form.Control
                  name="token"
                  onChange={(e) => setToken(e.target.value)}
                  value={token}
                  type="numeric"
                  placeholder="Enter Token"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter New Password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  placeholder="Enter Confirm Password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
