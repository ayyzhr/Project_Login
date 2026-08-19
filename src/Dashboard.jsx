import "./styles.css";
import logo from "./logo.svg";

export const Dashboard = ({ email, onLogout }) => {
  return (
    <section className="dashboard-page">
      <div className="dashboard-card">

        <img
          src={logo}
          alt="Logo"
          className="dashboard-logo"
        />

        <div className="welcome-icon">
          👋
        </div>

        <h1>Welcome!</h1>

        <p className="dashboard-subtitle">
          You have successfully signed in.
        </p>

        <div className="user-info">
          <span>Signed in as</span>

          <strong>{email}</strong>
        </div>

        <button onClick={onLogout}>
          Logout
        </button>

      </div>
    </section>
  );
};