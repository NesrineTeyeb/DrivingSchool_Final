import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    onLogout(); // Update authentication state
    navigate("/home-guest"); // Redirect to login page
  };

  return (
    <Button variant="outline-light" onClick={handleLogout} className="ml-2">
      Logout
    </Button>
  );
}

export default Logout;
