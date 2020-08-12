import React, { useState } from "react";

import "./App.css";
import { Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import { NavigationBar, Toast } from "./components";
import { Switch, Route } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { SignupScreen } from "./screens/SignupScreen";
import { ProductsScreen } from "./screens/ProductsScreen";
import { ProductDetailsScreen } from "./screens/ProductDetailsScreen";
import { CartScreen } from "./screens/CartScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { PrivateRoute } from "./routes/privateRoute";
import { AddProductScreen } from "./screens/AddProductScreen";
import { CheckoutScreen } from "./screens/CheckoutScreen";
import { ResetPasswordScreen } from "./screens/ResetPasswordScreen";
import { MyProudcutsScreen } from "./screens/MyProductsScreen";

import UserContext from "./context/userContext";
import { toast } from "react-toastify";
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";

function App() {
  // localStorage.setItem("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleUserChange = (currentUser) => {
    setUser(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  };
  const handleAddItemToCart = (item) => {
    if (cart.find((el) => el.id === item.id))
      return toast.dark("item already in the cart.");

    const newCart = [...cart];
    item.quantity = 1;
    newCart.push(item);
    setCart(newCart);
    toast.dark("item added to the cart.");
  };
  const handleItemQuantityIncrement = (item) => {
    const newCart = [...cart];
    const index = cart.indexOf(item);

    newCart[index].quantity++;
    setCart(newCart);
  };

  const handleItemQuantityDecrement = (item) => {
    let newCart;
    if (item.quantity === 1) newCart = cart.filter((el) => el.id !== item.id);
    else {
      newCart = [...cart];
      const index = cart.indexOf(item);
      newCart[index].quantity--;
    }
    setCart(newCart);
  };
  return (
    <div className="app">
      <UserContext.Provider value={user}>
        <NavigationBar onLogout={handleLogout} cartCount={cart.length} />
      </UserContext.Provider>
      <Container>
        <Toast />
        <Switch>
          <Route exact path="/">
            <ProductsScreen />
          </Route>
          <Route path="/login">
            <LoginScreen onLogin={handleUserChange} />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordScreen />
          </Route>
          <Route path="/reset-password">
            <ResetPasswordScreen />
          </Route>
          <Route path="/signup">
            <SignupScreen></SignupScreen>
          </Route>
          <PrivateRoute isLoggedIn={user && true} path="/profile">
            <UserContext.Provider value={user}>
              <ProfileScreen onProfileChange={handleUserChange} />
            </UserContext.Provider>
          </PrivateRoute>
          <PrivateRoute isLoggedIn={user && true} path="/add-product">
            <AddProductScreen />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={user && true} path="/my-products">
            <MyProudcutsScreen />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={user && true} path="/checkout">
            <CheckoutScreen onCheckout={() => setCart([])} orderItems={cart} />
          </PrivateRoute>
          <Route path="/products/:productId">
            <UserContext.Provider value={user}>
              <ProductDetailsScreen
                onAddToCart={handleAddItemToCart}
              ></ProductDetailsScreen>
            </UserContext.Provider>
          </Route>
          <Route path="/cart">
            <CartScreen
              cart={cart}
              onIncrement={handleItemQuantityIncrement}
              onDecrement={handleItemQuantityDecrement}
            />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
