import { useState } from "react";

import { Login5 } from "./Login5";
import { Signup } from "./Signup";
import { Dashboard } from "./Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const [userEmail, setUserEmail] = useState("");
  const [loginKey, setLoginKey] = useState(0);

  // Setelah login berhasil
  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setPage("dashboard");
  };

  // Logout
  const handleLogout = () => {
    setUserEmail("");
    setLoginKey((prev) => prev + 1);
    setPage("login");
  };

  // Kembali ke Login setelah Sign Up
  const handleBackToLogin = () => {
    setLoginKey((prev) => prev + 1);
    setPage("login");
  };

  // Halaman Sign Up
  if (page === "signup") {
    return (
      <Signup
        onBackToLogin={handleBackToLogin}
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
      key={loginKey}
      onSignup={() => setPage("signup")}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}

export default App;