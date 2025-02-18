import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home-user"); // Redirige vers HomeUser si connecté
    } else {
      navigate("/home-guest"); // Sinon vers HomeGuest
    }
  }, [navigate]);

  return null; // Ce composant ne rend rien
}

export default Home;
