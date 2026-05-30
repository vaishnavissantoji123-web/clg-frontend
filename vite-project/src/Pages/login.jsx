import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // ✅ state for inputs
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  // ✅ correct login function
  const handleLogin = () => {
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Page</h2>

      {/* USERNAME */}
      <input
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <br />
      <br />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <br />

      {/* LOGIN BUTTON */}
      <button onClick={handleLogin}>Login</button>
      <br />
      <br />

      {/* GO TO REGISTER */}
      <button onClick={() => navigate("/register")}>Create Account</button>
    </div>
  );
}