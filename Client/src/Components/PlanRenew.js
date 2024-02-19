import React, { useState, useEffect } from "react";
import axios from "axios";
import BackToDashboardButton from "./BackToDashboardButton";

function PlanRenew() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [newPlanName, setNewPlanName] = useState("Gold180");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/listplans")
      .then((response) => {
        setPlans(response.data);
        if (response.data.length > 0) {
          setSelectedPlan(response.data[0].id);
        }
      })
      .catch((error) => console.error("There was an error fetching the plans", error));
  }, []);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const renewPlan = () => {
    axios
      .post(`http://localhost:5000/api/change_plan/${selectedPlan}`, { new_plan_name: newPlanName })
      .then((response) => {
        setAlertMessage("Plan renewed successfully!");
        setAlertType("success");
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      })
      .catch((error) => {
        setAlertMessage("There was an error renewing the plan");
        setAlertType("danger");
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        console.error("There was an error renewing the plan", error);
      });
  };

  return (
    <div className="container my-3 mt-3">
      <BackToDashboardButton />{" "}
      <div className="pt-4">
        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}
      </div>
      <h3 className="my-3">Select Plan to Renew</h3>
      <div className="input-group mb-3">
        <select
          className="form-select"
          id="planSelect"
          value={selectedPlan}
          onChange={handlePlanChange}
        >
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.plan_name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="button" onClick={renewPlan}>
          Renew Plan
        </button>
      </div>
    </div>
  );
}

export default PlanRenew;
