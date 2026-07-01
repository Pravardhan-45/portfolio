import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-5">

      <h2 className="text-xl font-bold text-blue-700 mb-8">
        Menu
      </h2>

      <ul className="space-y-4">

        <li>
          <Link
            to="/dashboard"
            className="block hover:text-blue-600"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/userinfo"
            className="block hover:text-blue-600"
          >
            User Information
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;