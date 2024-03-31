import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./ReviewResume.css"; // Import CSS file for additional styling

function ReviewResume() {
  const [resumes, setResumes] = useState(["a.jpg", "b.jpg", "c.jpg"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? resumes.length - 1 : prevIndex - 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, resumes.length]);

  const swiped = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === resumes.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "right") {
      setShowPopup(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === resumes.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="review-resume-container">
      <div className="left-card-container">
        <div className="tinder-card-container">
          <TinderCard
            key={currentIndex}
            className="swipe"
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir)}
          >
            <div className="tinder-card">
              {/* Display PNG file */}
              <img src={resumes[currentIndex]} alt={`Resume ${currentIndex + 1}`} />
            </div>
          </TinderCard>
        </div>
      </div>

      {/* Popup for referral confirmation */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Student Referral Sent!</h2>
            <button className="close-button1" onClick={closePopup}>
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewResume;
