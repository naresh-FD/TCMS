import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import ChooseNewPlan from "../Components/ChooseNewPlan";
import PlanRenew from "../Components/PlanRenew";
import RegisterCustomer from "../Components/RegisterCustomer";
import UpgradeDowngradePlan from "../Components/UpgradeDowngradePlan";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/choose-new-plan" element={<ChooseNewPlan />} />
      <Route path="/register-customer" element={<RegisterCustomer />} />
      <Route path="/upgrade-downgrade-plan" element={<UpgradeDowngradePlan />} />
      <Route path="/renew-plan" element={<PlanRenew />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
