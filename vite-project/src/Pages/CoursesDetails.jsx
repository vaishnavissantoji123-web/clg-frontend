import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseDetails() {
  const { course } = useParams();
  const navigate = useNavigate();

  const data = {
    CSE: {
      title: "Computer Science & Engineering",
      features: [
        "High Demand Jobs",
        "Good Salary Packages",
        "Global Career Opportunities",
        "Wide Career Options",
        "Problem Solving Skills",
        "Remote Work Opportunities",
        "Startup Opportunities",
        "Continuous Learning",
        "Job Security",
        "Work in Top Tech Companies",
      ],
    },

    ECE: {
      title: "Electronics & Communication",
      features: [
        "Core Electronics Knowledge",
        "Embedded Systems",
        "VLSI Design",
        "Telecommunication Systems",
        "IoT Development",
        "Hardware & Software Integration",
        "Good Salary Packages",
        "Government Job Opportunities",
        "High Demand in Core Companies",
        "Research & Innovation",
      ],
    },

    "E&E": {
      title: "Electrical & Electronics",
      features: [
        "Electrical Machines & Power Systems",
        "Circuit Design & Analysis",
        "Renewable Energy Systems",
        "Industrial Automation",
        "Control Systems",
        "Government Job Opportunities",
        "Core Engineering Roles",
        "High Demand in Power Sector",
        "Maintenance & Operations",
        "Energy Management",
      ],
    },

    AI: {
      title: "Artificial Intelligence",
      features: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Data Science & Analytics",
        "Computer Vision",
        "Natural Language Processing",
        "Automation & Robotics",
        "High Salary Jobs",
        "Future Technology Demand",
        "Wide Career Opportunities",
      ],
    },
  };

  const selected = data[course];

  if (!selected) {
    return <h2>❌ Course not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🎓 {course}</h1>
      <h2>{selected.title}</h2>

      <div style={styles.card}>
        <h3>⭐ Features</h3>

        <ul>
          {selected.features.map((f, i) => (
            <li key={i}>✔ {f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  card: {
    marginTop: "15px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
  },
};