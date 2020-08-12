import React, { useContext, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import UserContext from "../../context/userContext";
import { changePassword, updateProfile } from "../../services/userService";
import { ProfileImage } from "../../components";
import { toast } from "react-toastify";
import Joi from "@hapi/joi";

export const ProfileScreen = (props) => {
  const user = useContext(UserContext);
  const [passObj, setPassObj] = useState({ newPassword: "", oldPassword: "" });
  const [image, setImage] = useState(user.img_url || null);
  const [imageChange, setImageChange] = useState(false);
  const [name, setName] = useState(user.name || "");

  const [errors, setErrors] = useState({});

  const updateUserProfile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);

    if (imageChange) data.append("image", image);
    try {
      const response = await updateProfile(data);
      if (response.status === 200) {
        toast.dark("Profile updated successfully.");

        props.onProfileChange(response.data);
      }
    } catch (e) {
      toast.dark(e.response);
      console.log(e.response);
    }
  };

  const schema = Joi.object({
    oldPassword: Joi.string().required().min(4),
    newPassword: Joi.string().required().min(4),
  });

  const validate = () => {
    const { error } = schema.validate(passObj, { abortEarly: false });
    if (!error) return null;
    const err = {};
    for (let item of error.details) err[item.path] = item.message;
    return err;
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (errors) return;

    try {
      const response = await changePassword(
        passObj.oldPassword,
        passObj.newPassword
      );
      console.log(response);
      if (response.status === 200) {
        setPassObj({ oldPassword: "", newPassword: "" });
        toast.dark("Password Changed Successfully.");
      }
    } catch (e) {
      toast.dark(e.response.data.errors);
    }
  };

  const passwordFieldChangeHandler = ({ currentTarget: input }) => {
    const pass = { ...passObj };
    pass[input.name] = input.value;
    setPassObj(pass);
  };

  return (
    <div>
      <Row>
        <ProfileImage
          imgSrc={image}
          onImageChange={(image) => {
            setImage(image);
            setImageChange(true);
          }}
        />
        <Col md={6}>
          <div className="mt-4">
            <h4 className="text-uppercase">Update Profile</h4>
            <Form onSubmit={updateUserProfile} className="mt-5">
              <Form.Group className="mb-4" controlId="name">
                <Form.Control
                  value={name}
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="email">
                <Form.Control
                  type="email"
                  disabled={true}
                  placeholder="Email"
                  value={user.email}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
            <hr></hr>
          </div>

          <div className="mt-4">
            <h4 className="text-uppercase">Change Password</h4>
            <Form className="mt-5" onSubmit={passwordChangeHandler}>
              <Form.Group className="mb-4" controlId="oldPassword">
                <Form.Control
                  type="password"
                  name="oldPassword"
                  value={passObj.oldPassword}
                  placeholder="Enter Old Password"
                  onChange={passwordFieldChangeHandler}
                />
                <Form.Text className="text-danger">
                  {errors && errors["oldPassword"]}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-4" controlId="newPassword">
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passObj.newPassword}
                  placeholder="Enter new Password"
                  onChange={passwordFieldChangeHandler}
                />
                <Form.Text className="text-danger">
                  {errors && errors["newPassword"]}
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
