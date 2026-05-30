import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!user || !pass) {
      alert("Please fill all fields ❌");
      return;
    }

    // ✅ Save user data
    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Registration Successful ✅");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}