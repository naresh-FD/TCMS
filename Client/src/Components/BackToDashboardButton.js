import React from "react";
import { useNavigate } from "react-router-dom";

const BackToDashboardButton = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <button type="button" className="btn btn-secondary" onClick={goToDashboard}>
      Back to Dashboard
    </button>
  );
};

export default BackToDashboardButton;
