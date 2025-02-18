import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./QuizDetail.css";

const QuizDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quizzes/${id}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => console.error("Erreur lors du chargement du quiz", error));
  }, [id]);

  const handleSelectAnswer = (questionIndex, answer) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
    setScore((correctCount / quiz.questions.length) * 100);
  };

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  if (!quiz) {
    return (
      <div className="quiz-detail-container">
        <div className="loading-spinner">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="quiz-detail-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quiz.title}</h1>
        <p className="quiz-description">{quiz.description}</p>
      </div>

      {score !== null && (
        <div className="score-container">
          <h2 className="score-title"> Quiz Result</h2>
          <div className="score-value">{score.toFixed(0)}%</div>
          <div className="score-details">
            <div className="score-detail-item">
              <div className="score-detail-value">{correctAnswers}</div>
              <div className="score-detail-label"> Corrected Responses</div>
            </div>
            <div className="score-detail-item">
              <div className="score-detail-value">{quiz.questions.length}</div>
              <div className="score-detail-label">Total Questions </div>
            </div>
          </div>
          <p className="feedback-message">
            {score >= 80
              ? "Excellent! You’ve excelled in this subject!"
              : score >= 60
              ? "Good! Keep practicing to improve."
              : "Keep studying and try again to improve your score."}
          </p>
        </div>
      )}

      <div className="questions-container">
        {quiz.questions.map((question, index) => (
          <div key={index} className="question-container">
            <p className="question-text">
              Question {index + 1}: {question.questionText}
            </p>
            <div className="options-container">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`option-button ${
                    userAnswers[index] === option
                      ? score !== null
                        ? option === question.correctAnswer
                          ? "correct"
                          : "incorrect"
                        : "selected"
                      : showAnswers && option === question.correctAnswer
                      ? "correct"
                      : ""
                  }`}
                  onClick={() => handleSelectAnswer(index, option)}
                  disabled={score !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="quiz-controls">
          {score === null ? (
            <button
              className="quiz-button submit-quiz"
              onClick={handleSubmit}
              disabled={Object.keys(userAnswers).length !== quiz.questions.length}
            >
              Submit  Quiz
            </button>
          ) : (
            <button
              className="quiz-button view-answers"
              onClick={toggleShowAnswers}
            >
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
