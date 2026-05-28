import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfile() {
  const [students, setStudents] = useState([]);
  const [tab, setTab] = useState("students");

  // 🔥 ADMIN STATE
  const [adminData, setAdminData] = useState({
    name: "",
    password: "",
  });

  // ================= STUDENTS =================
  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStudents();

    // 🔥 FETCH ADMIN DATA
    axios.get("http://localhost:5000/admin").then((res) => {
      setAdminData(res.data);
    });
  }, []);

  const approve = (id) => {
    axios
      .put(`http://localhost:5000/students/${id}/approve`)
      .then(fetchStudents);
  };

  const reject = (id) => {
    axios
      .put(`http://localhost:5000/students/${id}/reject`)
      .then(fetchStudents);
  };

  const remove = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`).then(fetchStudents);
  };

  // ================= ADMIN SETTINGS =================
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const saveAdmin = () => {
    axios
      .put("http://localhost:5000/admin", adminData)
      .then(() => alert("✅ Saved Successfully"))
      .catch(() => alert("❌ Error saving"));
  };

  return (
    <div style={{ padding: "20px", background: "#f1f5f9", minHeight: "100vh" }}>
      <h2>👤 Admin Panel</h2>

      {/* TABS */}
      <div style={styles.tabs}>
        <button onClick={() => setTab("students")} style={styles.btn}>
          🎓 Students
        </button>
        <button onClick={() => setTab("settings")} style={styles.btn}>
          ⚙️ Settings
        </button>
      </div>

      {/* ================= STUDENTS ================= */}
      {tab === "students" && (
        <div style={styles.card}>
          <h3>📋 Students List</h3>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>{s.status}</td>

                  <td>
                    <button
                      onClick={() => approve(s._id)}
                      style={styles.approve}
                    >
                      ✔
                    </button>
                    <button onClick={() => reject(s._id)} style={styles.reject}>
                      ✖
                    </button>
                    <button onClick={() => remove(s._id)} style={styles.delete}>
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= SETTINGS ================= */}
      {tab === "settings" && (
        <div style={styles.card}>
          <h3>⚙️ Settings</h3>

          <label>Name</label>
          <input
            name="name"
            value={adminData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <label>Password</label>
          <input
            name="password"
            value={adminData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button onClick={saveAdmin} style={styles.save}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  tabs: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },

  btn: {
    padding: "10px 15px",
    border: "none",
    background: "#0f172a",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  card: {
    marginTop: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
  },

  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
  },

  input: {
    width: "100%",
    padding: "8px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  approve: {
    background: "green",
    color: "white",
    border: "none",
    padding: "5px 8px",
    marginRight: "5px",
    cursor: "pointer",
  },

  reject: {
    background: "orange",
    color: "white",
    border: "none",
    padding: "5px 8px",
    marginRight: "5px",
    cursor: "pointer",
  },

  delete: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 8px",
    cursor: "pointer",
  },

  save: {
    marginTop: "15px",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};