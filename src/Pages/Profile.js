import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, addProfileInformation, getEducationInformation, getJourneyInformation, getProjectInformation, getWorkInformation } from "../firebase"; // Import getEducationInformation function
import "./Profile.css"; // Import CSS file for styling


function Profile() {
  const [user] = useAuthState(auth);

  const [passion, setPassion] = useState("");
  const [education, setEducation] = useState({
    schoolName: "",
    degree: "",
    major: "",
    gpa: "",
  });
  const [workExperiences, setWorkExperiences] = useState([
    {
      jobTitle: "",
      employer: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      name: "",
      position: "",
      url: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const educationData = await getEducationInformation(user.email);
        const field1 = await getJourneyInformation(user.email);
        const field3 = await getWorkInformation(user.email);
        const field4 = await getProjectInformation(user.email);

        setPassion(field1);
        setWorkExperiences(field3);
        setProjects(field4);
        setEducation(educationData);
        console.log("Education data fetched:", educationData);
      } catch (error) {
        console.error("Error fetching education information:", error);
      }
    };

    fetchEducationData();
  }, [user.email]);
  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Save profile information to Firestore
    addProfileInformation(user.email,
        passion,
        workExperiences,
        projects,
        education,
      ); // Example function call
    // You can similarly save other profile information to Firestore here
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSave} className="profile-form">
        {/* Information Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">Information</h2>
          <p>Email: {user.email}</p>
        </div>

        {/* My Journey Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">My Journey</h2>
          <textarea
            className="profile-textarea"
            value={passion}
            onChange={(e) => setPassion(e.target.value)}
            placeholder="What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?"
          ></textarea>
        </div>

        {/* Education Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">Education</h2>
          <div className="profile-input-group">
            <label>School Name:</label>
            <input
              type="text"
              className="profile-input"
              placeholder="School Name"
              value={education.schoolName}
            onChange={(e) => setEducation({ ...education, schoolName: e.target.value })}
            />
          </div>
          <div className="profile-input-group">
            <label>Degree:</label>
            <input
              type="text"
              className="profile-input"
              placeholder="Degree"
              value={education.degree}
            onChange={(e) => setEducation({ ...education, degree: e.target.value })}
            />
          </div>
          <div className="profile-input-group">
            <label>Major:</label>
            <input
              type="text"
              className="profile-input"
              placeholder="Major"
              value={education.major}
            onChange={(e) => setEducation({ ...education, major: e.target.value })}
            />
          </div>
          <div className="profile-input-group">
          <label>GPA:</label>
            <input
            type="text"
            className="profile-input"
            placeholder="GPA"
            value={education.gpa}
            onChange={(e) => setEducation({ ...education, gpa: e.target.value })}
            />

          </div>
        </div>


        {/* Work Experience Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">Work Experience</h2>
          {workExperiences.map((work, index) => (
            <div key={index} className="work-experience-fields">
              <div className="profile-input-group">
                <label>Job Title:</label>
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Job Title"
                  value={work.jobTitle}
                  onChange={(e) => {
                    const updatedExperiences = [...workExperiences];
                    updatedExperiences[index].jobTitle = e.target.value;
                    setWorkExperiences(updatedExperiences);
                  }}
                />
              </div>
              <div className="profile-input-group">
                <label>Employer:</label>
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Employer"
                  value={work.employer}
                  onChange={(e) => {
                    const updatedExperiences = [...workExperiences];
                    updatedExperiences[index].employer = e.target.value;
                    setWorkExperiences(updatedExperiences);
                  }}
                />
              </div>
              <div className="date-inputs">
                <div className="profile-input-group">
                  <label>Start Date:</label>
                  <input
                    type="text"
                    className="profile-input date-input"
                    placeholder="Start Date"
                    value={work.startDate}
                    onChange={(e) => {
                      const updatedExperiences = [...workExperiences];
                      updatedExperiences[index].startDate = e.target.value;
                      setWorkExperiences(updatedExperiences);
                    }}
                  />
                </div>
                <div className="profile-input-group">
                  <label>End Date:</label>
                  <input
                    type="text"
                    className="profile-input date-input"
                    placeholder="End Date"
                    value={work.endDate}
                    onChange={(e) => {
                      const updatedExperiences = [...workExperiences];
                      updatedExperiences[index].endDate = e.target.value;
                      setWorkExperiences(updatedExperiences);
                    }}
                  />
                </div>
              </div>
              <div className="profile-input-group">
                <label>Location:</label>
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Location"
                  value={work.location}
                  onChange={(e) => {
                    const updatedExperiences = [...workExperiences];
                    updatedExperiences[index].location = e.target.value;
                    setWorkExperiences(updatedExperiences);
                  }}
                />
              </div>
              <div className="profile-input-group">
                <label>Description:</label>
                <textarea
                  className="profile-textarea"
                  placeholder="Description"
                  value={work.description}
                  onChange={(e) => {
                    const updatedExperiences = [...workExperiences];
                    updatedExperiences[index].description = e.target.value;
                    setWorkExperiences(updatedExperiences);
                  }}
                ></textarea>
              </div>
            </div>
          ))}
          <button
            className="profile-add-button"
            onClick={() =>
              setWorkExperiences([
                ...workExperiences,
                {
                  jobTitle: "",
                  employer: "",
                  startDate: "",
                  endDate: "",
                  location: "",
                  description: "",
                },
              ])
            }
          >
            Add Work Experience
          </button>
        </div>

        {/* Project Experience Section */}
        <div className="profile-section">
          <h2 className="profile-section-title">Project Experience</h2>
          {projects.map((project, index) => (
            <div key={index} className="project-fields">
              <div className="profile-input-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Name"
                  value={project.name}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].name = e.target.value;
                    setProjects(updatedProjects);
                  }}
                />
              </div>
              <div className="profile-input-group">
                <label>Position:</label>
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Position"
                  value={project.position}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].position = e.target.value;
                    setProjects(updatedProjects);
                  }}
                />
              </div>
              <div className="profile-input-group">
                <label>URL:</label>
                <input
                  type="text"
                  className="profile-input"
                  placeholder="URL"
                  value={project.url}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].url = e.target.value;
                    setProjects(updatedProjects);
                  }}
                />
              </div>
              <div className="date-inputs">
                <div className="profile-input-group">
                  <label>Start Date:</label>
                  <input
                    type="text"
                    className="profile-input date-input"
                    placeholder="Start Date"
                    value={project.startDate}
                    onChange={(e) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index].startDate = e.target.value;
                      setProjects(updatedProjects);
                    }}
                  />
                </div>
                <div className="profile-input-group">
                  <label>End Date:</label>
                  <input
                    type="text"
                    className="profile-input date-input"
                    placeholder="End Date"
                    value={project.endDate}
                    onChange={(e) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index].endDate = e.target.value;
                      setProjects(updatedProjects);
                    }}
                  />
                </div>
              </div>
              <div className="profile-input-group">
                <label>Description:</label>
                <textarea
                  className="profile-textarea"
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].description = e.target.value;
                    setProjects(updatedProjects);
                  }}
                ></textarea>
              </div>
            </div>
          ))}
          <button
            className="profile-add-button"
            onClick={() =>
              setProjects([
                ...projects,
                {
                  name: "",
                  position: "",
                  url: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                },
              ])
            }
          >
            Add Project
          </button>
        </div>

        <button type="submit" className="profile-save-button">
          Save Profile
        </button>
      </form>
    </div>
  );
}
export default Profile;