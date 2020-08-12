import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "../../services/authService";
import { useHistory, NavLink } from "react-router-dom";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";

export const LoginScreen = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validate = () => {
    const { error } = schema.validate(user, { abortEarly: false });
    if (!error) return null;
    const err = {};
    for (let item of error.details) err[item.path] = item.message;
    return err;
  };
  const handleFieldChange = ({ currentTarget: input }) => {
    const data = { ...user };
    data[input.name] = input.value;
    setUser(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (errors) {
      return;
    }
    try {
      const response = await login(user.email, user.password);

      console.log(response);
      if (response.status === 200) {
        const { data } = response;

        props.onLogin(data);
        toast.dark("Logged in successfully.");
        history.replace("/");
      }
    } catch (e) {
      toast.dark(e.response.data.error);
    }
  };

  return (
    <Row>
      <Col lg={5} md={7} className="mx-auto">
        <Card className="my-5">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleFieldChange}
                  value={user.email}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-danger">
                  {errors && errors["email"]}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={handleFieldChange}
                  value={user.password}
                  type="password"
                  placeholder="Password"
                />
                <Form.Text className="text-danger">
                  {errors && errors["password"]}
                </Form.Text>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
