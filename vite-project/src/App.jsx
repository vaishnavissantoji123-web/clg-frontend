import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./Pages/CoursesDetails";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import AdmissionForm from "./pages/AdmissionForm";
import AdminProfile from "./pages/AdminProfile";
import AdminStudents from "./pages/AdminStudents";
import AdminSettings from "./pages/AdminSettings";
import Register from "./pages/Register";

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route
        path="/"
        element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="/register" element={<Register />} />
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:course" element={<CourseDetails />} />
        <Route path="admission" element={<AdmissionForm />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admin-profile" element={<AdminProfile />} />
        <Route path="admin/students" element={<AdminStudents />} />
        <Route path="admin/settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}