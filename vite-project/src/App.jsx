import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import AdmissionForm from "./pages/AdmissionForm";
import AdminProfile from "./pages/AdminProfile";
import AdminStudents from "./pages/AdminStudents";
import AdminSettings from "./pages/AdminSettings";

export default function App() {
  return (
    <Routes>
      {/* LOGIN (NO LAYOUT) */}
      <Route path="/login" element={<Login />} />

      {/* ERP LAYOUT */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="students" element={<StudentsPage />} />

        {/* COURSES LIST */}
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:course" element={<CourseDetails />} />

        {/* ADMISSION FORM */}
        <Route path="admission" element={<AdmissionForm />} />

        <Route path="settings" element={<SettingsPage />} />

        <Route path="admin-profile" element={<AdminProfile />} />
        <Route path="admin/students" element={<AdminStudents />} />
        <Route path="admin/settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}