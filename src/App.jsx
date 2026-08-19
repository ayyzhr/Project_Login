import { useState } from "react";

import { Login5 } from "./Login5";
import { Signup } from "./Signup";
import { Dashboard } from "./Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const [userEmail, setUserEmail] = useState("");

  // Setelah login berhasil
  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setPage("dashboard");
  };

  // Logout
  const handleLogout = () => {
    setUserEmail("");
    setPage("login");
  };

  // Halaman Sign Up
  if (page === "signup") {
    return (
      <Signup
        onBackToLogin={() => setPage("login")}
      />
    );
  }

  // Halaman Dashboard
  if (page === "dashboard") {
    return (
      <Dashboard
        email={userEmail}
        onLogout={handleLogout}
      />
    );
  }

  // Halaman Login
  return (
    <Login5
      onSignup={() => setPage("signup")}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}

export default App;