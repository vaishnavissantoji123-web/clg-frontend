import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSettings() {
  const [adminData, setAdminData] = useState({
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH ADMIN ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin")
      .then((res) => {
        setAdminData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("❌ Failed to load admin data");
      });
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SAVE DATA ================= */
  const handleSave = () => {
    if (!adminData.name || !adminData.password) {
      return alert("⚠️ All fields required");
    }

    axios
      .put("http://localhost:5000/admin", adminData)
      .then(() => {
        alert("✅ Settings Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("❌ Error saving settings");
      });
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>⚙️ Admin Settings</h2>

        <label>Admin Name</label>
        <input
          type="text"
          name="name"
          value={adminData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={adminData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleSave} style={styles.button}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f1f5f9",
  },

  card: {
    width: "350px",
    padding: "25px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};