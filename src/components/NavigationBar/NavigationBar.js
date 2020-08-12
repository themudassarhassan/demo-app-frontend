import React, { useContext } from "react";
import UserContext from "../../context/userContext";

import { NavLink } from "react-router-dom";
import { Badge, Nav, Navbar } from "react-bootstrap";

const navigationLink = {
  color: "white",
  marginRight: "30px",
  textDecoration: "none",
};

export const NavigationBar = (props) => {
  const user = useContext(UserContext);
  const { onLogout, cartCount } = props;

  const renderLoggedInView = () => (
    <>
      <NavLink to="/profile" style={navigationLink}>
        {user.name}
      </NavLink>
      <NavLink to="/add-product" style={navigationLink}>
        Add Product
      </NavLink>
      <NavLink to="/my-products" style={navigationLink}>
        My Products
      </NavLink>
      <NavLink onClick={onLogout} to="/" style={navigationLink}>
        Logout
      </NavLink>
    </>
  );

  const renderNotLoggedInView = () => (
    <>
      <NavLink to="/login" style={navigationLink}>
        Login
      </NavLink>
      <NavLink to="/signup" style={navigationLink}>
        Signup
      </NavLink>
    </>
  );

  return (
    <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
      <NavLink to="/">
        <Navbar.Brand>My Olx</Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink to="/cart" style={navigationLink}>
            Cart
            {cartCount !== 0 && (
              <Badge style={{ position: "absolute" }} pill variant="primary">
                {cartCount}
              </Badge>
            )}
          </NavLink>
          {user ? renderLoggedInView() : renderNotLoggedInView()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
