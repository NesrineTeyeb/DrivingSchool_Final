import React from "react";
import { useNavigate } from "react-router-dom";
import "./Formation.css";

function Formation() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="formationSection">
        <div className="descriptionItem">
          <h1>Get Your Personalized Driving License</h1>
          <p>
            Take advantage of personalized training to obtain your driving
            license at the CER des Richardets in Noisy le Grand. Depending on
            your needs and schedule, quickly access our training with
            possible financing via your CPF.
          </p>
          <button onClick={() => navigate("/contact")}>Contact Us Now</button>
        </div>
        <div className="descriptionImage">
          <img
            src="https://cerdesrichardets.fr/wp-content/uploads/2024/09/car-driving.png"
            alt="Formation"
          />
        </div>
      </div>
      
      <div className="globalContainer">
        <div className="licenseBSection">
          <div className="descriptionImage-licenseB">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvz_GkGYmKYn_ZrpqGMMyWLXpIZdGaVCXcabsM2cxiIoUYyoocuwFQK54xr9lwLSyA9nc&usqp=CAU"
              alt="License B Training"
            />
          </div>
          <div className="descriptionItem-licenseB">
            <h1>License B</h1>
            <p>
              Complete your driving training with us for a quick and secure path to obtaining 
              your driving license. Our driving school offers various training courses 
              perfectly tailored to your individual needs and learning style.
            </p>
          </div>
        </div>

        <div className="licenseBSection">
          <div className="descriptionItem-licenseB">
            <h1>Accompanied & Supervised Driving</h1>
            <p>
              Start your driving journey at 15 with our supervised driving program. 
              This comprehensive training helps prepare for the practical test in a 
              more relaxed and confident manner, offering greater flexibility while 
              maintaining all the advantages of early learning.
            </p>
          </div>
          <div className="descriptionImage-licenseB">
            <img
              src="https://www.adrianflux.co.uk/learner-drivers/wp-content/uploads/2024/01/supervising-a-learner-driver-1.png"
              alt="Supervised Driving"
            />
          </div>
        </div>

        <div className="licenseBSection">
          <div className="descriptionImage-licenseB">
            <img
              src="https://cerdesrichardets.fr/wp-content/uploads/2024/09/formation-accel.jpg"
              alt="Accelerated Training"
            />
          </div>
          <div className="descriptionItem-licenseB">
            <h1>Accelerated Training</h1>
            <p>
              Fast-track your way to getting your license with our accelerated training program. 
              Perfect for those who need to obtain their license quickly, this intensive course 
              provides comprehensive training in a condensed timeframe.
            </p>
          </div>
        </div>

        <button onClick={() => navigate("/courses")}>Begin the course</button>
      </div>
    </div>
  );
}

export default Formation;
