import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { LoggedInUserProvider } from "./Components/LoggedInUserContext";

function App() {
  return (
    <LoggedInUserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoggedInUserProvider>
  );
}

export default App;
