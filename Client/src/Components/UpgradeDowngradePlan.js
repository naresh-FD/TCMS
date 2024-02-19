import React, { useState, useEffect } from "react";
import axios from "axios";
import BackToDashboardButton from "./BackToDashboardButton";

function UpgradeDowngradePlan() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({ id: "", name: "" });
  const [customerID, setCustomerID] = useState("1");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/listplans")
      .then((response) => {
        const plansData = response.data;
        if (plansData.length > 0) {
          setSelectedPlan({ id: plansData[0].id.toString(), name: plansData[0].plan_name });
        }
        setPlans(plansData);
      })
      .catch((error) => {
        console.error("There was an error fetching the plans", error);
      });
  }, []);

  const handlePlanChange = (event) => {
    const planId = event.target.value;
    const plan = plans.find((p) => p.id.toString() === planId);
    if (plan) {
      setSelectedPlan({ id: plan.id.toString(), name: plan.plan_name });
    } else {
      console.log("Plan not found with id:", planId);
    }
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:5000/api/change_plan/${customerID}`, {
        new_plan_name: selectedPlan.name,
      })
      .then((response) => {
        console.log("Plan updated successfully!", response.data);
        setAlertMessage("Plan updated successfully!");
        setAlertType("success");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((error) => {
        console.error("There was an error updating the plan", error);
        setAlertMessage("Error updating plan. Please try again.");
        setAlertType("danger");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  return (
    <div className="container my-3">
      <div className="my-3">
        <BackToDashboardButton />
      </div>
      <div className="p-5">
        {showAlert && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
      </div>
      <div className="row g-3 align-items-center">
        <h2>Upgrade Downgrade Plan</h2>
        <div className="col-auto">
          <label htmlFor="planSelect" className="col-form-label">
            Select New Plan:
          </label>
        </div>
        <div className="col-8">
          <select
            className="form-select"
            id="planSelect"
            value={selectedPlan.id}
            onChange={handlePlanChange}
          >
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id.toString()}>
                {plan.plan_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Update Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpgradeDowngradePlan;
