import React from "react";
import { Form, Row, FormControl, Col } from "react-bootstrap";
export const FilterBar = (props) => {
  const { catagories, onCatagoryChange, onSearchTextChange } = props;

  return (
    <Row>
      <Col md={4}>
        <FormControl
          onChange={(e) => onSearchTextChange(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </Col>
      <Col md={4} className="ml-auto">
        <Form.Group
          className="d-flex align-items-center"
          controlId="exampleForm.SelectCustom"
        >
          <Form.Control
            onChange={(e) => onCatagoryChange(e.target.value)}
            as="select"
            custom
          >
            {catagories.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};
