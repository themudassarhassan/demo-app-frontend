import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { signup } from "../../services/userService";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export const SignupScreen = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(4),
    passwordConfirm: Joi.string().required().min(4),
  });

  const validate = () => {
    const { error } = schema.validate(user, { abortEarly: false });
    if (!error) {
      if (user.password !== user.passwordConfirm)
        return toast.dark("Password and confirm password does not match.");
      else return null;
    }

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
    if (errors) return;

    try {
      const response = await signup(user);
      if (response.status === 200) {
        history.replace("/login");
        toast.dark("User registered successfully.");
      }
    } catch (error) {
      console.log(error.response);
      toast.dark(error.response.data.message);
    }
  };
  return (
    <Row>
      <Col lg={5} md={7} className="mx-auto">
        <Card className="my-5">
          <Card.Body>
            <Card.Title>Register</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  onChange={handleFieldChange}
                  name="name"
                  value={user.name}
                  type="text"
                  placeholder="Enter Name"
                />
                <Form.Text className="text-danger">
                  {errors && errors["name"]}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleFieldChange}
                  name="email"
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
                  onChange={handleFieldChange}
                  name="password"
                  value={user.password}
                  type="password"
                  placeholder="Password"
                />
                <Form.Text className="text-danger">
                  {errors && errors["password"]}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  onChange={handleFieldChange}
                  name="passwordConfirm"
                  value={user.passwordConfirm}
                  type="password"
                  placeholder="Confirm Password"
                />
                <Form.Text className="text-danger">
                  {errors && errors["passwordConfirm"]}
                </Form.Text>
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
