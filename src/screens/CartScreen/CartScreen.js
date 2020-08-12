import React from "react";

import { Table, Row, Button, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export const CartScreen = (props) => {
  const { cart, onIncrement, onDecrement } = props;

  const calTotalPrice = () => {
    let total = 0;
    cart.forEach((element) => (total += element.price * element.quantity));
    return total;
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;
  return (
    <div>
      <Row className="mt-3 mb-3">
        <h3 className="text-uppercase">Your Cart</h3>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Quantity</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <Button onClick={() => onDecrement(item)} variant="danger">
                  -
                </Button>
                <Button
                  style={{ marginLeft: 5 }}
                  onClick={() => onIncrement(item)}
                  variant="success"
                >
                  +
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col className="d-flex justify-content-end">
          <h4 className="font-weight-bold mr-5">Total: </h4>
          <h4>{calTotalPrice()}</h4>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <NavLink to="/checkout">
            <Button variant="success">Checkout</Button>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
};
