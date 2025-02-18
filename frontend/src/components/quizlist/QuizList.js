import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./QuizList.css"; // Assurez-vous que ce fichier CSS est dans le même répertoire

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quizzes")
      .then((response) => setQuizzes(response.data))
      .catch((error) =>
        console.error("Error while loading quizzes", error)
      );
  }, []);

  return (
    <div className="container quiz-list-container">
      <h2 className="quiz-list-title">Quiz List</h2>
      <div className="row">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="col-md-6">
            <div className="card quiz-card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{quiz.title}</h5>
                <p className="card-text">
                  Discover this quiz to test your knowledge and face new challenges.
                </p>
                <Link to={`/quiz/${quiz._id}`} className="btn btn-primary">
                  View Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
