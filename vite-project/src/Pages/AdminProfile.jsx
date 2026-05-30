import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfile() {
  const [students, setStudents] = useState([]);
  const [tab, setTab] = useState("students");

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

  // ================= ADMIN =================
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
    <div style={styles.container}>
      <h2 style={{ marginBottom: "10px" }}>👤 Admin Panel</h2>

      {/* Tabs */}
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
              <tr style={styles.thead}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id} style={styles.tr}>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.email || "-"}</td>
                  <td style={styles.td}>{s.course}</td>

                  {/* Status */}
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background:
                          s.status === "Approved"
                            ? "#dcfce7"
                            : s.status === "Rejected"
                              ? "#fee2e2"
                              : "#fef9c3",
                        color:
                          s.status === "Approved"
                            ? "green"
                            : s.status === "Rejected"
                              ? "red"
                              : "orange",
                      }}
                    >
                      {s.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={styles.td}>
                    <div style={styles.actionBox}>
                      <button
                        onClick={() => approve(s._id)}
                        style={styles.approve}
                      >
                        ✔
                      </button>
                      <button
                        onClick={() => reject(s._id)}
                        style={styles.reject}
                      >
                        ✖
                      </button>
                      <button
                        onClick={() => remove(s._id)}
                        style={styles.delete}
                      >
                        🗑
                      </button>
                    </div>
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
  container: {
    padding: "20px",
    background: "#f1f5f9",
    minHeight: "100vh",
  },

  tabs: {
    marginTop: "15px",
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
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    marginTop: "15px",
    borderCollapse: "collapse",
  },

  thead: {
    background: "#f1f5f9",
  },

  th: {
    padding: "12px",
    textAlign: "center",
    fontWeight: "600",
  },

  td: {
    padding: "12px",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
  },

  tr: {},

  status: {
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  actionBox: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
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
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  reject: {
    background: "orange",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  delete: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },

  save: {
    marginTop: "15px",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};