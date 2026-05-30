import React from "react";
import { useNavigate } from "react-router-dom";

export default function CoursesPage() {
  const navigate = useNavigate();

  const courses = [
    { code: "CSE", title: "Computer Science & Engineering", color: "#3b82f6" },
    { code: "ECE", title: "Electronics & Communication", color: "#f97316" },
    { code: "E&E", title: "Electrical & Electronics", color: "#22c55e" },
    { code: "AI", title: "Artificial Intelligence", color: "#a855f7" },
  ];

  return (
    <div style={styles.page}>
      <h1>📚 Courses</h1>

      <div style={styles.grid}>
        {courses.map((c) => (
          <div
            key={c.code}
            style={{ ...styles.card, borderTop: `4px solid ${c.color}` }}
            onClick={() => navigate(`/courses/${c.code}`)}
          >
            <h2>{c.code}</h2>
            <p>{c.title}</p>
            <button style={styles.btn}>Why we Choose..?</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  btn: {
    marginTop: "10px",
    padding: "8px",
    width: "100%",
    border: "none",
    background: "#0f172a",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};