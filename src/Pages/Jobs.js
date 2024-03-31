import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { auth, getAllEmployees } from "../firebase";
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

  const fetchHelloMessage = async () => {
    try {
      const response = await fetch('http://localhost:5000/hello');
      const data = await response.text();
      setHelloMessage(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching hello message:', error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    // Fetch all employees
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
    }
  };

  // Simulate loading progress
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
    // Handle next button click
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
      <button onClick={fetchHelloMessage}>Get Hello Message</button>
    </div>
          <div className="buttons-container">
            <button className="back-button" onClick={handleBackButtonClick}>Back</button>
            <button className="next-button" onClick={handleNextButtonClick}>Connect to CR</button>
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

    </div>
  );
}

export default Jobs;
