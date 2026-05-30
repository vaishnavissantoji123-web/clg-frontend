import React, { useState } from "react";
import axios from "axios";

export default function AdmissionForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    course: "",
    category: "",
  });

  const courses = ["CSE", "ECE", "E&E", "AI"];
  const categories = ["General", "OBC", "SC", "ST"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/students", form);

    alert("Admission Submitted Successfully ✅");

    setForm({
      name: "",
      email: "",
      contact: "",
      course: "",
      category: "",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>📝 Admission Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* COURSE */}
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button type="submit" style={styles.btn}>
            Submit Admission
          </button>
        </form>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f1f5f9",
  },

  card: {
    width: "420px",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  btn: {
    width: "100%",
    padding: "10px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};