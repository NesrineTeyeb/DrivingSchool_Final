import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    // Listen for token changes in localStorage
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Remove userId from localStorage during logout
    setIsAuthenticated(false);
    navigate("/home-guest");
  };

  return (
    <Navbar
      className=" bg-white navbar-dark fixed-top"
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand href="/">
        <img
          src="data:image/jpeg;base64,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abgA7cw0ktB9xJ+ax/g+Kzm8NlnO1OFhu7bvH12G6XK3skk6V7EMl4ZmY+0yQNeX762l8Zd0udJFztzO6jsDytg2HP8Aa6ZrQ6BvFLxLI7Q1zXC5BcRyD9iL+ivEUQiAa0WA5BY/Y47Fuhti0MIsLFouA0j9HvHb1KnnlrWzjO9KZiuVsGxsOq5IRu+zns4jLucRzay1ySRvZfeF5fwfLPDqY4mtLieG93Ee642JaH3LSPOwVwZRRxt0hjbX1Wt1HI+/ZfMlBFIA0sZYEkC3Iu3JHvuU5Za1s4xG49lajzMGmqhbIQO667muAO9tTSDb0UKOynCR+bH+1m/fV0A07BfqTPKdVFxl+Imoy1S1NPHSSQsfDG1rWNdd2kNGltnE6gbbXvdV9vZRhLTf2c+7iy2/xK7IkyynVTcZWrhmHRYVGIoI2Rxjk1osN+Z9SfNbSIqpEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k=" // Replace with your image URL
          alt="Auto Ecole Logo"
          style={{
            width: "100px", // Adjust the width and height as needed
            height: "100px",
            borderRadius: "50%", // This makes the image a circle
          }} // Optional: Adjust the size
        />
        <span> Drive Safe</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            href="/"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <>
              <Nav.Link
                href="/formation"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Formations
              </Nav.Link>
              <Nav.Link href="/courses">Courses</Nav.Link>
              <Nav.Link href="/quiz">Quiz</Nav.Link>
              <Nav.Link href="/reservation">Reservation</Nav.Link>
              <Nav.Link href="/my-reservations">My Reservation</Nav.Link>
              <Nav.Link href="/contact" activeClassName="active-link">
                Contact
              </Nav.Link>
              <Nav.Link variant="outline-light" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/contact" activeClassName="active-link">
                Contact
              </Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
