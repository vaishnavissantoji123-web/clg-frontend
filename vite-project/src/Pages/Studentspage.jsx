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

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Add Student
  const addStudent = async () => {
    if (!name || !course || !contact) {
      return alert("Fill all fields");
    }

    try {
      await axios.post("http://localhost:5000/api/students", {
        name,
        course,
        contact,
      });

      setName("");
      setCourse("");
      setContact("");
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Approve
  const approveStudent = async (id) => {
    await axios.put(`http://localhost:5000/api/students/approve/${id}`);
    fetchStudents();
  };

  // ❌ Reject
  const rejectStudent = async (id) => {
    await axios.put(`http://localhost:5000/api/students/reject/${id}`);
    fetchStudents();
  };

  // ❌ Delete
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  // 🔐 Logout
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
              className="p-2 bg-indigo-600 rounded flex gap-2"
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

      {/* 🔷 MAIN CONTENT */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Students</h1>

        {/* ➕ ADD STUDENT */}
        <div className="bg-white p-5 rounded shadow mb-6">
          <h2 className="text-xl mb-3">Add Student</h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Student Name"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Course"
              className="border p-2 rounded"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />

            <input
              type="text"
              placeholder="Contact Number"
              className="border p-2 rounded"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <button
              onClick={addStudent}
              className="bg-indigo-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* 📋 STUDENT TABLE */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl mb-4">Student List</h2>

          {students.length === 0 ? (
            <p className="text-gray-500">No students found ❌</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th>#</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => (
                  <tr key={s._id} className="border-b">
                    <td>{i + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.contact}</td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          s.status === "approved"
                            ? "bg-green-500"
                            : s.status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="space-x-2">
                      {s.status === "pending" && (
                        <>
                          <button
                            onClick={() => approveStudent(s._id)}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => rejectStudent(s._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => deleteStudent(s._id)}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-4 text-gray-500 text-center">
            Total Students: {students.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsPage;