import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../services/orderService";
import "./CheckoutScreen.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Row, Col } from "react-bootstrap";
export function CheckoutScreen(props) {
  const { orderItems, onCheckout } = props;

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function fetch() {
      try {
        const response = await createPaymentIntent(orderItems);

        setClientSecret(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetch();
  }, [orderItems]);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      history.replace("/");
      toast.dark("Payment made successfully.");
      onCheckout();
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Row>
        <Col lg={5} md={7} className="mx-auto mt-5">
          <h2>Checkout Form</h2>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button
            className="cust-button"
            disabled={processing || disabled}
            id="submit"
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay"
              )}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
        </Col>
      </Row>
    </form>
  );
}
