<ul className="p-4 space-y-3">
  <li
    onClick={() => navigate("/dashboard")}
    className="flex items-center gap-2 p-2 hover:bg-indigo-500 rounded cursor-pointer"
  >
    📊 Dashboard
  </li>

  <li
    onClick={() => navigate("/students")}
    className="flex items-center gap-2 p-2 hover:bg-indigo-500 rounded cursor-pointer"
  >
    👨‍🎓 Students
  </li>

  <li
    onClick={() => navigate("/courses")}
    className="flex items-center gap-2 p-2 bg-indigo-600 rounded cursor-pointer"
  >
    📚 Courses
  </li>

  <li
    onClick={() => navigate("/settings")}
    className="flex items-center gap-2 p-2 hover:bg-indigo-500 rounded cursor-pointer"
  >
    ⚙️ Settings
  </li>
</ul>;