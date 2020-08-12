import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./ProductItem.css";

export const ProductItem = (props) => {
  const { name, price, id, catagory, img } = props;
  return (
    <Col md={6} lg={4}>
      <Card className="mt-5 my-card">
        <Card.Img
          src={img ? img : "https://via.placeholder.com/150"}
          style={{ height: "150px" }}
        />
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title>{name}</Card.Title>
            <Card.Title className="text-secondary">{catagory}</Card.Title>
          </div>

          <Card.Text>{price}</Card.Text>
          <NavLink to={`/products/${id}`}>
            <Button variant="success">View Details</Button>
          </NavLink>
        </Card.Body>
      </Card>
    </Col>
  );
};
