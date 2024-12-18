import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Components/Dashboard.css';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {userDetails ? (
        <>
          <div className="dashboard-header">
            <h1>Welcome, {userDetails.name}</h1>
          </div>
          <div className="dashboard-content">
            <p><strong>Employee ID:</strong> {userDetails.employee_id}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Department:</strong> {userDetails.department}</p>
            <p><strong>Date of Joining:</strong> {userDetails.doj}</p>
            <p><strong>Role:</strong> {userDetails.role}</p>
          </div>
          <div className="dashboard-actions">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
