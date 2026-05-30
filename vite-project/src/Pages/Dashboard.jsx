import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const ADMIN_PASSWORD = "1234";

  const openAdminPage = (path) => {
    const pass = prompt("Enter Admin Password:");

    if (pass === ADMIN_PASSWORD) {
      navigate(path);
    } else {
      alert("❌ Wrong Password");
    }
  };

  // 🔥 STATE FOR LIVE DATA
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 CARDS WITH LIVE DATA
  const cards = [
    { title: "Total Students", value: stats.total, color: "#2563eb" },
    { title: "Approved", value: stats.approved, color: "#16a34a" },
    { title: "Pending", value: stats.pending, color: "#f59e0b" },
    { title: "Rejected", value: stats.rejected, color: "#ef4444" },
  ];

  return (
    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>📊 College Dashboard</h2>

        {/* ADMIN BUTTON */}
        <div
          style={styles.admin}
          onClick={() => openAdminPage("/admin-profile")}
        >
          👤 Admin
        </div>
      </div>

      {/* CARDS */}
      <div style={styles.grid}>
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              ...styles.card,
              borderTop: `4px solid ${c.color}`,
            }}
          >
            <h4>{c.title}</h4>
            <h1>{c.value}</h1>
          </div>
        ))}
      </div>

      {/* NOTICE PANEL */}
      <div style={styles.panel}>
        <h3>📢 Notices</h3>
        <p>• Admission open for 2026 batch</p>
        <p>• Exam timetable released</p>
        <p>• Fee payment last date extended</p>
      </div>

      {/* FACILITIES */}
      <div style={styles.panel}>
        <h3>🏫 Facilities</h3>

        <div style={styles.grid}>
          <div style={styles.item}>📶 Wi-Fi Campus</div>
          <div style={styles.item}>📚 Library & Digital Library</div>
          <div style={styles.item}>🏠 Hostel Facility</div>
          <div style={styles.item}>🏏 Sports Ground</div>
          <div style={styles.item}>💻 Computer Labs</div>
          <div style={styles.item}>🏛️ Govt Scholarship</div>
          <div style={styles.item}>🎯 Job Opportunities</div>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  admin: {
    background: "#0f172a",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  panel: {
    marginTop: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  item: {
    background: "#f1f5f9",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },
};