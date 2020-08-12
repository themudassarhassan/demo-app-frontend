import React, { useState } from "react";
import { Col } from "react-bootstrap";
import profilePlaceholder from "../../profile.jpg";
export const ProfileImage = (props) => {
  const { onImageChange, imgSrc } = props;
  const [preview, setPreview] = useState();

  const imageChangeHandler = (e) => {
    if (e.target.files.length !== 0) {
      const image = e.target.files[0];
      onImageChange(image);
      const imageUrl = URL.createObjectURL(image);
      setPreview(imageUrl);
    }
  };
  return (
    <Col md={6}>
      <div className="d-flex flex-column justify-content-center">
        <img
          src={preview || imgSrc || profilePlaceholder}
          height="150"
          width="150"
          style={{ borderRadius: "150px", marginTop: "20px" }}
          name="image"
          alt="profile"
        />

        <input type="file" onChange={imageChangeHandler} />
      </div>
    </Col>
  );
};
