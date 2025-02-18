// src/context/PaymentContext.js
import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  // Par défaut, l'utilisateur n'a pas payé.
  const [hasPaid, setHasPaid] = useState(false);

  const updatePaymentStatus = (status) => {
    setHasPaid(status);
  };

  return (
    <PaymentContext.Provider value={{ hasPaid, updatePaymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const usePaymentContext = () => useContext(PaymentContext);

export default PaymentContext;
