import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaHome,
  FaUserGraduate,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function SettingsPage() {
  const navigate = useNavigate();

  // Profile state
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@gmail.com");

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Save profile
  const saveProfile = () => {
    alert("Profile Updated ✅");
  };

  // Change password
  const changePassword = () => {
    if (!oldPassword || !newPassword) {
      return alert("Fill all fields");
    }

    alert("Password Changed 🔐");
    setOldPassword("");
    setNewPassword("");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 🔷 SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col justify-between">
        <div>
          <div className="p-5 text-xl font-bold border-b border-indigo-500">
            🎓 Admin Panel
          </div>

          <ul className="p-4 space-y-3">
            <NavLink
              to="/dashboard"
              className="p-2 hover:bg-indigo-500 rounded flex gap-2"
            >
              <FaHome /> Dashboard
            </NavLink>

            <NavLink
              to="/students"
              className="p-2 hover:bg-indigo-500 rounded flex gap-2"
            >
              <FaUserGraduate /> Students
            </NavLink>

            <NavLink
              to="/courses"
              className="p-2 hover:bg-indigo-500 rounded flex gap-2"
            >
              <FaBook /> Courses
            </NavLink>

            <NavLink
              to="/settings"
              className="p-2 bg-indigo-600 rounded flex gap-2"
            >
              <FaCog /> Settings
            </NavLink>
          </ul>
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 p-2 rounded"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* 🔷 MAIN CONTENT */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* 👤 PROFILE SETTINGS */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl mb-4">Profile Settings</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={saveProfile}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* 🔐 PASSWORD SETTINGS */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">Change Password</h2>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Old Password"
              className="border p-2 rounded"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="border p-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={changePassword}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;