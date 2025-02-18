import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./HomeGuest.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      {/* Bannière */}
      <div className="banner mt-10">
        <h1 clasName="banner-title">Welcome to our Driving School</h1>
        <p>Learn to drive safely with our qualified instructors.</p>
        <a href="/login" className="btn btn-lg">
          Login
        </a>
      </div>
      <section id="formations" className="row mt-5">
        <h2>Discover our foramtions</h2>
        <p>
          Our driving school supports you in learning to drive with an effective
          method adapted to each individual.
        </p>
        <div className="formations">
          <Card
            className="formation-items"
            style={{ width: "20rem", height: "28rem" }}
          >
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvz_GkGYmKYn_ZrpqGMMyWLXpIZdGaVCXcabsM2cxiIoUYyoocuwFQK54xr9lwLSyA9nc&usqp=CAU"
            />
            <Card.Body>
              <Card.Title>
                License B (Mechanical or automatic) 
              </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" classname="bouttons-formation" onClick={() => navigate("/signup")}>
                More Informations
              </Button>
            </Card.Body>
          </Card>
          <Card
            className="formation-items"
            style={{ width: "20rem", height: "28rem" }}
          >
            <Card.Img
              variant="top"
              src="https://www.adrianflux.co.uk/learner-drivers/wp-content/uploads/2024/01/supervising-a-learner-driver-1.png"
            />
            <Card.Body>
              <Card.Title>Accompanied and supervised driving</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/signup")}>
                More Informations
              </Button>
            </Card.Body>
          </Card>
          <Card
            className="formation-items"
            style={{ width: "20rem", height: "28rem" }}
          >
            <Card.Img
              variant="top"
              src="https://cerdesrichardets.fr/wp-content/uploads/2024/09/formation-accel.jpg"
            />
            <Card.Body>
              <Card.Title>Accelerated training</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate("/signup")}>
                More Informations
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* <a href="/formations" className="btn btn-lg">
          Nos formations
        </a> */}
      </section>
      <section id="contact" className="contact mt-4">
        <h1>
          Take advantage of this opportunity to start your driving license
          training in September!
        </h1>
        <p>ACCELERATED FORMULA IN 15 DAYS (free code formula)</p>
        <Button variant="primary" onClick={() => navigate("/contact")}>
          Contact Us
        </Button>
      </section>

      <section id="why-us" className="row mt-5">
        <h2>Why Us?</h2>
        <div className="reasons">
          <Card className="reasons-items">
            <Card.Img
              variant="top"
              src="https://www.driving-school-paris.com/ressources/images/d3f3d42f0b1a.jpg"
            />
            <Card.Body>
              <Card.Title>Pedagogy</Card.Title>
            </Card.Body>
          </Card>
          <Card className="reason-items">
            <Card.Img
              variant="top"
              src="https://www.driving-school-paris.com/ressources/images/2df67fe4b7b9.jpg"
            />
            <Card.Body>
              <Card.Title>Availability</Card.Title>
            </Card.Body>
          </Card>
          <Card className="reason-items">
            <Card.Img
              variant="top"
              src="https://www.driving-school-paris.com/ressources/images/b086444f6f39.jpg"
            />
            <Card.Body>
              <Card.Title>Personalized follow-up</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Présentation */}
      {/* <section id="about-us" className="row mt-5">
        <h2>About Us</h2>
        <p>
          Notre auto-école vous accompagne dans l’apprentissage de la conduite
          avec une méthode efficace et adaptée à chacun.
        </p>
        <a href="/contact" className="btn btn-primary">
          Nous Contacter
        </a>
      </section> */}

      {/* Image à droite */}
      {/* <div className="row mt-5">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <img
            src="https://via.placeholder.com/500"
            alt="Auto-école"
            className="img-fluid rounded"
          />
        </div>
      </div> */}
      <section id="avis" className="row mt-5">
        <h2>Student Reviews</h2>
        <div className="avis">
          <Card
            className="avis-items"
            style={{ width: "22rem", height: "10rem" }}
          >
            <Card.Body>
              <Card.Title>Great Experience</Card.Title>
              <Card.Text>
                "Amazing driving school! The instructor is very patient and
                professional. Highly recommend!"
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            className="avis-items"
            style={{ width: "22rem", height: "10rem" }}
          >
            <Card.Body>
              <Card.Title>Excellent Training</Card.Title>
              <Card.Text>"Great support and high-quality lessons."</Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="avis-items"
            style={{ width: "22rem", height: "10rem" }}
          >
            <Card.Body>
              <Card.Title>Personalized Guidance</Card.Title>
              <Card.Text>
                "I passed my driving test on the first attempt thanks to them!"
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-light text-center py-4 mt-5" >
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className=" text-dark col-md-4 mb-3">
              <h5>Contact Us</h5>
              <p>📍 123 Rue des Écoles, Ville</p>
              <p>📞 06 12 34 56 78</p>
              <p>✉ contact@drivesafe.com</p>
            </div>

            {/* Opening Hours */}
            <div className=" text-dark col-md-4 mb-3">
              <h5>Opening Hours</h5>
              <p>🕘 Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>🚗 Saturday: 10:00 AM - 2:00 PM</p>
              <p>❌ Closed on Sundays</p>
            </div>

            {/* Social Media */}
            <div className=" text-dark col-md-4">
              <h5>Follow Us</h5>
              <div>
              <a href="https://www.facebook.com" className="text-dark me-3" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://www.instagram.com" className="text-dark me-3"  target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a href="https://www.twitter.com" className="text-dark me-3"  target="_blank" rel="noopener noreferrer">
                  <i className=" text-dark fab fa-twitter fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <hr className="bg-dark" />
          <p className="text-dark mb-0">
            © {new Date().getFullYear()} Drive Safe | All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
