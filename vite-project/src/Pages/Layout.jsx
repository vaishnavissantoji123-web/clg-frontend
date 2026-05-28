import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Layout() {
  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        {/* LOGO SECTION (TOP) */}
        <div style={styles.logoBox}>
          <img src={logo} alt="logo" style={styles.logo} />

          <h3 style={styles.title}>Government Polytechnic Holealur</h3>
        </div>

        {/* NAV LINKS */}
        <NavLink to="/" style={styles.link}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/courses" style={styles.link}>
          📚 Courses
        </NavLink>
        <NavLink to="/admission" style={styles.link}>
          📝 Admission
        </NavLink>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "260px",
    height: "120vh",
    background: "#0f172a",
    color: "white",
    padding: "20px",
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
    fontSize: "17px",
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

  main: {
    flex: 1,
    background: "#f1f5f9",
    minHeight: "120vh",
    padding: "20px",
  },
};