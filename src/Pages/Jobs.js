import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { auth, getAllEmployees, addCampusEmail } from "../firebase"; // Import addCampusEmail function
import { getEducationInformation, getJourneyInformation, getProjectInformation, getWorkInformation } from "../firebase"; // Import other firebase functions
import "./Jobs.css"; // Import CSS file for additional styling

function Jobs() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingScore, setLoadingScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isSwipedRight, setIsSwipedRight] = useState(false);
  const [helloMessage, setHelloMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the pop-up message

  const fetchHelloMessage = async () => {
    try {
      const education = await getEducationInformation(user.email);
      const passion = await getJourneyInformation(user.email);
      const work = await getWorkInformation(user.email);
      const project = await getProjectInformation(user.email);
      const exp = "This is my profile: Work Experience - Job Title is " + work[0].employer + ", Company name is " + work[0].jobTitle + " my Education is in - " + education.major + " my GPA is " + education.gpa + " my school is " + education.schoolName + " my Project description - " + project[0].description + "\nOut of the top individuals, rate my profile out of 10. Also give me tips to improve it in 100 words";
      const url = `http://localhost:5000/hello?prompt=${encodeURIComponent(exp)}`;
      const response = await fetch(url);
      const data = await response.text();
      setHelloMessage(data);
    } catch (error) {
      console.error('Error fetching hello message:', error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    const fetchEmployees = async () => {
      const employeeList = await getAllEmployees();
      setEmployees(employeeList);
    };

    fetchEmployees();
  }, [user, loading, navigate]);

  const swiped = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % employees.length);
    } else if (direction === "right") {
      setIsSwipedRight(true);
      setIsLoading(true); // Show loading circle
      simulateLoading(); // Simulate loading progress
      fetchHelloMessage(); 
    }
  };

  const simulateLoading = () => {
    const interval = setInterval(() => {
      setLoadingScore((prevScore) => {
        if (prevScore >= 50) {
          clearInterval(interval);
          setIsLoading(false); // Hide loading circle
          setShowButtons(true); // Show back and next buttons
        }
        return prevScore + 1;
      });
    }, 50);
  };

  const handleBackButtonClick = () => {
    window.location.reload(); // Refresh the page
  };

  const handleNextButtonClick = () => {
    setShowPopup(true); // Show the pop-up message
    addCampusEmail(user.email); // Add the user's email to the "campus" collection
  };

  const handleCRbutton = () => {
    const currentEmployee = employees[currentIndex];
    if (currentEmployee && currentEmployee.website) {
      window.open(currentEmployee.website, "_blank");
    } else {
      window.open("https://jobs.lever.co/veeva/8a2abfcb-09b8-4b1c-b444-949000c19529", "_blank");
    }
  };

  return (
    <div className="jobs-container">
      <div className="left-card-container">
        <div className="tinder-card-container">
          {!isSwipedRight && employees.slice(currentIndex, currentIndex + 1).map((employee) => (
            <TinderCard
              key={employee.id}
              className="swipe"
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir)}
            >
              <div className="tinder-card">
                <img
                  src={`${employee.id}.png`}
                  alt={`Employee ${employee.id}`}
                  className="employee-image"
                />
                <div>
                  <strong>ID:</strong> {employee.id}
                </div>
                <div>
                  <strong>Name:</strong> {employee.name}
                </div>
                <div>
                  <strong>Salary:</strong> {employee.salary}
                </div>
                <div>
                  <strong>Location:</strong> {employee.location}
                </div>
                <div>
                  <strong>Job:</strong> {employee.job}
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
      {isLoading ? (
        <div className="loading-circle">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      ) : showButtons ? (
        <>
          <div className="black-card">
            <h2>{helloMessage}</h2>
          </div>
          <div className="buttons-container">
            <button className="back-button" onClick={handleBackButtonClick}>Back</button>
            <button className="next-button" onClick={handleNextButtonClick}>Connect to Campus Rep</button>
            <button className="next-button" onClick={handleCRbutton}>Apply</button>
          </div>
        </>
      ) : (
        <div className="right-card-container">
          <div className="tinder-card description-card">
            <strong>Description:</strong>
            {employees[currentIndex] && <p>{employees[currentIndex].description}</p>}
          </div>
        </div>
      )}

{showPopup && (
  <div className="popup-container">
    <div className="popup">
      <p>Profile sent to Campus Rep for review!</p>
      <button className="close-button" onClick={() => setShowPopup(false)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
}

export default Jobs;
