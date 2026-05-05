import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaHome,
  FaUserGraduate,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Add Course
  const addCourse = async () => {
    if (!title) return alert("Enter course name");

    try {
      await axios.post("http://localhost:5000/api/courses", { title });
      setTitle("");
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete Course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 🔷 SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="p-5 text-xl font-bold flex items-center gap-2 border-b border-indigo-500">
            <FaBook /> Admin Panel
          </div>

          {/* Menu */}
          <ul className="p-4 space-y-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-indigo-600" : "hover:bg-indigo-500"
                }`
              }
            >
              <FaHome /> Dashboard
            </NavLink>

            <NavLink
              to="/students"
              className="flex items-center gap-2 p-2 hover:bg-indigo-500 rounded"
            >
              <FaUserGraduate /> Students
            </NavLink>

            <NavLink
              to="/courses"
              className="flex items-center gap-2 p-2 bg-indigo-600 rounded"
            >
              <FaBook /> Courses
            </NavLink>

            <NavLink
              to="/settings"
              className="flex items-center gap-2 p-2 hover:bg-indigo-500 rounded"
            >
              <FaCog /> Settings
            </NavLink>
          </ul>
        </div>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 p-2 rounded"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* 🔷 MAIN CONTENT */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Courses</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* ➕ ADD COURSE */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Add Course</h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter course name"
              className="flex-1 border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              onClick={addCourse}
              className="bg-indigo-600 text-white px-5 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* 📋 COURSE TABLE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Courses List</h2>

          {courses.length === 0 ? (
            <p className="text-center text-gray-500">No courses found ❌</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-2">#</th>
                  <th className="p-2">Course Name</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course, index) => (
                  <tr key={course._id} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{course.title}</td>
                    <td className="p-2">
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="text-center mt-4 text-gray-500">
            Total Courses: {courses.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;