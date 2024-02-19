import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = {
    name: "Jane Doe",
    role: "Customer Service Agent",
  };
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/getallcustomers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data:", error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="dashboard container text-center mt-5 border p-5">
        <header className="dashboard-header">
          <h1>Welcome, {user.name}</h1>
          <p>Role: {user.role}</p>
        </header>
        <div className="container my-3">
          <h2 className="text-center pt-5">Customer List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.plan_name}</td>
                  {/* <td>
                   <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="dashboard-actions pt-3">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => navigate("/register-customer")}
          >
            Register Customer
          </button>
          <button
            className="btn btn-outline-success mx-2"
            onClick={() => navigate("/choose-new-plan")}
          >
            Choose New Plan
          </button>
          <button className="btn btn-outline-info mx-2" onClick={() => navigate("/renew-plan")}>
            Renew Plan
          </button>
          <button
            className="btn btn-outline-warning mx-2"
            onClick={() => navigate("/upgrade-downgrade-plan")}
          >
            Upgrade/Downgrade Plan
          </button>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
