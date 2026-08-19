import { useState } from "react";
import "./styles.css";
import logo from "./logo.svg";

const Textbox = ({ placeholder, type, icon, value, onChange }) => (
  <div className="login-5-textbox">
    <i className={`ai ai-${icon}`} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  </div>
);

export const Login5 = ({ onSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Login berhasil → masuk ke Dashboard
        onLoginSuccess(data.email || email);
      } else {
        alert("Email atau password salah!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server tidak terhubung!");
    }
  };

  return (
    <section className="page login-5">
      <div className="login-5-background"></div>

      <div className="login-5-card">
        <img src={logo} alt="Logo" />

        <h2>Welcome back!</h2>

        <form onSubmit={handleLogin}>
          <Textbox
            icon="envelope"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Textbox
            icon="lock-on"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign In</button>

          <a href="#">Forgot password?</a>
        </form>

        <footer>
          Need an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSignup();
            }}
          >
            Sign up
          </a>
        </footer>
      </div>
    </section>
  );
};