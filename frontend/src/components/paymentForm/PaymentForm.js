// src/components/PaymentForm.js
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './PaymentForm.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!stripe || !elements) {
      setMessage("Payment service is not available. Please try again later.");
      return;
    }

    if (!name.trim() || !email.trim()) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:5000/api/payment", {
        amount: 50,
        currency: "eur",
        paymentMethodId: paymentMethod.id,
        name,
        email,
      });

      if (response.data.success) {
        setSuccess(true);
        setMessage("Payment successful! Redirecting to courses...");
        setTimeout(() => {
          navigate("/courses");
        }, 2000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-card">
        <h2>Course Payment</h2>
        <p className="payment-amount">Amount: €50.00</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Card Details</label>
            <div className="card-element-container">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          {message && (
            <div className={`message ${success ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={!stripe || loading}
            className={`submit-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>

        <div className="secure-payment-info">
          <i className="fas fa-lock"></i>
          <span>Secure payment powered by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
