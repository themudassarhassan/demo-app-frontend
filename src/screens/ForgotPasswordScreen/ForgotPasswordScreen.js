import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { verifyEmail } from "../../services/authService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
export const ForgotPasswordScreen = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyEmail(email);
      if (response.status === 200) {
        toast.dark(response.data.message);
        localStorage.setItem("resetEmail", email);
        history.push("/reset-password");
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
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter email"
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
