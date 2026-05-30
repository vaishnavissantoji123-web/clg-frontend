import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        {/* LOGO */}
        <div style={styles.logoBox}>
          <img src={logo} alt="logo" style={styles.logo} />
          <h3 style={styles.title}>Government Polytechnic Holealur 582203</h3>
        </div>

        {/* LINKS */}
        <NavLink to="/" style={styles.link}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/courses" style={styles.link}>
          📚 Courses
        </NavLink>
        <NavLink to="/admission" style={styles.link}>
          📝 Admission
        </NavLink>

        {/* ✅ LOGOUT BUTTON */}
        <button onClick={handleLogout} style={styles.logout}>
          🚪 Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

/* ✅ STYLES */
const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "260px",
    height: "120vh", // ✅ fixed height
    background: "#0f172a",
    color: "white",
    padding: "20px",
    display: "flex", // ✅ IMPORTANT
    flexDirection: "column", // ✅ IMPORTANT
  },

  logoBox: {
    textAlign: "center",
    marginBottom: "30px",
  },

  logo: {
    width: "150px",
    height: "120px",
    borderRadius: "3px",
    objectFit: "cover",
    border: "2px solid #38bdf8",
    padding: "4px",
    background: "white",
  },

  title: {
    fontSize: "16px",
    marginTop: "10px",
    color: "#38bdf8",
    fontWeight: "bold",
    textDecoration: "underline",
  },

  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    background: "#1e293b",
  },

  logout: {
    marginTop: "auto", // ✅ pushes button to bottom
    padding: "12px",
    background: "#ef4444",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    width: "100%",
  },

  main: {
    flex: 1,
    background: "#f1f5f9",
    minHeight: "100vh",
    padding: "20px",
  },
};