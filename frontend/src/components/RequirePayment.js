// src/components/RequirePayment.js
// import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { usePaymentContext } from "../context/PaymentContext";

const RequirePayment = ({ children }) => {
  const { hasPaid } = usePaymentContext();

  return hasPaid ? children : <Navigate to="/payment" />;
};

export default RequirePayment;
