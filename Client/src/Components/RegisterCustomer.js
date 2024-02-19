import React, { useState } from "react";
import "../assets/css/RegisterCustomer.css";
import BackToDashboardButton from "./BackToDashboardButton";
import axios from "axios";

function RegisterCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    dob: "",
    email: "",
    adhar_number: "",
    registrationDate: "",
    mobile_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:5000/api/register_customer", customer)
      .then((response) => {
        setAlertMessage("Success: Customer registered successfully!");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })
      .catch((error) => {
        setAlertMessage("Error: Failed to register customer. Please try again.");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };

  return (
    <div className="m-3">
      {showAlert && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}

      <BackToDashboardButton />

      <div className="register-customer">
        <h2>Register Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              DOB:
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={customer.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adharNumber" className="form-label">
              Adhar Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="adhar_number"
              name="adhar_number"
              value={customer.adhar_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registrationDate" className="form-label">
              Registration Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="registrationDate"
              name="registrationDate"
              value={customer.registrationDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Assigned Mobile Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              value={customer.mobile_number}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterCustomer;
