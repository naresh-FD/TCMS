import React, { useState, useEffect } from "react";
import axios from "axios";
import BackToDashboardButton from "./BackToDashboardButton";

function ChooseNewPlan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/listplans")
      .then((response) => {
        setPlans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the plans!", error);
      });
  }, []);

  const onSubmit = ({ planId, planName }) => {
    axios
      .post(`http://127.0.0.1:5000/api/choose_plan/${planId}`, {
        plan_name: planName,
      })
      .then((response) => {
        console.log("API call successful", response.data);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((error) => {
        console.error("Error choosing plan:", error);
      });
  };

  return (
    <div className="container-fluid mt-5">
      <BackToDashboardButton />
      <div className="container mt-5">
        <h2>Choose New Plan</h2>
        {showAlert && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Plan Updated successfully!
          </div>
        )}
        {loading ? (
          <p>Loading plans...</p>
        ) : (
          <ul className="list-group">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{plan.plan_name}</h5>
                  <p>Cost: ${plan.plan_cost}</p>
                  <p>Validity: {plan.validity} days</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => onSubmit({ planId: plan.id, planName: plan.plan_name })}
                >
                  Choose Plan
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ChooseNewPlan;
