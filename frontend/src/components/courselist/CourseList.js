import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CourseList.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      console.error("No token found, the user might not be logged in.");
      return; // If no token is found, stop the execution
    }

    setIsLoading(true); // Set loading to true before fetching data

    axios
      .get("http://localhost:5000/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      })
      .then((response) => {
        setCourses(response.data);
        setIsLoading(false); // Stop loading after successful fetch
      })
      .catch((error) => {
        console.error("Error loading courses", error);
        setIsLoading(false); // Stop loading in case of error
      });
  }, []);

  // Calculate the courses for the current page
  const coursesPerPage = 1; // Set the number of courses per page (adjust as needed)
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Handle next page navigation
  const handleNextPage = () => {
    if (currentPage < Math.ceil(courses.length / coursesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-4">
      <h2 >Courses</h2>
      {/* Display loading state */}
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : (
        <div className="courses-grid">
          {currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <div key={course._id} className="course-card">
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <div 
                    className="course-description"
                    dangerouslySetInnerHTML={{ 
                      __html: course.description.split('\n').map(line => `<p>${line}</p>`).join('')
                    }}
                  />
                  {course.videoURL && (
                    <div className="video-container">
                      <iframe
                        src={course.videoURL}
                        title={course.title}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-courses">
              <i className="fas fa-book-open mb-3"></i>
              <p>Aucun cours n'est disponible pour le moment</p>
            </div>
          )}
        </div>
      )}

      {courses.length > 0 && (
        <>
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left mr-2"></i> Précédent
            </button>
            <span className="page-info">
              Page {currentPage} sur {Math.ceil(courses.length / coursesPerPage)}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(courses.length / coursesPerPage)}
            >
              Suivant <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>

          {/* Afficher le bouton Time to Practice uniquement sur la dernière page */}
          {currentPage === Math.ceil(courses.length / coursesPerPage) && (
            <div className="text-center mt-4">
              <button
                className="btn btn-primary practice-button"
                onClick={() => navigate("/quiz")}
              >
                <i className="fas fa-graduation-cap mr-2"></i>
                Time to Practice
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseList;
