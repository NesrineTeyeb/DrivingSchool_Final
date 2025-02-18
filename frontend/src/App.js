import {BrowserRouter as Router, Routes, Route,useNavigate} from "react-router-dom";
import { useEffect } from "react";
import NavigationBar from "./components/navbar/NavigationBar";
import ReservationForm from "./components/reservationForm/ReservationForm";
import HomeGuest from "./pages/home/HomeGuest";
import HomeUser from "./pages/home/HomeUser";
import Login from "./pages/login/Login";
import QuizDetail from "./components/quizdetail/QuizDetail";
import QuizList from "./components/quizlist/QuizList";
import CourseList from "./components/courselist/CourseList";
import SignUp from "./pages/signup/SignUp";
import Logout from "./pages/Logout";
import ContactForm from "./components/contactForm/ContactForm";
import Formation from "./components/formation/Formation";
import PaymentForm from "./components/paymentForm/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import { PaymentProvider } from "./context/PaymentContext";
import EditReservation from "./components/reservationEdit/ReservationEdit";
// import RequirePayment from "./components/RequirePayment";

const stripePromise = loadStripe("pk_test_51QtOlLEIxwvzLwaEGQKkwhzIVbQMsXyuvkxBB9ECGxGDoZEVXexecGd83nmRfIesKRfXE4ViYzWUCdADfpQDi76200ACdZQROR");
function RedirectToHome() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home-user");
    } else {
      navigate("/home-guest");
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Router>
        <PaymentProvider>
          <NavigationBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<RedirectToHome />} />
              <Route path="/home-guest" element={<HomeGuest />} />
              <Route path="/about-us" element={<HomeGuest />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/home-user" element={<HomeUser />} />
              <Route path="/formation" element={<Formation />} />
              {/* Protéger l'accès aux cours et quiz */}
              {/* <Route
                path="/courses"
                element={
                  <RequirePayment>
                    <CourseList />
                  </RequirePayment>
                }
              /> */}
              {/* <Route
                path="/quiz"
                element={
                  <RequirePayment>
                    <QuizList />
                  </RequirePayment>
                }
              /> */}
              <Route path="/courses" element={<CourseList />} />
              <Route path="/quiz" element={<QuizList />} />
              <Route path="/quiz/:id" element={<QuizDetail />} />
              <Route path="/reservation" element={<ReservationForm />} />
              <Route path="/my-reservations" element={<EditReservation />} />
              {/* <Route path="/payment" element={<PaymentForm />} /> */}
              <Route 
                path="/payment" 
                element={
                  // Envelopper PaymentForm dans Elements pour fournir le contexte Stripe
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                } 
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </PaymentProvider>
      </Router>
    </div>
  );
}

export default App;
