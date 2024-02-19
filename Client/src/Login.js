import React, { useContext } from "react";
import { LoggedInUserContext } from "./Components/LoggedInUserContext";

function Login() {
  const { setUser } = useContext(LoggedInUserContext);

  const handleLogin = () => {
    setUser({ name: "Jane Doe", isLoggedIn: true });
  };

  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
