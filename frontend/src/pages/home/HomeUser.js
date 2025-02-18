import React from "react";
// import {jwtDecode} from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
// import "./HomeGuest.css
import "./HomeUser.css";
import { useNavigate } from "react-router-dom";

function HomeUser() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to our Driving School </h1>
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
              <Card.Title>License B (Mechanical or automatic)</Card.Title>
              <Card.Text className="text-start">
                Get your driver's license with professional guidance and
                hands-on training.
              </Card.Text>
              <Button
                classname="formation-button"
                variant="primary"
                onClick={() => navigate("/formation")}
              >
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
              <Card.Title classname="card-title">
                Accompanied and supervised driving
              </Card.Title>
              <Card.Text className="text-start">
                Enhance your confidence behind the wheel with supervised driving
                lessons.
              </Card.Text>
              <Button
                classname="formation-button"
                variant="primary"
                onClick={() => navigate("/formation")}
              >
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
              <Card.Text className="text-start">
                Learn faster with intensive driving courses tailored to your
                needs."
              </Card.Text>
              <Button
                classname="formation-button"
                variant="primary"
                onClick={() => navigate("/formation")}
              >
                More Informations
              </Button>
            </Card.Body>
          </Card>
        </div>
      </section>
      {/* Courses Section */}
      <section id="courses" className="mt-2">
        <h2 >Discover Our Courses</h2>
        <div className="courses-description">
          <p className="text-center lead">
            Unlock a variety of interactive courses designed to boost your
            driving skills and prepare you for every scenario on the road. Our
            comprehensive video lessons, engaging quizzes, and practical
            simulations will guide you through every step of your journey to
            becoming a confident driver.
          </p>
        </div>
        <div className="course-features d-flex flex-wrap justify-content-center mt-4">
          <div
            className="feature-card p-3 m-2 text-center"
            style={{ maxWidth: "300px" }}
          >
            <h4>Interactive Lessons</h4>
            <p>
              Enjoy engaging video content that simulates real-life driving
              situations and enhances your learning experience.
            </p>
          </div>
          <div
            className="feature-card p-3 m-2 text-center"
            style={{ maxWidth: "300px" }}
          >
            <h4>Expert Instructors</h4>
            <p>
              Learn from certified instructors who provide professional guidance
              and support every step of the way.
            </p>
          </div>
          <div
            className="feature-card p-3 m-2 text-center"
            style={{ maxWidth: "300px" }}
          >
            <h4>Practical Quizzes</h4>
            <p>
              Test your knowledge with interactive quizzes and receive instant
              feedback to improve your skills.
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => navigate("/courses")}>
            Access the Courses
          </Button>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="row ">
            {/* First Two FAQs */}
            <div className="col-md-6 mb-4">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    How do I enroll in a driving course?
                  </Accordion.Header>
                  <Accordion.Body>
                    To enroll, visit our "Courses" page and select the training
                    program that suits you. Follow the registration steps and
                    complete the payment to start learning.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="col-md-6">
              <Accordion>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    What types of licenses do you offer?
                  </Accordion.Header>
                  <Accordion.Body>
                    We offer training for License B (automatic and manual),
                    accompanied driving, and accelerated driving courses to help
                    you obtain your license faster.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            {/* Next Two FAQs */}
            <div className="col-md-6">
              <Accordion>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Can I book a driving lesson online?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes! Our platform allows you to book driving lessons at your
                    convenience. Just go to the "Reservations" page and choose
                    your preferred date and time.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="col-md-6">
              <Accordion>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    How can I access the quizzes?
                  </Accordion.Header>
                  <Accordion.Body>
                    The quizzes are available in our "Courses" section. Once
                    you're enrolled in a course, you'll have access to all
                    quizzes to test your knowledge.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center mt-5 mb-5">
          <Button
            classname="reserve-section "
            size="lg"
            onClick={() => navigate("/reservation")}
          >
            Reserve your place
          </Button>
        </div>
      </section>
    </div>
  );
}

export default HomeUser;
