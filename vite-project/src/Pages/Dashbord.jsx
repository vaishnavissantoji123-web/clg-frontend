import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // 🔥 Fetch dashboard data
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/dashboard");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col justify-between">
        <div>
          <div className="p-5 text-xl font-bold">🎓 Admin Panel</div>

          <ul className="p-4 space-y-3">
            <NavLink
              to="/dashboard"
              className="p-2 bg-indigo-600 rounded flex gap-2"
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
              className="p-2 hover:bg-indigo-500 rounded flex gap-2"
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

      {/* MAIN */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* 📊 CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-5 rounded shadow">
            <h3>Total Students</h3>
            <p className="text-3xl">{data.totalStudents || 0}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Total Courses</h3>
            <p className="text-3xl">{data.totalCourses || 0}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Pending</h3>
            <p className="text-3xl text-yellow-500">{data.pending || 0}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Approved</h3>
            <p className="text-3xl text-green-500">{data.approved || 0}</p>
          </div>
        </div>

        {/* 📋 RECENT STUDENTS */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl mb-4">Recent Students</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Name</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.recentStudents?.map((s) => (
                <tr key={s._id} className="border-b">
                  <td>{s.name}</td>
                  <td>{s.course}</td>
                  <td
                    className={
                      s.status === "approved"
                        ? "text-green-500"
                        : s.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                    }
                  >
                    {s.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;