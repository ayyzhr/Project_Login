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
      required
    />
  </div>
);

export const Signup = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password harus diisi!");
      return;
    }

    try {
      const body = new URLSearchParams();

      body.append("email", email.trim());
      body.append("password", password);

      const response = await fetch(
        "http://127.0.0.1:3000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Akun berhasil dibuat!");

        setEmail("");
        setPassword("");

        onBackToLogin();
      } else {
        alert(data.message || "Gagal membuat akun!");
      }

    } catch (error) {
      console.error("Signup error:", error);

      alert(
        "Tidak bisa terhubung ke server. Pastikan server.cjs berjalan."
      );
    }
  };

  return (
    <section className="page login-5">
      <div className="login-5-background"></div>

      <div className="login-5-card">
        <img src={logo} alt="Logo" />

        <h2>Create account!</h2>

        <form onSubmit={handleSignup}>

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

          <button type="submit">
            Sign Up
          </button>

        </form>

        <footer>
          Already have an account?{" "}

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackToLogin();
            }}
          >
            Sign in
          </a>
        </footer>

      </div>
    </section>
  );
};