import React from "react";
import { Carousel, Col } from "react-bootstrap";
export const ImageViewer = (props) => {
  const { img } = props;
  return (
    <Col md={6}>
      <Carousel>
        <Carousel.Item>
          <img
            height="400px"
            className="d-block w-100"
            src={img ? img : "https://via.placeholder.com/150?text=first"}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </Col>
  );
};
